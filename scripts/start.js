define(function () {
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
});