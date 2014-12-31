define(['./config', './sc'], function defineAudio(config, SC) {
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
});