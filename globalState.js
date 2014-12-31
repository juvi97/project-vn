define(['./config', './pixi'], function(config, PIXI){
  'use strict';
  var animationFuncs = [],
      _stage = new PIXI.Stage(0x000000),
      slice = [].slice,
      push = [].push;
  
  function addAnimation() {
    push.apply(animationFuncs, slice.call(arguments));
    return this;
  }
  
  function animate() {
    var toBeRemoved = [],
        i = 0,
        len = animationFuncs.length;
    for (i = 0; i < len; i++) {
      if (animationFuncs[i]()) {
        toBeRemoved.push(animationFuncs[i]);
      }
    }
    
    if (toBeRemoved.length > 0) {
      animationFuncs = animationFuncs.filter(function filter(value, index){
        return toBeRemoved.indexOf(value) === -1;
      });
    }
    
    if (animationFuncs.length > 0) {
      requestAnimationFrame(animate);
    }
    config.renderer.render(_stage);
  }
  
  function runAnimation() {
    requestAnimationFrame(animate);
    return this;
  }
  
  function setStage(stage) {
    _stage = stage;
    animationFuncs = [];
    return this;
  }
  
  function render() {
    config.renderer.render(_stage);
    return this;
  }
  
  return {
    addAnimation: addAnimation,
    runAnimation: runAnimation,
    setStage: setStage,
    render: render
  };
});