define(['./positions'], function (positions) {
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
    return animateY(sprite, i, frameCount, positions.standing(sprite), positions.sitting(sprite));
  }

  function standing(sprite, i, frameCount) {
    return animateY(sprite, i, frameCount, positions.sitting(sprite), positions.standing(sprite));
  }

  //stage entrances
  function enterstagelefttoleft2(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, positions.stageLeft(sprite), positions.left2(sprite));
  }

  function enterstagelefttoright2(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, positions.stageLeft(sprite), positions.right2(sprite));
  }

  function enterstagerighttoleft2(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, positions.stageRight(sprite), positions.left2(sprite));
  }

  function enterstagerighttoright2(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, positions.stageRight(sprite), positions.right2(sprite));
  }

  function enterstagerighttocenter(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, positions.stageRight(sprite), positions.center(sprite));
  }

  function enterstagelefttocenter(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, positions.stageLeft(sprite), positions.center(sprite));
  }

  //onscreens
  function centertoleft2(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, positions.center(sprite), positions.left2(sprite));
  }

  function centertoright2(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, positions.center(sprite), positions.right2(sprite));
  }

  function right2tocenter(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, positions.right2(sprite), positions.center(sprite));
  }

  function left2tocenter(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, positions.left2(sprite), positions.center(sprite));
  }


  //exit
  function leavestageleftfromleft2(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, positions.left2(sprite), positions.stageLeft(sprite));
  }
 
  function leavestageleftfromright2(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, positions.right2(sprite), positions.stageLeft(sprite));
  }

  function leavestageleftfromcenter(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, positions.center(sprite), positions.stageLeft(sprite));
  }

  function leavestagerightfromcenter(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, positions.center(sprite), positions.stageRight(sprite));
  }

  function leavestagerightfromright2(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, positions.right2(sprite), positions.stageRight(sprite));
  }

  function leavestagerightfromleft2(sprite, i, frameCount) {
    return animateX(sprite, i, frameCount, positions.left2(sprite), positions.stageRight(sprite));
  }

  function falloverright(sprite, i, frameCount) {
    animateY(sprite, i, frameCount, positions.centerHeight(sprite), positions.bottomHeight(sprite));
    return animateRotation(sprite, i, frameCount, 0, positions.fallRight(sprite));
  }

  function falloverleft(sprite, i, frameCount) {
    animateY(sprite, i, frameCount, positions.centerHeight(sprite), positions.bottomHeight(sprite));
    return animateRotation(sprite, i, frameCount, 0, positions.fallLeft(sprite));
  }

  function getupfromright(sprite, i, frameCount) {
    animateY(sprite, i, frameCount, positions.bottomHeight(sprite), positions.centerHeight(sprite));
    return animateRotation(sprite, i, frameCount, positions.fallRight(sprite), 0);
  }

  function getupfromleft(sprite, i, frameCount) {
    animateY(sprite, i, frameCount, positions.bottomHeight(sprite), positions.centerHeight(sprite));
    return animateRotation(sprite, i, frameCount, positions.fallLeft(sprite), 0);
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