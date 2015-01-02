define(['./pixi'], function (PIXI) {
  var width = 800,
    height = 600,
    audio = {
      'title': '/tracks/183485383',
      'opening': '/tracks/183008205',
      'goatFinalBoss': '/tracks/165965394'
    },
    images = {
      'fox': {
        'neutral': 'images/compressed/meh.png'
      },
      'falco': {
        'happy': 'images/compressed/neutral.png'
      },
      'bg': {
        'school': 'images/compressed/pic_056.jpg'
      }
    },
    config = {
      width: width,
      height: height,
      renderer: PIXI.autoDetectRenderer(width, height),
      stageColor: 0xFFFFFF,
      audio: audio,
      images: images,
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