define(['../pixi', '../config'], function(PIXI, config) {
  var textbox = new PIXI.Graphics();
  
  textbox.beginFill(config.textboxColor, config.textboxAlpha);
  textbox.lineStyle(config.textboxLineWidth, config.textboxLineColor, config.textboxLineAlpha);
  textbox.drawRoundedRect(0, 0, config.width - 100, 200, config.textboxRadius);
  
  return textbox.generateTexture();
});