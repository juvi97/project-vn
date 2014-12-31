define(['./pixi', './config'], function(PIXI, config) {
  var fadedBackground = new PIXI.Graphics(),
      fadedBackgroundTexture;
  fadedBackground.beginFill(0x000000, 0.3);
  fadedBackground.drawRect(0, 0, config.width, config.height)
  fadedBackgroundTexture = fadedBackground.generateTexture();
  
  function createOverlay(bgTexture) {
    var stage = new PIXI.Stage(0xFFFFFF),
        bg = new PIXI.Sprite(bgTexture),
        fadedBackgroundSprite = new PIXI.Sprite(fadedBackgroundTexture);
    
    
    function addSprite(sprite) {
      stage.addChild(sprite);
    }
    
    addSprite(bg);
    addSprite(fadedBackgroundSprite);
    
    return {
      stage: stage
    };
  }
  
  return {
    createOverlay: createOverlay
  };
});