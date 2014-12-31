webpackJsonp([3],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./Section1": 9,
		"./Section1.js": 9
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
	webpackContext.id = 7;


/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(10), __webpack_require__(2), __webpack_require__(3), __webpack_require__(5), __webpack_require__(11), __webpack_require__(12), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (script, PIXI, images, config, util, audio, vn) {
	  'use strict';
	  
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(13)], __WEBPACK_AMD_DEFINE_RESULT__ = function (globalState, gameState) {
	  'use strict';
	  var exports = {};
	  
	  function loadSection(scriptID, index) {
	    index = index || 0;
	    
	    
	  }
	  
	  
	  return exports;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  'use strict';
	  
	  function exec(func) {
	    func();
	  }
	  
	  function combine() {
	    var funcs = [].slice.call(arguments);
	    return function() {
	      funcs.forEach(exec);
	    };
	  }
	  
	  function noOp() {
	    return true;
	  }
	  
	  return {
	    combine: combine,
	    noOp: noOp
	  };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function(config) {
	  'use strict';
	  
	  
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  'use strict';
	  
	  return SC;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }
]);