const player = document.querySelector("#player");
const musicName = document.querySelector("#musicName");
const playerPauseButton = document.querySelector("#playPauseButton");
const prevButton = document.querySelector("#prevButton");
const currentTime = document.querySelector("#currentTime");
const duration = document.querySelector("#duration");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");

import songs from "./songs.js";

const textButtonPlay = "<1 class = 'bx bx-caret-right'></i>";
const textButtonPause = "<1 class = 'bx bx-pause'></i>";

let index = 0;

prevButton.onclick = () => prevNextMusic("prev");
nextButton.onclick = () => prevNextMusic();

const prevNextMusic = (type = "next") =>{
    if ((type == "next" && index + 1 == songs.lenght)  || 
    type == "init"){
        index = 0;
    }
};

prevNextMusic("init");