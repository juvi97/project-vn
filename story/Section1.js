define(['../script', '../pixi', '../images', '../config', '../util', '../audio'], function (script, PIXI, images, config, util, audio) {
  'use strict';
  var fox = new PIXI.Sprite(images.foxNeutral),
    falco = new PIXI.Sprite(images.falcoNeutral),
    scriptStage = script.createScriptStage(fox, falco);

  fox.anchor.x = 0.5;
  fox.anchor.y = 0.5;
  falco.anchor.x = 0.5;
  falco.anchor.y = 0.5;

  function foxStageLeft() {
    fox.position.x = -fox.width / 2;
    fox.position.y = config.height / 2;
  }

  function falcoStageLeft() {
    falco.position.x = -falco.width / 2;
    falco.position.y = config.height / 2;
  }

  function foxOnlyCenterScreen() {
    fox.position.x = config.width / 2;
    fox.position.y = config.height / 2;
  }

  var foxAndFalcoStageLeft = util.combine(foxStageLeft, falcoStageLeft),
    foxCenterFalcoLeft = util.combine(foxOnlyCenterScreen, falcoStageLeft),
    foxEntersStageLeftdX = (config.width / 2 + fox.width / 2) / 60,
    foxEntersStageLefti = 0;

  function foxEntersStageLeft() {
    fox.position.x += foxEntersStageLeftdX;
    foxEntersStageLefti += 1;
    return foxEntersStageLefti === 60;
  }
  
  function initialize() {
    if (audio.title && audio.title.playSt
  }
  
  function cleanup() {
    //unhook any custom events here
    //turn off all music
  }
  
  return {
    scriptStage: scriptStage,
    initialize: initialize,
    cleanup: cleanup,
    choiceScreen: 'Section1Choice',
    script: [
      //slides go here
      {
        "speaker": "Fox",
        "text": "I'm coming!",
        "initialize": foxAndFalcoStageLeft,
        "animation": foxEntersStageLeft
      },
      {
        "speaker": "Fox",
        "text": "FIYAAAA!",
        "initialize": foxCenterFalcoLeft,
        "animation": util.noOp
      }
    ]
  };
});