define(['images', 'globalState', 'config'], function (images, globalState, config) {
  'use strict';

  var inNovel = false,
    currentStory = {
      index: 0,
      desc: ""
    },
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
      inNovel = true;

      if (typeof oldStory !== 'undefined') {
        oldStory.cleanup();
      }

      //set current references for save screen info
      currentStory.desc = storyDesc;
      currentStory.index = index || 0;
      //all set
      oldStory = story;

      story.initialize();

      globalState.setStage(story.scriptStage.stage);
      currentStory.index = -1;
      advanceSlide();
      globalState.render();
    });
  }

  function overlayScreen(screen) {

  }

  function animateText(text) {
    var i = 0,
      textSpeed = config.textSpeed,
      textSprite = oldStory.scriptStage.text;
    textSprite.setText("");

    return function () {
      i += textSpeed;
      textSprite.setText(text.slice(0, i));
      return i >= text.length;
    };
  }

  function advanceSlide() {
    var slide;
    if (inNovel) {
      currentStory.index += 1;
      if (currentStory.index >= oldStory.script.length) {
        overlayScreen(oldStory.choiceScreen);
      } else {
        slide = oldStory.script[currentStory.index];
        globalState.addAnimation(animateText(slide.text), slide.animation);
        slide.initialize();
        oldStory.scriptStage.speaker.setText(slide.speaker);
        globalState.runAnimation();
      }
    }
  }


  document.addEventListener('click', advanceSlide);


  return {
    openScreen: openScreen,
    overlayScreen: overlayScreen,
    openStory: openStory
  };
});