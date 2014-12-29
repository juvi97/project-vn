define(['config', 'util/textbox', 'util/speakerBox', 'pixi'], function(config, textbox, speakerbox, PIXI) {
  var invisibleTexture = PIXI.Texture.fromImage("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"),
      scriptStageProto = {
        addActors: addActors,
        finalize: finalize
      };
  
  function addActorToStage(actor) {
    this.addChild(actor);
  }
  
  function createScriptStage() {
    //anything that every stage needs should go here
    var scriptStage = Object.create(scriptStageProto),
        stage = new PIXI.Stage(config.stageColor),
        bg = new PIXI.Sprite(invisibleTexture),
        textboxSprite = new PIXI.Sprite(textbox),
        speakerboxSprite = new PIXI.Sprite(speakerbox),
        speaker = new PIXI.Text("", config.font),
        text = new PIXI.Text("", config.font);
    
    scriptStage.stage = stage;
    scriptStage.bg = bg;
    scriptStage.textboxSprite = textboxSprite;
    scriptStage.text = text;
    scriptStage.speakerboxSprite = speakerboxSprite;
    scriptStage.speaker = speaker;
    
    //textbox
    textboxSprite.addChild(text);
    textboxSprite.width = config.width - 20;
    textboxSprite.position.x = 10;
    textboxSprite.position.y = 400;
    
    //textbox text
    text.position.x = 10;
    text.position.y = 10;
    text.wordWrap = true;
    text.wordWrapWidth = textboxSprite.width - 10;
    
    
    //speakerbox
    speakerboxSprite.addChild(speaker);
    speakerboxSprite.position.x = 10;
    speakerboxSprite.position.y = 360;
    
    speaker.position.x = 10;
    speaker.position.y = 10;
    speaker.wordWrap = true;
    speaker.wordWrapWidth = speakerboxSprite.width - 10;
    
    bg.width = config.width;
    bg.height = config.height;
    
    stage.addChild(bg);
    [].slice.call(arguments).forEach(addActorToStage, stage);
    stage.addChild(textboxSprite);
    stage.addChild(speakerboxSprite);
    
    return scriptStage;
  }
  
  return {
    createScriptStage: createScriptStage
  }
});