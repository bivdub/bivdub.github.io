define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var HeaderFooter = require('famous/views/HeaderFooterLayout');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var FastClick = require('famous/inputs/FastClick');
    var GridLayout = require('famous/views/GridLayout');
    var Easing = require('famous/transitions/Easing');
    var Utility = require('famous/utilities/Utility');
    var Transitionable = require('famous/transitions/Transitionable');
    var SpringTransition = require('famous/transitions/SpringTransition');
    Transitionable.registerMethod('spring', SpringTransition);


    var BlogView = require('views/BlogView');
    var MusicView = require('views/MusicView');
    var AboutView = require('views/AboutView');
    var ProjectView = require('views/ProjectView');
    var BlogData = require('data/BlogData');

    function PageView() {
        View.apply(this, arguments);

        _createLayout.call(this);
        _createHeader.call(this);
        _createBody.call(this);
        _createProject.call(this);
        _createBlog.call(this);
        _createMusic.call(this);
        _createAbout.call(this);

        _setEmitters.call(this);
        _setListeners.call(this);
    }

    PageView.prototype = Object.create(View.prototype);
    PageView.prototype.constructor = PageView;

    PageView.DEFAULT_OPTIONS = {
        headerSize: 100,
        gridData: {},
        currentToggle: "bodyModifier"
    };


    function _createLayout() {
        this.layout = new HeaderFooter({
            headerSize: this.options.headerSize
        });

        var layoutModifier = new StateModifier({
            transform: Transform.translate(0,0,0.1)
        });

        this.add(this.layoutModifier).add(this.layout);
    }

    function _createHeader() {
        var backgroundSurface = new Surface({
            properties: {
                size: [50,50],
                backgroundColor: 'black'
            }
        });
        var backgroundModifier = new StateModifier({
            transform: Transform.behind
        });

        this.homeLink = new Surface({
            size: [true, true],
            content: '<h4>&#8592Back Home</h4>',
            properties: {
                color: 'white',
                textAlign: 'center'
            },
            classes: ['home']
        });

        this.pageTitle = new Surface({
            size: [true, true],
            content: '<h4>Brian Van Winkle - Web Designer and Composer</h4>',
            properties: {
                color: 'white',
                textAlign: 'center'
            }
        })

        var titleModifier = new StateModifier({
            origin: [0.5, 0.5],
            align: [0.5, 0.5],
            transform: Transform.translate(150,0,0)
        })

        var homeModifier = new StateModifier({
            origin: [0,0.5],
            align:[0,0.5]
        });


        this.layout.header.add(backgroundModifier).add(backgroundSurface);
        this.layout.header.add(homeModifier).add(this.homeLink);
        this.layout.header.add(titleModifier).add(this.pageTitle);
    }

    function _createBody() {
        this.bodyView = new GridLayout({
          dimensions: [this.options.gridData.length,1],
          size: [undefined, undefined]
        });
        this.bodyModifier = new StateModifier({
            transform: Transform.translate(0,0,0)
        });
        this.surfaces = [];

        this.bodyView.sequenceFrom(this.surfaces);

        for(var i = 0; i < this.options.gridData.length; i++) {
            var surf = new Surface({
                content: '<br>'+this.options.gridData[i].title,
                size: [undefined, undefined],
                properties: {
                    background: "linear-gradient(to bottom right, rgba("+parseInt(255/(this.options.gridData.length-i))+","+parseInt(255/(i+1))+",50, .5), rgba(50 ,"+parseInt(255/(this.options.gridData.length-i))+","+parseInt(255/(i+1))+", .5)), url("+this.options.gridData[i].bgUrl+")",
                    color: "#cccccc",
                    lineHeight: '200px',
                    textAlign: 'center',
                },
                classes: ['wedge'+i],
            });
            this.surfaces.push(surf);
        }

        this.layout.content.add(this.bodyModifier).add(this.bodyView);
    }

    function _createProject() {
        this.projectView = new ProjectView({
            size: [undefined, undefined],
            properties: {
                color: 'white',
                textAlign: 'center',
            }
        });
        this.projectModifier = new StateModifier({
            origin: [0.5, 0.5],
            align: [0.5, 0.5],
            transform: Transform.translate(-2000,0,0)
        });

        this.layout.content.add(this.projectModifier).add(this.projectView);
    }

    function _createBlog() {
        this.blogView = new BlogView({
            blogData: BlogData

        });
        this.blogModifier = new StateModifier({
            origin: [0.5, 0.5],
            align: [0.5, 0.5],
            transform: Transform.translate(2000,0,0)
        });

        this.layout.content.add(this.blogModifier).add(this.blogView);
    }

    function _createMusic() {
        this.musicView = new MusicView({
            size: [true, true],
            properties: {
                color: 'Black',
                textAlign: 'center'
            }
        });
        this.musicModifier = new StateModifier({
            origin: [0.5, 0.5],
            align: [0.5, 0.5],
            transform: Transform.translate(0,2000,0)
        });

        this.layout.content.add(this.musicModifier).add(this.musicView);
    }

    function _createAbout() {
        this.aboutView = new AboutView({
            size: [true, true]
        });
        this.aboutModifier = new StateModifier({
            origin: [0.5, 0.5],
            align: [0.5, 0.5],
            transform: Transform.translate(0,-2000,0)
        });

        this.layout.content.add(this.aboutModifier).add(this.aboutView);
    }

    function _setEmitters() {
        // console.log(this.layout)
        // this.surfaces[2].on('click', function() {
        //     this._eventOutput.emit('project');
        // }.bind(this));
        this.surfaces[0].on('click', this.musicToggle.bind(this));
        this.surfaces[1].on('click', this.blogToggle.bind(this));
        this.surfaces[2].on('click', this.projectToggle.bind(this));
        this.surfaces[3].on('click', this.aboutToggle.bind(this));
        this.homeLink.on('click', this.backHome.bind(this));
    }

    function _setListeners() {
        this.on('project', this.projectToggle.bind(this));
    }

    PageView.prototype.backHome = function() {
        this.bodyModifier.setTransform(
            Transform.translate(0,-2000,1), {duration: 0 }
        );
        this.bodyModifier.setTransform(
            Transform.translate(0, 0, 1),
            {transform: Transform.inFront, duration: 1000, curve: Easing.inOutBack
        });
        this.projectModifier.setTransform(
            Transform.translate(-2000, 0, 0),
            { duration: 1000, curve: Easing.inOutCirc
        });
        this.blogModifier.setTransform(
            Transform.translate(2000, 0, 0),
            { duration: 1000, curve: Easing.inOutCirc
        });
        this.musicModifier.setTransform(
            Transform.translate(0, 2000, 0),
            { duration: 1000, curve: Easing.inOutCirc
        });
        this.aboutModifier.setTransform(
            Transform.translate(0, -2000, 0),
            { duration: 1000, curve: Easing.inOutCirc
        });
    }

    PageView.prototype.projectToggle = function() {
        var spring = {
          method: 'spring',
          period: 1500,
          dampingRatio: .2,

        };
        this.projectModifier.setTransform(
            Transform.translate(0, 0, 0),
            { duration: 0, curve: Easing.inOutElastic}
        );
        this.projectModifier.setTransform(
            Transform.behind
        );
        this.bodyModifier.setTransform(
            Transform.rotateZ(-175), spring
        );
        this.bodyModifier.setTransform(
            Transform.translate(0, 2000, 0),
            { duration: 1000, curve: Easing.outCubit}
        );
        this.add(this.pageModifier).add(this.pageView);
    }

    PageView.prototype.blogToggle = function() {
        this.bodyModifier.setTransform(
            Transform.skewX(360),
            {duration: 800, curve: Easing.inBounce
        });
        this.bodyModifier.setTransform(
            Transform.translate(-1500,0,0),
            {duration:500, curve: Easing.inQuad
        });
        this.blogModifier.setTransform(
            Transform.translate(0, 0, 0),
            { duration: 2500, curve: Easing.inOutElastic}
        );
        this.add(this.pageModifier).add(this.pageView);
    }

    PageView.prototype.musicToggle = function() {
        var spring = {
          method: 'spring',
          period: 200,
          dampingRatio: .17,

        };
        this.bodyModifier.setTransform(
            Transform.perspective(900)
        );
        this.bodyModifier.setTransform(
            Transform.rotateX(180), {duration: 1000, curve: Easing.outBounce}
        );
        this.musicModifier
        .setTransform(
            Transform.rotateZ(360), {duration: 800}
        ).setTransform(
            Transform.translate(0, 0, 0),
            spring
        )

        this.add(this.musicModifier).add(this.musicView);
    }

    PageView.prototype.aboutToggle = function() {
        this.bodyModifier.setTransform(
            Transform.behind
        ).setTransform(
            Transform.rotateZ(-1000), {duration: 1000}
        ).setTransform(
            Transform.translate(0,-2000,0), {duration: 1000, curve: Easing.inCirc}
        );
        this.aboutModifier.setTransform(
            Transform.translate(0, 0, 0),
            { duration: 2500, curve: Easing.inOutQuad}
        );
        this.add(this.pageModifier).add(this.pageView);
    }

    module.exports = PageView;
});
