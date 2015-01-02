webpackJsonp([3],{

/***/ 11:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./start": 15,
		"./start.js": 15
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
	webpackContext.id = 11;


/***/ },

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	  return {
	    "actors": ["fox", "falco"],
	    "bgs": ["school"],
	    "music": [],
	    "colorMap": {
	      "jason": "red",
	      "fox": "green",
	      "falco": "blue"
	    },
	    "choices": {
	      "waveshine": "WaveShine Jason Zimmerman",
	      "shnair": "Do a Shorthop Nair"
	    },
	    "slides": [{
	      "slideText": "This is what the fox says \\nNew Line",
	      "slideBg": "school",
	      "slideSpeaker": "Fox",
	      "slideAnimation": false,
	      "slidePositions": {
	        "fox": "left2,standing",
	        "falco": "right2,standing"
	      },
	      "slideMusic": {},
	      "slideMoods": {
	        "fox": "neutral",
	        "falco": "happy"
	      }
	    }, {
	      "slideText": "Here I come!",
	      "slideBg": "school",
	      "slideSpeaker": "Fox",
	      "slideAnimation": true,
	      "slidePositions": {
	        "fox": "left2,sitting",
	        "falco": "right2,sitting"
	      },
	      "slideMusic": {},
	      "slideMoods": {
	        "fox": "neutral",
	        "falco": "happy"
	      }
	    }, {
	      "slideText": "Here I come!",
	      "slideBg": "school",
	      "slideSpeaker": "Fox",
	      "slideAnimation": true,
	      "slidePositions": {
	        "fox": "left2,standing",
	        "falco": "right2,standing"
	      },
	      "slideMusic": {},
	      "slideMoods": {
	        "fox": "neutral",
	        "falco": "happy"
	      }
	    }],
	    "selected": "\r\n//javascript goes here\r\nif (choice === 'waveshine') {\r\n\tnovelData.fox++; // add a point to fox\r\n\tnovelData.falco--; // remove a point from falco\r\n} else {\r\n    novelData.falco--;\r\n    novelData.fox++;\r\n}\r\n//goto specifies a new script to go to\r\ngoto('scriptid', 0, 100);\r\n"
	  };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }

});