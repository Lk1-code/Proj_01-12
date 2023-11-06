const tocando_agora = document.querySelector('.tocando-agora');
const arte_musica = document.querySelector('.arte-musica');
const nome_faixa = document.querySelector('.nome-faixa');
const artista_faixa = document.querySelector('.artista-faixa');

const playpause_btn = document.querySelector('.playpause-track');
const prox_btn = document.querySelector('.proxima-faixa');
const anterior_btn = document.querySelector('.faixa-anterior');

let seek_slider = document.querySelector('.seek_slider');
const volume_slider = document.querySelector('volume_slider');
const tempo_atual = document.querySelector('.tempo-atual');
const dur_total = document.querySelector('.duracao-total');
const wave = document.getElementById('wave');
const randomIcon = document.querySelector('.fa-random');
const curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const lista_musica = [ 
    {
      img: './src/cover.jpg',
      name: 'To the Hellfire',
      artist: "Lorna Shore",
      music: "./src/To the Hellfire.mp3",
    },
    {
      img: './src/cover.jpg',
      music: "./src/Of the Abyss.mp3",
      name: "Of the Abyss",
      artist: "Lorna Shore",
    },
    {
      img: './src/cover.jpg',
      music: "./src/And I Return to Nothingness.mp3",
      name: "And I Return to Nothingness",
      artist: "Lorna Shore",
    },
  ];
  
  CarregarFaixa(track_index);

  function CarregarFaixa(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = lista_musica[track_index].music;
    curr_track.load();

    arte_musica.style.backgroundImage = "url(" + lista_musica[track_index].img + ")";
    nome_faixa.textContent = lista_musica[track_index].name;
    artista_faixa.textContent = lista_musica[track_index].artist;
    tocando_agora.textContent = "Tocando musica " + (track_index + 1) + " de " + lista_musica.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);

  }
function reset(){
    tempo_atual.textContent = "00:00";
    dur_total.textContent = "00:00";
    seek_slider.value = 0;
}
function faixaAleatoria(){
    isRandom ? pauseAlea() : tocarAlea();
}
function tocarAlea(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseAlea(){
    isRandom = false;
    randomIcon.classList.add('randomActive');
}
function repetirFaixa(){
    let current_index = track_index;
    CarregarFaixa(current_index);
    tocarFaixa();
}
function repeatTrack(){
    let current_index = track_index;
    CarregarFaixa(current_index);
    tocarFaixa();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : tocarFaixa();
}
function tocarFaixa(){
    curr_track.play();
    isPlaying = true;
    arte_musica.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    arte_musica.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < lista_musica.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < lista_musica.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * lista_musica.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    CarregarFaixa(track_index);
    tocarFaixa();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = lista_musica.length -1;
    }
    CarregarFaixa(track_index);
    tocarFaixa();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.tempo_atual = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.dur_total * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        tempo_atual.textContent = currentMinutes + ":" + currentSeconds;
        dur_total.textContent = durationMinutes + ":" + durationSeconds;
    }
}