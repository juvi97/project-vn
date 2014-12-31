define(function () {
  return {
    "actors": ["fox", "falco", "jason"],
    "bgs": ["bg1", "bg2"],
    "music": ["id1", "id2", "id3"],
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
      "slideText": "",
      "slideBg": "",
      "slideSpeaker": "",
      "slideAnimations": {},
      "slidePositions": {
        "fox": "left-2",
        "falco": "right-2",
        "jason": ""
      },
      "slideMusic": {
        "id1": "stop",
        "id2": "pause",
        "id3": "stop"
      },
      "slideMoods": {
        "fox": "neutral",
        "falco": "happy",
        "jason": ""
      }
    }, {
      "slideText": "",
      "slideBg": "",
      "slideSpeaker": "",
      "slideAnimations": {},
      "slidePositions": {
        "fox": "left-2,sitting",
        "falco": "right-2,sitting",
        "jason": ""
      },
      "slideMusic": {
        "id1": "stop",
        "id2": "pause",
        "id3": "stop"
      },
      "slideMoods": {
        "fox": "neutral",
        "falco": "happy",
        "jason": ""
      }
    }],
    "selected": "\r\n//javascript goes here\r\nif (choice === 'waveshine') {\r\n\tnovelData.fox++; // add a point to fox\r\n\tnovelData.falco--; // remove a point from falco\r\n}\r\n"
  };
});