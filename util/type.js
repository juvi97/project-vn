define(function() {
  'use strict';
  var toString = {}.toString;
  
  return function type(obj) {
    return toString.call(obj).slice(8, -1);
  };
});