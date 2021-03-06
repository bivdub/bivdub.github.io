define(function(require, exports, module) {
  var View    = require('famous/core/View');
  var Engine  = require('famous/core/Engine');
  var AppView = require('views/AppView')

  var mainContext = Engine.createContext();
  var appView = new AppView();

  mainContext.add(appView);
});

/*global famous*/
// import dependencies
// var Engine = famous.core.Engine;
// var Modifier = famous.core.Modifier;
// var Transform = famous.core.Transform;
// var ImageSurface = famous.surfaces.ImageSurface;
// var EventHandler = famous.core.EventHandler

// // create the main context
// var mainContext = Engine.createContext();

// // your app here
// var eventHandler = new EventHandler();

// var logo = new ImageSurface({
//     size: [200, 200],
//     content: 'http://code.famo.us/assets/famous_logo.png',
//     classes: ['double-sided']
// });

// var initialTime = Date.now();
// var centerSpinModifier = new Modifier({
//     origin: [0.5, 0.5],
//     align: [0.5, 0.5],
//     transform : function () {
//         return Transform.rotateY(.002 * (Date.now() - initialTime));
//     }
// });

// logo.on('click', function() {
//   eventHandler.emit('ping');
// });

// eventHandler.on('ping', function() {
//   centerSpinModifier.halt();
//   centerSpinModifier.setTransform(
//     Transform.translate(0, 0, 1000),
//     { duration: 2000, curve: 'easeInOut'}
//     );
// });
// mainContext.setPerspective(900);
// mainContext.add(centerSpinModifier).add(logo);
