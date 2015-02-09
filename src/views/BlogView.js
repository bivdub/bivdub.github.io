define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var GridLayout = require('famous/views/GridLayout');
    var Utility = require('famous/utilities/Utility');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Modifier = require('famous/core/Modifier')


    function BlogView() {
        View.apply(this, arguments);

        _constructBody.call(this);

        setTimeout(function(){

        $.get("/src/views/blog.html", function(data) {
            console.log('1');
            console.log('4');
            $('#blog').html(data);
        },'html')
        }, 1000)

        console.log(this);
    }

    BlogView.prototype = Object.create(View.prototype);
    BlogView.prototype.constructor = BlogView;

    BlogView.DEFAULT_OPTIONS = {
    };

    function _constructBody() {
        console.log('2');
        this.testView = new Surface({
            content: "<div id='blog'></div>",
            size: [true, true],
            properties: {
                color: 'black',
                textAlign: 'center'
            }
        });

        this.testModifier = new StateModifier({
            origin: [0.5,1],
            align: [0.5,0.5],
            transform: Transform.translate(0,-75,0),
        });

        this.constructionView1 = new ImageSurface({
            content: "img/construction.gif",
            size: [250, 250]
        });

        this.constructionView2 = new ImageSurface({
            content: "img/construction.gif",
            size: [250, 250]
        });

        this.con1 = new StateModifier({
            transform: Transform.translate(-200,120,0),
            origin: [0.5,0.5],
            align: [0.5,0.5],

        });

        this.con2 = new StateModifier({
            transform: Transform.translate(200,120,0),
            origin: [0.5,0.5],
            align: [0.5,0.5],

        })

        this.add(this.testModifier).add(this.testView);
        this.add(this.con1).add(this.constructionView1);
        this.add(this.con2).add(this.constructionView2);

        // this.con1.transformFrom(rotate)

        console.log('3');
        var angle = 0;
        function rotate() {
            angle += 0.01;
            return Transform.rotateZ(angle);
        }
    }

    // function _createBody() {
    //     this.bodyView = new GridLayout({
    //       dimensions: [this.options.blogData.length,1],
    //     });
    //     this.bodyModifier = new StateModifier({
    //         align: [0,0],
    //         origin: [0,0],
    //         size: [this.options.blogData.length*150, 150]
    //     });
    //     this.surfaces = [];

    //     this.bodyView.sequenceFrom(this.surfaces);

    //     for(var i = 0; i < this.options.blogData.length; i++) {
    //         var surf = new Surface({
    //             content: '<br>'+this.options.blogData[i].title,
    //             size: [undefined, undefined],
    //             properties: {
    //                 background: "linear-gradient(to bottom right, rgba("+parseInt(255/(this.options.blogData.length-i))+","+parseInt(255/(i+1))+",50, .5), rgba(50 ,"+parseInt(255/(this.options.blogData.length-i))+","+parseInt(255/(i+1))+", .5))",
    //                 color: "#cccccc",
    //                 textAlign: 'center',
    //             },
    //             classes: ['wedge'+i],
    //         });
    //         this.surfaces.push(surf);
    //     }

    //     this.add(this.bodyModifier).add(this.bodyView);
    // }

    module.exports = BlogView;
});
