
!ColorMap:
Jason: red
Fox: green
Falco: blue
!EndColorMap

!Actors:
Fox
Falco
!EndActors

!Bgs:
school
!EndBgs

!Musics:
!EndMusics

!Script:
  put comments outside here they will be ignored
  !BeginSlide
  !Speaker: Fox
  !Text: This is what the fox says \nNew Line
  !Bg: school
  !Positions:
    Fox: left2,standing
    Falco: right2,standing
  !EndPositions
  !Animations:
    Fox: enterstagelefttoleft2
    Falco: enterstagelefttoright2
  !EndAnimations
  !Moods:
    Fox: neutral
    Falco: happy
  !EndMoods
  !Music:
    id: play
    id2: pause
    id3: stop
  !EndMusic
  !EndSlide
  
  //don't bother setting the positions any more because they will be carried over
  !BeginSlide
  !Speaker: Fox
  !Positions:
  	Fox: left2,sitting
    Falco: right2,sitting
  !EndPositions
  !Animations:
    Fox: sitting
    Falco: sitting
  !EndAnimations
  !Text: Here I come!
  !EndSlide
  
  !BeginSlide
  !Speaker: Fox
  !Positions:
  	Fox: left2,standing
    Falco: right2,standing
  !EndPositions
  !Animations:
    Fox: standing
    Falco: standing
  !EndAnimations
  !Text: Here I come!
  !EndSlide
!EndScript

!Choices:
waveshine: WaveShine Jason Zimmerman
shnair: Do a Shorthop Nair
!EndChoices

!Selected:
//javascript goes here
if (choice === 'waveshine') {
	novelData.fox++; // add a point to fox
	novelData.falco--; // remove a point from falco
} else {
    novelData.falco--;
    novelData.fox++;
}
//goto specifies a new script to go to
goto('scriptid', 0, 100);
!EndSelected