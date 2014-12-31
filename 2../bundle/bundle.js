webpackJsonp([2],{

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./main": 8,
		"./main.js": 8
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 6;


/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(12), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (PIXI, images, audio, vn) {
	  'use strict';
	  var mainScreen = {
	      stage: new PIXI.Stage(0xFFFFFF),
	      animation: animation,
	      reset: reset,
	      cleanup: cleanup
	    },
	    inScreen = false;

	  //create sprites and set the textures when they are loaded
	  var backgroundSprite = new PIXI.Sprite(),
	    fox = new PIXI.Sprite(),
	    foxBlur = new PIXI.BlurFilter(),
	    mainText = new PIXI.Text("Kitsune Shoujo", {
	      font: "50px Arial",
	      fill: "black"
	    });


	  images.loaded(['smile_male', 'bg'], setTextures);

	  function setTextures() {
	    fox.setTexture(images.smile_male);
	    backgroundSprite.setTexture(images.bg);
	    backgroundSprite.width = 800;
	    backgroundSprite.height = 600;
	    backgroundSprite.interactive = true;
	    backgroundSprite.mousedown = function () {
	      if (inScreen) {
	        vn.openStory('Section1', 0);
	        inScreen = false;
	      }
	    };
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
	    fox.rotation = -rotationStep * 30;
	    foxBlur.blur = 1;

	    //text alpha
	    mainText.alpha = 0;

	    mainText.position.x = 200;
	    mainText.position.y = 100;

	    mainText.anchor.x = 0.5;
	    mainText.anchor.y = 0.5;

	    mainText.rotation = rotationStep * 30;

	    images.loaded(['smile_male', 'bg'], function () {
	      inScreen = true;
	      startNovel();
	      audio.loaded(function () {
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(14)], __WEBPACK_AMD_DEFINE_RESULT__ = function defineAudio(config, SC) {
	  'use strict';
	  var tracks = config.audio,
	    titles = [],
	    loadedTitles = [],
	    callbacks = [],
	    repeatSong = {
	      onfinish: repeatSongFunc
	    },
	    html5AudioOptions = {
	      useHTML5Audio: true,
	      preferFlash: false
	    },
	    audio = {
	      loaded: loaded,
	      completed: false,
	      repeatSong: repeatSong
	    };

	  function repeatSongFunc() {
	    this.play(repeatSong);
	  }

	  function exec(func) {
	    func();
	  }

	  function loaded() {
	    [].push.apply(callbacks, [].slice.call(arguments));

	    if (audio.completed) {
	      setTimeout(execCallbacks);
	    }

	    return this;
	  }

	  function loadTitle(title) {
	    SC.stream(tracks[title], html5AudioOptions, function (sound) {
	      audio[title] = sound;
	      loadedTitles.push(title);
	      if (loadedTitles.length === titles.length) {
	        audio.completed = true;
	        execCallbacks();
	      }
	    });
	  }

	  function execCallbacks() {
	    callbacks.forEach(exec);
	    callbacks = [];
	  }

	  SC.initialize({
	    client_id: '10b30c7d0c8854864b5901f3c7ef47d9'
	  });

	  titles = Object.getOwnPropertyNames(tracks);

	  titles.forEach(loadTitle);
	  return audio;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 14:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  'use strict';
	  
	  return SC;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }

});