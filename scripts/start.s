
!ColorMap:
Jason: red
Fox: green
Falco: blue
!EndColorMap

!Actors:
Fox
Falco
Jason
!EndActors

!Bgs:
BG1
BG2
!EndBgs

!Musics:
id1
id2
id3
!EndMusics

!Script:
  put comments outside here they will be ignored
  !BeginSlide
  !Speaker: Fox
  !Text: This is what the fox says \nNew Line
  !Positions:
    Fox: left-2
    Falco: right-2
  !EndPositions
  !Animations:
    Fox: enter-stage-left
    Falco: enter-stage-right
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
}
!EndSelected