define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var EventHandler = require('famous/core/EventHandler');
    var Easing = require('famous/transitions/Easing');
    var Engine = require('famous/core/Engine');

    var mainContext = Engine.createContext();

    var PageView = require('views/PageView');
    var BlogView = require('views/BlogView');
    var MusicView = require('views/MusicView');
    var AboutView = require('views/AboutView');
    var ProjectView = require('views/ProjectView');
    var GridData = require('data/GridData');


    function AppView() {
        View.apply(this, arguments);

        _createLogo.call(this);
        // _createProject.call(this);
        _createPage.call(this);

        _setEmitter.call(this);
        _setListeners.call(this);

    }

    // AppView.setPerspective(900);
    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {};

    function _createLogo() {
        this.logo = new ImageSurface({
            size: [200,200],
            content: 'img/profilePhoto.jpg',
            classes: ['double-sided']
        });
        // var initialTime = Date.now();
        this.logoModifier = new StateModifier({
            origin: [0.5,0.5],
            align: [0.5,0.5],
            // transform: function() {
            //     return Transform.rotateY(.002 * (Date.now() - initialTime));
            // }
        });
        this.add(this.logoModifier).add(this.logo);
    }

    function _createPage() {
        this.pageView = new PageView({
            gridData: GridData
        });
        this.pageModifier = new StateModifier({
            transform: Transform.translate(0, -1000, 0)
        });
        this.add(this.pageModifier).add(this.pageView);
    }

    function _setEmitter() {
        this.logo.on('click', function() {
            this._eventOutput.emit('ping');
        }.bind(this));
    }

    function _setListeners() {
        this.on('ping', this.fallDown.bind(this));
        this.on('ping', this.pageDown.bind(this));
        // this.pageView.on('project', this.projectToggle.bind(this));
    }

    AppView.prototype.fallDown = function() {
        this.logoModifier.setTransform(
            Transform.translate(0, 1000, 0),
            { duration: 1500, curve: Easing.inBounce}
        );
    }

    AppView.prototype.pageDown = function() {
        this.pageModifier.setTransform(
            Transform.translate(0, 0, 0),
            { duration: 2500, curve: Easing.inOutElastic}
        );
    }


    module.exports = AppView;
});
