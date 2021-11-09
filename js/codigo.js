let playerTitle = document.querySelector (".player__title")
let playerSong = document.querySelector(".player__song");

let next_btn = document.getElementById ("next_track");
let prev_btn = document.getElementById("prev_track");

let playerLevel = document.querySelector(".player__level");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

/* const audio = document.getElementById ('audio'); */
const playPause = document.getElementById ('play');

let track_index = 0;
let isPlaying = false;
let updateTimer;

let track_list = [
    {
        name: "Silencio",
        path: "../music/track1.mp3"
    },
    {
      name: "Vidala",
      path: "../music/track2.mp3"
    },
    {
      name: "Repunteando Tierra",
      path: "../music/track3.mp3",
    },
  ];

let audio = document.createElement('audio');

function loadTrack(track_index) {

    clearInterval(updateTimer);
    resetValues();

    audio.src = track_list[track_index].path;
    audio.load();
  
    playerSong.textContent = track_list[track_index].name;

    updateTimer = setInterval (seekUpdate, 1000);
    audio.addEventListener("ended", next_btn);
  };



var playTrack = function (){
  if (isPlaying != true) {
    audio.pause();
    playPause.querySelector(".pause-btn").classList.toggle("hide");
    playPause.querySelector(".play-btn").classList.toggle("hide");
  } else {
     if (isPlaying == true) {
       playPause.querySelector(".pause-btn").classList.toggle("hide");
     playPause.querySelector(".play-btn").classList.toggle("hide");
     audio.play();
  }
}};


playPause.addEventListener('click', () => {
  
    if (audio.paused || audio.ended) {
        playPause.querySelector(".pause-btn").classList.toggle("hide");
        playPause.querySelector(".play-btn").classList.toggle("hide");
        isPlaying = true;
        audio.play();
    } else {
        audio.pause();
        playPause.querySelector(".pause-btn").classList.toggle("hide");
        playPause.querySelector(".play-btn").classList.toggle("hide");
        isPlaying = false;
    }

  
}); 
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  playerLevel.value = 0;
};


next_btn.addEventListener('click', () => {
    if (track_index < track_list.length - 1) { 
    track_index += 1;
    playPause.querySelector(".pause-btn").classList.toggle("hide");
    playPause.querySelector(".play-btn").classList.toggle("hide");
  }
    else track_index = 0;
    loadTrack(track_index);
    playTrack();
 
});

prev_btn.addEventListener('click', () => {
    if (track_index > 0){
    track_index -= 1;
    playPause.querySelector(".pause-btn").classList.toggle("hide");
    playPause.querySelector(".play-btn").classList.toggle("hide");}
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
});

function seekTo() {
  let seekto = audio.duration * (audio.value / 100);
  audio.currentTime = seekto;
};

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(audio.duration)) {
    seekPosition = audio.currentTime * (100 / audio.duration);

    playerLevel.value = seekPosition;

    let currentMinutes = Math.floor(audio.currentTime / 60);
    let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(audio.duration / 60);
    let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
};

loadTrack(track_index);
