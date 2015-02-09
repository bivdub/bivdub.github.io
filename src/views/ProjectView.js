define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function ProjectView() {
        View.apply(this, arguments);

        _constructBody.call(this)
        setTimeout(function(){
            $.get("/src/views/project.html",'html').done(function(data) {
                $('#project').html(data);
            })
        }, 1000);
    }

    ProjectView.prototype = Object.create(View.prototype);
    ProjectView.prototype.constructor = ProjectView;

    ProjectView.DEFAULT_OPTIONS = {

    };

    function _constructBody() {
        this.testView = new Surface({
            content: "<div id='project'></div>",
            size: [undefined, undefined],
            properties: {
                color: 'black',
                textAlign: 'center',
            }
        });

        this.testModifier = new StateModifier({
            origin: [0.5,0.5],
            align: [0.5,0.5],
        });

        this.add(this.testModifier).add(this.testView);
    }

    module.exports = ProjectView;
});
