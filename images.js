define(['./pixi', './config'], function (PIXI, config) {
  'use strict';
  var images = config.images,
      repo = document.querySelector('#imageRepo');
  
  Object.getOwnPropertyNames(images).forEach(function(imageType) {
    var subTypes = images[imageType],
        subTypeKeys = Object.getOwnPropertyNames(subTypes);
    subTypeKeys.forEach(function(key) {
      var img = document.createElement('img');
      img.dataset.src = images[imageType][key];
      img.dataset.type = imageType;
      img.dataset.subtype = key;
      img.id = imageType+":"+key;
      repo.appendChild(img);
    });
  });
  
  var imageQuery = [].slice.call(document.querySelectorAll("img")),
    lookup = {
      completed: false,
      loaded: loaded,
      loadNovelAssets: loadNovelAssets
    },
    filter = [].filter,
    forEach = [].forEach;

  function loadIfNotLoaded(tag) {
    if (tag.src === "") {
      tag.src = tag.dataset.src;
      tag.onload = addCompleteImage;
    }
  }
  
  function getActorImages(actorID) {
    return [].map.call(document.querySelectorAll('[data-type='+actorID+']'), function(element) {
      return element.id;
    });
  }
  
  function getBackgroundImages(bg) {
    return 'bg:'+bg;
  }
  
  function loadNovelAssets(actors, bgs) {
    var actorMap = actors.map(getActorImages);
    return loaded.apply(lookup, [
      actorMap.reduce(function(left, right) {
        return left.concat(right); //add each actor's images to the query
      }, []).concat(bgs.map(getBackgroundImages)) //query
    ].concat([].slice.call(arguments, 2)));
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