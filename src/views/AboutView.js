define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Utility = require('famous/utilities/Utility');

    function AboutView() {
        View.apply(this, arguments);

        _constructBody.call(this);
        setTimeout(function(){
            $.get("/src/views/about.html", function(data) {
                $('#about').html(data)
            },'html')
        }, 1000);
    }

    AboutView.prototype = Object.create(View.prototype);
    AboutView.prototype.constructor = AboutView;

    AboutView.DEFAULT_OPTIONS = {
    };

    function _constructBody() {
        this.testView = new Surface({
            content: "<div id='about'></div>",
            size: [true, true],
            properties: {
                color: 'black',
                textAlign: 'center'
            }
        });

        this.testModifier = new StateModifier({
            origin: [0.5,0.5],
            align: [0.5,0.5]
        });
        this.add(this.testModifier).add(this.testView);


    }
    module.exports = AboutView;
});
