var fs = require('fs'),
    path = require('path'),
    files = fs.readdirSync('./images/compressed'),
    imageTags = files.map(function(src) {
      return '<img data-src="images/compressed/'+src+'" id="'+path.basename(src, path.extname(src))+'"/>';
    });

console.log(imageTags);

fs.writeFileSync('test.txt', imageTags.join(''));

