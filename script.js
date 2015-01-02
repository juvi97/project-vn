define(['./config', './globalState', './generateGameId', './util/speakerBox', './util/textBox', './pixi', './images', './audio', './animations'], function (config, globalState, generateGameId, speakerBox, textBox, PIXI, images, audio, animations) {
  'use strict';
  var exports = {},
    currentGameData = {},
    currentScriptData = [],
    currentScriptIndex = 0,
    currentScriptID = "",
    currentEndIndex = 0,
    currentActiveIndex = 0,
    currentActiveScriptID = "",
    currentStage = new PIXI.Stage(),
    bgSprite = new PIXI.Sprite(),
    textBoxSprite = new PIXI.Sprite(textBox),
    mainTextBox = new PIXI.Text("", config.mainTextFont),
    mainSpeakerBox = new PIXI.Text("", config.mainTextFont),
    speakerBoxSprite = new PIXI.Sprite(speakerBox),
    currentActors = [],
    currentActorTextures = {},
    currentActorSprites = {},
    currentBgs,
    currentMusic,
    currentColorMap,
    currentChoices,
    currentSelected;


  mainTextBox.anchor.x = 0.5;
  mainTextBox.anchor.y = 0.5;
  mainTextBox.position.x = textBoxSprite.width / 2;
  mainTextBox.position.y = textBoxSprite.height / 2;
  textBoxSprite.addChild(mainTextBox);

  mainSpeakerBox.anchor.x = 0.5;
  mainSpeakerBox.anchor.y = 0.5;
  mainSpeakerBox.position.x = speakerBoxSprite.width / 2;
  mainSpeakerBox.position.y = speakerBoxSprite.height / 2;
  speakerBoxSprite.addChild(mainSpeakerBox);

  function overlayChoices() {
    //overlay the choices at 60% of the screens height divided evenly
    var choices = Object.getOwnPropertyNames(currentChoices),
      step = config.height * 0.6 / (choices.length + 2);
    choices.forEach(function (choice, index) {
      var text = currentChoices[choice],
        sprite = new PIXI.Sprite(speakerBox),
        textbox = new PIXI.Text(text, config.mainTextFont);

      function selected() {
        currentSelected(choice, currentGameData, loadNewChapter);
        //add global event listeners
      }

      //textbox
      textbox.position.x = sprite.width / 2;
      textbox.position.y = sprite.height / 2;
      textbox.anchor.x = 0.5;
      textbox.anchor.y = 0.5;

      //clickbox
      sprite.addChild(textbox);
      sprite.interactive = true;
      sprite.buttonMode = true;
      sprite.mouseup = selected;
      sprite.position.y = (index + 1) * step;
      sprite.position.x = config.width / 2;
      currentStage.addChild(sprite);
    });

    globalState.render();
    //remove global event listeners
  }

  function gotoChapter(chapterID) {

  }


  var lastRun = 0;

  function advanceSlide() {
    var now = Date.now(),
      animationFunctions = [],
      nextChapterIndex,
      nextChapterID,
      slide,
      textIndex = 0;

    function animateText() {
      textIndex += config.textSpeed;
      mainTextBox.setText(slide.slideText.slice(0, textIndex));
      return textIndex > slide.slideText.length;
    }
    if (now - lastRun > 200) {
      lastRun = now;
    } else {
      return;
    }

    currentActiveIndex += 1;
    if (currentActiveIndex > currentEndIndex && currentScriptID === currentActiveScriptID) {
      //time to show the choices
      overlayChoices();
    } else {
      //next slide and animate actors
      if (currentActiveIndex > currentEndIndex) {
        //advance the history to the next chapter without the choices
        nextChapterIndex = currentGameData.seenChapters.indexOf(currentActiveScriptID) + 1;
        nextChapterID = currentGameData.seenChapters[nextChapterIndex];
        gotoChapter(nextChapterID, currentGameData.chaptersRange[nextChapterID][0]);
      }

      slide = currentScriptData[currentActiveIndex];

      currentActors.forEach(function (actorID) {
        var func,
          sprite = currentActorSprites[actorID];

        //set mood
        currentActorSprites[actorID].setTexture(images[actorID + ":" + slide.slideMoods[actorID]]);

        //animations and position setting (see createAnimationFunction for more info)
        func = animations.createAnimationFunction(sprite, slide.slidePositions[actorID]);
        if (slide.slideAnimation) {
          animationFunctions.push(func);
        }
      });

      mainSpeakerBox.setText(slide.slideSpeaker);


      animationFunctions.push(animateText);
      if (animationFunctions.length > 0) {
        globalState.addAnimation.apply(globalState, animationFunctions);
        globalState.runAnimation();
      } else {
        globalState.render();
      }
      /*
        "slideText": "",
        "slideBg": "",
        "slideSpeaker": "",
        "slideAnimations": {},
        "slidePositions": {
          "fox": "left-2",
          "falco": "right-2",
          "jason": ""
        },
        "slideMusic": {
          "id1": "stop",
          "id2": "pause",
          "id3": "stop"
        },
        "slideMoods": {
          "fox": "neutral",
          "falco": "happy",
          "jason": ""
        }
      */


    }
  }

  function resetStage() {
    //reset the stage
    currentStage.removeChildren();
    currentStage.addChild(bgSprite);
    currentActors.forEach(function (actorID) {
      currentStage.addChild(currentActorSprites[actorID] = new PIXI.Sprite());
    });
    currentStage.addChild(textBoxSprite);
    currentStage.addChild(speakerBoxSprite);
  }

  function resetAndAdvanceSlide() {
    resetStage();
    advanceSlide();
  }

  function stopSong(audioID) {
    if (audio.hasOwnProperty(audioID)) {
      audio[audioID].stop();
    }
  }

  function previousSlide() {
    currentActiveIndex -= 1;

  }



  function loadNewChapter(scriptID, index, endIndex) {
    require(['./scripts/' + scriptID], function (scriptObj) {
      //now we have the script, lets do some setting
      currentScriptData = scriptObj.slides;
      currentScriptIndex = (index = index || 0) - 1;
      currentEndIndex = (endIndex = endIndex || currentScriptData.length - 1);
      currentActiveScriptID = (currentScriptID = scriptID);
      //set the game save data
      if (currentGameData.seenChapters.indexOf(scriptID) === -1) {
        currentGameData.seenChapters.push(scriptID);
      }
      currentGameData.chaptersRange[scriptID] = [index, endIndex];
      currentGameData.currentChapterIndex = currentScriptIndex;
      currentGameData.currentChapter = scriptID;
      currentActors = scriptObj.actors;
      currentBgs = scriptObj.bgs;
      currentChoices = scriptObj.choices;
      currentColorMap = scriptObj.colorMap;
      currentMusic = scriptObj.music;
      currentSelected = new Function('choice', 'novelData', 'goto', scriptObj.selected);
      globalState.setStage(currentStage);
      images.loadNovelAssets(currentActors, currentBgs, resetAndAdvanceSlide);
      currentMusic.forEach(stopSong);
    });
  }

  function loadGame(gameID) {
    if (gameID in localStorage) {
      currentGameData = JSON.parse(localStorage.getItem(gameID));
      loadChapter(currentGameData.currentChapter, currentGameData.currentChapterIndex);
    } else {
      throw new Error("Game not found!");
    }
  }
  exports.loadGame = loadGame;

  function newGame(scriptID, index) {
    index = index || 0;
    var gameSaveIndex,
      gameID = generateGameId();

    currentGameData = {
      gameID: gameID,
      seenChapters: ["scriptID"],
      chaptersRange: {
        "scriptID": [
            0, 100 //begining, end
          ]
      },
      currentChapterIndex: index,
      currentChapter: scriptID,
      gameData: {}
    };

    localStorage.setItem(gameID, currentGameData);
    if ('gameSaveIndex' in localStorage) {
      gameSaveIndex = JSON.parse(localStorage.getItem('gameSaveIndex'));
    } else {
      gameSaveIndex = [];
    }

    if (gameSaveIndex.indexOf(gameID) === -1) {
      gameSaveIndex.push(gameID);
    }

    localStorage.setItem('gameSaveIndex', JSON.stringify(gameSaveIndex));
    loadNewChapter(scriptID, index);
  }
  exports.newGame = newGame;

  return exports;
});