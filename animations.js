define(['config'], function (config) {
  'use strict';

  //baselines
  function animateX(sprite, i, frameCount, start, end) {
    sprite.position.x = start + (end - start) * i / frameCount;
    return i === frameCount;
  }

  function animateY(sprite, i, frameCount, start, end) {
    sprite.position.y = start + (end - start) * i / frameCount;
    return i === frameCount;
  }

  function animateRotation(sprite, i, frameCount, start, end) {
    sprite.rotation = start + (end - start) * i / frameCount;
    return i === frameCount;
  }

  //sitting or standing
  function sitting(sprite, i, frameCount) {
    return animateY(sprite, i, frameCount, config.height / 2, config.height / 2 + 100);
  }

  function standing(sprite, i, frameCount) {
    return animateY(sprite, i, frameCount, config.height / 2 + 100, config.height / 2);
  }

  //stage entrances
  function enterstagelefttoleft2(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, -sprite.width / 2, config.width / 3);
  }

  function enterstagelefttoright2(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, -sprite.width / 2, 2 * config.width / 3);
  }

  function enterstagerighttoleft2(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, (config.width + sprite.width / 2), config.width / 3);
  }

  function enterstagerighttoright2(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, (config.width + sprite.width / 2), 2 * config.width / 3);
  }

  function enterstagerighttocenter(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, (config.width + sprite.width / 2), config.width / 2);
  }

  function enterstagelefttocenter(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, -sprite.width / 2, config.width / 2);
  }

  //onscreens
  function centertoleft2(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, config.width / 2, config.width / 3);
  }

  function centertoright2(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, config.width / 2, 2 * config.width / 3);
  }

  function right2tocenter(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, 2 * config.width / 3, config.width / 2);
  }

  function left2tocenter(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, config.width / 3, config.width / 2);
  }


  //exit
  function leavestageleftfromleft2(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, config.width / 3, -sprite.width / 2);
  }

  function leavestageleftfromright2(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, 2 * config.width / 3, -sprite.width / 2);
  }

  function leavestageleftfromcenter(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, config.width / 2, -sprite.width / 2);
  }

  function leavestagerightfromcenter(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, config.width / 2, config.width + sprite.width / 2);
  }

  function leavestagerightfromright2(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, 2 * config.width / 3, config.width + sprite.width / 2);
  }

  function leavestagerightfromleft2(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, config.width / 3, config.width + sprite.width / 2);
  }

  function falloverright(sprite, i, frameCount) {
    animateY(sprite, i, frameCount, config.height / 2, config.height);
    return animateRotation(sprite, i, frameCount, 0, Math.PI / 2);
  }

  function falloverleft(sprite, i, frameCount) {
    animateY(sprite, i, frameCount, config.height / 2, config.height);
    return animateRotation(sprite, i, frameCount, 0, -Math.PI / 2);
  }

  function getupfromright(sprite, i, frameCount) {
    animateY(sprite, i, frameCount, config.height, config.height / 2);
    return animateRotation(sprite, i, frameCount, -Math.PI / 2, 0);
  }

  function getupfromleft(sprite, i, frameCount) {
    animateY(sprite, i, frameCount, config.height, config.height / 2);
    return animateRotation(sprite, i, frameCount, -Math.PI / 2, 0);
  }

  return {
    sitting: sitting,
    standing: standing,
    enterstagelefttoleft2: enterstagelefttoleft2,
    enterstagerighttoleft2: enterstagerighttoleft2,
    enterstagerighttoright2: enterstagerighttoright2,
    enterstagerighttocenter: enterstagerighttocenter,
    enterstagelefttocenter: enterstagelefttocenter,
    centertoleft2: centertoleft2,
    centertoright2: centertoright2,
    right2tocenter: right2tocenter,
    left2tocenter: left2tocenter,
    leavestageleftfromleft2: leavestageleftfromleft2,
    leavestageleftfromright2: leavestageleftfromright2,
    leavestageleftfromcenter: leavestageleftfromcenter,
    leavestagerightfromcenter: leavestagerightfromcenter,
    enterstagelefttoright2: enterstagelefttoright2,
    leavestagerightfromright2: leavestagerightfromright2,
    leavestagerightfromleft2: leavestagerightfromleft2,
    falloverright: falloverright,
    falloverleft: falloverleft,
    getupfromright: getupfromright,
    getupfromleft: getupfromleft
  };
});