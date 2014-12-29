define(['../pixi', '../images', '../audio'], function (PIXI, images, audio) {
  'use strict';
  var mainScreen = {
    stage: new PIXI.Stage(0xFFFFFF),
    animation: animation,
    reset: reset,
    cleanup: cleanup
  };

  //create sprites and set the textures when they are loaded
  var backgroundSprite = new PIXI.Sprite(),
    fox = new PIXI.Sprite(),
    foxBlur = new PIXI.BlurFilter(),
    mainText = new PIXI.Text("Kitsune Shoujo", { font: "50px Arial", fill: "black" });

  
  images.loaded(['smile_male', 'bg'], setTextures);
  
  function setTextures() {
    fox.setTexture(images.smile_male);
    backgroundSprite.setTexture(images.bg);
  }

  //animation vars
  var i = 0,
    alphaStep = 1 / 60,
    blurStep = 0.5 / 120,
    rotationStep = 0.0025;

  fox.filters = [foxBlur];
  
  function animation() {
    i++;

    if (i < 61) {
      fox.alpha += alphaStep;
      backgroundSprite.alpha += alphaStep;
    }
    
    //animate mainText
    if (i > 120) {
      mainText.alpha += alphaStep;
      mainText.rotation -= rotationStep;
    } else {
      fox.rotation += rotationStep;
      foxBlur.blur += blurStep;
    }
    return i >= 180;
  }

  function reset(startNovel) {
    //bg alpha
    backgroundSprite.alpha = 0;
    
    //anchored
    fox.anchor.x = 0.5;
    fox.anchor.y = 0.5;

    //position
    fox.position.x = 600;
    fox.position.y = 400;

    //alpha
    fox.alpha = 0;

    //scale
    fox.scale.x = 0.2;
    fox.scale.y = 0.2;

    //blur
    fox.rotation = -rotationStep*30;
    foxBlur.blur = 1;
    
    //text alpha
    mainText.alpha = 0;
    
    mainText.position.x = 200;
    mainText.position.y = 100;
    
    mainText.anchor.x = 0.5;
    mainText.anchor.y = 0.5;
    
    mainText.rotation = rotationStep*30;
    
    images.loaded(['smile_male', 'bg'], function() {
      startNovel();
      audio.loaded(function() {
        audio.title.play(audio.repeatSong);
      });
    });
  }
  
  function cleanup() {
    
  }
  
  mainScreen.stage.addChild(backgroundSprite);
  mainScreen.stage.addChild(fox);
  mainScreen.stage.addChild(mainText);
  return mainScreen;
});