define(['config'], function(config) {
  'use strict';
  
  var settings,
      localSettings = localStorage.getItem('settings'),
      exports = {};
  
  if (localSettings.length > 0) {
    settings = JSON.parse(localSettings);
  } else {
    settings = {
      textSpeed: 2 //characters per frame
    };
  }
  
  function save() {
    localStorage.setItem('settings', JSON.stringify(settings));
    return this;
  }
  
  function load() {
    exports.settings = JSON.parse(localStorage.getItem('settings'));
    return this;
  }
  
  exports.settings = settings;
  exports.save = save;
  exports.load = load;
  
  return exports;
});