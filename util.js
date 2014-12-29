define(function() {
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
  }
});