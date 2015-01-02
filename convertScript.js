function parseAndConvert(str) {
  var colorMap = str.slice(str.indexOf('!ColorMap:') + 10, str.indexOf('!EndColorMap')),
    actors = str.slice(str.indexOf('!Actors:') + 8, str.indexOf('!EndActors')),
    bgs = str.slice(str.indexOf('!Bgs:') + 5, str.indexOf('!EndBgs')),
    music = str.slice(str.indexOf('!Musics:') + 8, str.indexOf('!EndMusics')),
    script = str.slice(str.indexOf('!Script:') + 8, str.indexOf('!EndScript')),
    choices = str.slice(str.indexOf('!Choices:') + 9, str.indexOf('!EndChoices')),
    selected = str.slice(str.indexOf('!Selected:') + 10, str.indexOf('!EndSelected')),
    colorMapIndex = {},
    choicesMap = {},
    scriptObject = {};

  function trimToLowerCase(str) {
    return str.trim().toLowerCase();
  }

  function stringHasLength(str) {
    return str.length > 0;
  }

  scriptObject.actors = actors.replace('\r', '\n').split('\n').map(trimToLowerCase).filter(stringHasLength);
  scriptObject.bgs = bgs.replace('\r', '\n').split('\n').map(trimToLowerCase).filter(stringHasLength);
  scriptObject.music = music.replace('\r', '\n').split('\n').map(trimToLowerCase).filter(stringHasLength);

  //set the color map
  scriptObject.colorMap = colorMap.replace('\r', '\n').split('\n').map(trimToLowerCase).filter(stringHasLength).reduce(function (left, right) {
    var colorMapSplit = right.split(':');
    if (colorMapSplit.length > 1) {
      left[trimToLowerCase(colorMapSplit[0])] = trimToLowerCase(colorMapSplit[1]);
    }
    return left;
  }, colorMapIndex);
  
  scriptObject.choices = choices.replace('\r', '\n').split('\n').map(function trim(str){
    return str.trim();
  }).filter(stringHasLength).reduce(function (left, right) {
    var indexOfColon = right.indexOf(':');
    if (indexOfColon > -1) {
      left[trimToLowerCase(right.slice(0, indexOfColon))] = right.slice(indexOfColon + 1).trim();
    }
    return left;
  }, choicesMap);
  
  //slides parsing
  var index = 0,
    endSlideIndex = 0,
    slideStr = "",
    slideBg = "",
    slideArray = [],
    slideArrayResult = [],
    slideText = "",
    slideSpeaker = "",
    slidePositions = {},
    slideMusic = {},
    slideMoods = {},
    slideAnimation = true,
    cachedSlidePositions = scriptObject.actors.reduce(function (left, right) {
      left[right] = "";
      return left;
    }, {}),
    cachedMusicState = scriptObject.music.reduce(function (left, right) {
      left[right] = "stop";
      return left;
    }, {}),
    cachedMoodsState = scriptObject.actors.reduce(function (left, right) {
      left[right] = "";
      return left;
    }, {});

  
  index = script.indexOf('!BeginSlide', index);
  while (index > -1) {
    
    endSlideIndex = script.indexOf('!EndSlide', index);
    if (endSlideIndex === -1) {
      throw new Error("No end of slide found!");
    }

    slideText = "";
    slideAnimation = true;
    slidePositions = {};
    slideMusic = {};
    slideMoods = {};
    slideStr = script.slice(index + 11, endSlideIndex);
    slideArray = slideStr.replace('\r', '\n').split('\n').map(function(line) {
      return line.trim();
    }).filter(stringHasLength);
    
    
    slideArray.forEach(function (line) {
      var lowerLine = line.toLowerCase(),
          tempIndex, tempEndIndex, animationsArray;
      //for each line in the slide array figure out what is declared
      
      //text
      tempIndex = lowerLine.indexOf("!text:");
      if (tempIndex> -1) {
        slideText = line.slice(tempIndex + 6).trim();
        return;
      }
      //speaker
      tempIndex = lowerLine.indexOf("!speaker:");
      if (tempIndex > -1) {
        slideSpeaker = line.slice(tempIndex + 9).trim();
        return;
      }
      tempIndex = lowerLine.indexOf("!bg:");
      if (tempIndex > -1) {
        slideBg = line.slice(tempIndex + 4).trim();
        return;
      }
      
      if (lowerLine.indexOf('!noanimation') > -1) {
        slideAnimation = false;
      }
    });


    slidePositions = loadCommand('!Positions', '!EndPositions', slideStr, scriptObject.actors, cachedSlidePositions);
    slideMusic = loadCommand('!Music', '!EndMusic', slideStr, scriptObject.music, cachedMusicState);
    slideMoods = loadCommand('!Moods', '!EndMoods', slideStr, scriptObject.actors, cachedMoodsState);
    if (slideArrayResult.length === 0) {
      slideAnimation = false;
    }
    slideArrayResult.push({
      slideText: slideText,
      slideBg: slideBg,
      slideSpeaker: slideSpeaker,
      slideAnimation: slideAnimation,
      slidePositions: slidePositions,
      slideMusic: slideMusic,
      slideMoods: slideMoods
    });

    //reset index
    index = script.indexOf('!BeginSlide', index + 1);
  }
  
  function loadCommand(command, endCommand, slideStr, keys, cache) {
    var tempIndex, tempEndIndex,
      result = {};

    tempIndex = slideStr.indexOf(command + ':');
    if (tempIndex > -1) {
      tempIndex += command.length + 1;
      tempEndIndex = slideStr.indexOf(endCommand, tempIndex);
      if (tempEndIndex === -1) {
        throw new Error("No end of " + command + " found!");
      }
      var commandArray = slideStr.slice(tempIndex, tempEndIndex).replace('\r', '\n').split('\n').map(trimToLowerCase).filter(stringHasLength);
      commandArray.forEach(function (commandLine) {
        var commandSplit, key;
        if (commandLine.indexOf(':') > 0) {
          commandSplit = commandLine.split(':');
          key = trimToLowerCase(commandSplit[0]);
          cache[key] = trimToLowerCase(commandSplit[1] || cache[key]);
        }
      });
    }
    keys.forEach(function (key) {
      result[key] = cache[key];
    });
    return result;
  }

  scriptObject.slides = slideArrayResult;
  //last step, this gets turned into a javascript function
  scriptObject.selected = selected;

  return JSON.stringify(scriptObject);
}

module.exports = parseAndConvert;