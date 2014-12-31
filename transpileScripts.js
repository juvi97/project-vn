var fs = require('fs'),
    path = require('path'),
    parseAndConvert = require('./convertScript'),
    files = fs.readdirSync('./scripts');

files.forEach(function(src) {
  var contents;
  if (path.extname(src) === '.s') {
    contents = 'define(function(){return ' + parseAndConvert(fs.readFileSync('./scripts/'+src, {encoding: 'utf-8'})) + ';});';
  
    fs.writeFileSync('scripts/'+path.basename(src, '.s') + '.js', contents);
  }
});


