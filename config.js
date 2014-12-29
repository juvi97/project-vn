define(['pixi'], function(PIXI) {
  var width = 800,
      height = 600,
      config = {
        width: width,
        height: height,
        renderer: PIXI.autoDetectRenderer(width, height),
        stageColor: 0xFFFFFF
      };
  
  document.querySelector("#container").appendChild(config.renderer.view);
  
  return config;
});