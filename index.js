requirejs.config({
  waitSeconds: 0
});

require(['./vn', './pixi', './script'], function (vn, PIXI, script) {
  'use strict';
  script.newGame('start', 0);
});