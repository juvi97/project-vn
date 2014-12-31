'use strict';

var watch = require('watch'),
    fs = require('fs'),
    doingWebpack = false,
    browserify = require('browserify'),
    pack = browserify(['./index.js']).transform('deamdify'),
    queueWebPack = false;

pack.on('file', function() {
  doingWebpack = false;
  if (queueWebPack) {
    queueWebPack = false;
    doWebPack();
  }
});

function doWebPack() {
  console.log("webpack called");
  if (!doingWebpack) {
    console.log("performing webpack");
    doingWebpack = true;
    pack.bundle().pipe(fs.createWriteStream('./build/build.js'));
  } else {
    queueWebPack = true;
  }
}

watch.createMonitor('./', function (monitor) {
  //monitor.files['/home/mikeal/.zshrc'] // Stat object for my zshrc.
  monitor.on("created", function (f, stat) {
    // Handle new files
    doWebPack();
  })
  monitor.on("changed", function (f, curr, prev) {
    // Handle file changes
    doWebPack();
  })
  monitor.on("removed", function (f, stat) {
    // Handle removed files
    doWebPack();
  })
});

doWebPack();