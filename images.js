define(['pixi'], function (PIXI) {
  'use strict';

  var imageQuery = [].slice.call(document.querySelectorAll("img")),
    lookup = {
      completed: false,
      loaded: loaded
    },
    filter = [].filter,
    forEach = [].forEach;

  function loadIfNotLoaded(tag) {
    if (tag.src === "") {
      tag.src = tag.dataset.src;
      tag.onload = addCompleteImage;
    }
  }

  function loaded(query) {
    var args = [].slice.call(arguments, 1),
      interval = setInterval(function check() {
        if (query.filter(textureLoaded).length === query.length) {
          clearInterval(interval);
          setTimeout(forEach.bind(args, exec));
        }
      }, 500);

    imageQuery.filter(function (tag) {
      return query.indexOf(tag.id) > -1;
    }).forEach(loadIfNotLoaded);

    return this;
  }

  function textureLoaded(imageID) {
    return lookup.hasOwnProperty(imageID);
  }

  function exec(func) {
    func();
  }

  function incomplete(img) {
    return !img.complete;
  }

  function addCompleteImage() {
    var img = this;
    if (img.complete) {
      lookup[img.id] = new PIXI.Texture(new PIXI.BaseTexture(img, PIXI.scaleModes.NEAREST));
    }
  }

  
  return lookup;
});