define(['./positions'], function (positions) {
  'use strict';
  
  var frameCount = 60;

  function createAnimationFunction(sprite, newPositions) {
    var fromX = sprite.position.x,
      fromY = sprite.position.y,
      fromR = sprite.position.rotation,
      fromA = sprite.alpha,
      i = 0;


    sprite = newPositions.reduce(function (left, right) {
      return positions[right](sprite);
    }, sprite);


    var toX = sprite.position.x,
      toY = sprite.position.y,
      toR = sprite.position.rotation,
      toA = sprite.alpha,
      animateX = toX !== fromX,
      animateY = toY !== fromY,
      animateR = toR !== fromR,
      animateA = toA !== fromA,
      dX = toX - fromX,
      dY = toY - fromY,
      dR = toR - fromR,
      dA = toA - fromA;

    return function () {
      i += 1;
      var ratio = i / frameCount;
      if (animateX) {
        sprite.position.x = fromX + dX * ratio;
      }
      if (animateY) {
        sprite.position.Y = fromY + dY * ratio;
      }
      if (animateR) {
        sprite.rotation = fromR + dR * ratio;
      }
      if (animateA) {
        sprite.alpha = fromA + dA * ratio;
      }
      return i === frameCount;
    };
  }
  return {
    createAnimationFunction: createAnimationFunction
  };
});