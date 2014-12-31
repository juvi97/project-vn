define(['./config'], function (config) {
  'use strict';

  function stageLeft(sprite) {
    return -sprite.width / 2;
  }

  function stageRight(sprite) {
    return config.width + sprite.width / 2;
  }

  function left2(sprite) {
    return config.width / 3;
  }

  function right2(sprite) {
    return 2 * config.width / 3;
  }

  function center(sprite) {
    return config.width / 2;
  }

  function standing(sprite) {
    return config.height / 2;
  }

  function sitting(sprite) {
    return 5 * config.height / 8;
  }

  function fallLeft(sprite) {
    return -Math.PI / 2;
  }

  function fallRight(sprite) {
    return Math.PI / 2;
  }

  function centerHeight(sprite) {
    return config.height/2;
  }
  
  function bottomHeight(sprite) {
    return config.height;
  }
  
  return {
    stageLeft: stageLeft,
    stageRight: stageRight,
    center: center,
    left2: left2,
    right2: right2,
    standing: standing,
    sitting: sitting,
    fallLeft: fallLeft,
    fallRight: fallRight,
    centerHeight: centerHeight,
    bottomHeight: bottomHeight
  };
});