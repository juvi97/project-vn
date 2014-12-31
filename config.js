define(['pixi'], function (PIXI) {
  var width = 800,
    height = 600,
    audio = {
      'title': '/tracks/183485383',
      'opening': '/tracks/183008205',
      'goatFinalBoss': '/tracks/165965394'
    },
    config = {
      width: width,
      height: height,
      renderer: PIXI.autoDetectRenderer(width, height),
      stageColor: 0xFFFFFF,
      audio: audio,
      textboxColor: 0x0011FF,
      textboxAlpha: 0.7,
      textboxRadius: 3,
      textboxLineWidth: 2,
      textboxLineColor: 0xFFFFFF,
      textboxLineAlpha: 1,
      textSpeed: 2
    };
  
  document.querySelector("#container").appendChild(config.renderer.view);

  return config;
});