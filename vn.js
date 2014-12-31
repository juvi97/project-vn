define(['images', 'globalState', 'config', 'pixi'], function (images, globalState, config, PIXI) {
  'use strict';

  var inNovel = false,
    lastCalledNextSlide = Date.now(),
    runAnimation = false,
    oldScreen,
    oldStory;

  //define the novel start
  function startNovel() {
    globalState.render();
    if (runAnimation) {
      globalState.runAnimation();
    }
  }



  function loadScreen(screen) {
    if (typeof oldScreen !== 'undefined' && screen !== oldScreen) {
      if (typeof oldScreen.reset === 'function') {
        oldScreen.reset();
      }
    }

    if (typeof oldStory !== 'undefined') {
      oldStory.cleanup();
    }

    oldScreen = screen;

    runAnimation = typeof screen.animation === "function";

    //set the stage and render the initial state of the screen
    globalState.setStage(screen.stage);
    //always set the stage first, because it cancels all the current animations

    //then add animation
    if (runAnimation) {
      globalState.addAnimation(screen.animation);
    }

    screen.reset(startNovel);
  }

  function openScreen(screen) {
    inNovel = false;
    require(['screens/' + screen], loadScreen);
  }

  function openStory(storyDesc, index) {
    require(['story/' + storyDesc], function indexStory(story) {
      
    });
  }

  function overlayScreen(screenID) {
    var image = config.renderer.view.toDataURL(),
        backgroundTexture = PIXI.Texture.fromImage(image);
    
    require(['overlay/'+screenID], function(screen) {
      screen.bg.setTexture(backgroundSprite);
    });
  }

  

  function advanceSlide() {
    
  }


  


  return {
    openScreen: openScreen,
    overlayScreen: overlayScreen,
    openStory: openStory
  };
});