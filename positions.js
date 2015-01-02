define(['./config'], function (config) {
  'use strict';

  function stageLeft(sprite) {
    sprite.postion.x = -sprite.width / 2;
    return sprite;
  }

  function stageRight(sprite) {
    sprite.postion.x = config.width + sprite.width / 2;
    return sprite;
  }

  function left2(sprite) {
    sprite.postion.x = config.width / 3;
    return sprite;
  }

  function right2(sprite) {
    sprite.postion.x = 2 * config.width / 3;
    return sprite;
  }

  function center(sprite) {
    sprite.postion.x = config.width / 2;
    return sprite;
  }

  function standing(sprite) {
    sprite.postion.y = config.height / 2;
    return sprite;
  }

  function sitting(sprite) {
    sprite.position.y = 5 * config.height / 8;
    return sprite;
  }

  function fallLeft(sprite) {
    sprite.rotation = -Math.PI / 2;
    return sprite;
  }

  function fallRight(sprite) {
    sprite.rotation = Math.PI / 2;
    return sprite;
  }

  function centerHeight(sprite) {
    sprite.position.y = config.height / 2;
    return sprite;
  }

  function bottomHeight(sprite) {
    sprite.position.y = config.height;
    return sprite;
  }

  function belowScreen(sprite) {
    sprite.position.y = config.height + sprite.height / 2;
    return sprite;
  }

  function aboveScreen(sprite) {
    sprite.position.y = -sprite.height / 2;
    return sprite;
  }

  function left3(sprite) {
    sprite.position.x = config.width / 4.5;
    return sprite;
  }

  function right3(sprite) {
    sprite.position.x = config.width * 3.5 / 4.5;
    return sprite;
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
    bottomHeight: bottomHeight,
    belowScreen: belowScreen,
    aboveScreen: aboveScreen,
    left3: left3,
    right3: right3
  };
});