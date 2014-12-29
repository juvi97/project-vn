requirejs.config({
  waitSeconds: 0
});

require(['vn', 'pixi'], function (vn, PIXI) {
  'use strict';
  vn.openScreen('main');
});