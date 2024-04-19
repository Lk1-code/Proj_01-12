// Seleciona os elementos do DOM
let tocando_agora = document.querySelector('.tocando-agora'); // Elemento que exibe a música atualmente em reprodução
let arte_musica = document.querySelector('.arte-musica'); // Elemento que exibe a arte do álbum da música atual
let nome_faixa = document.querySelector('.nome-faixa'); // Elemento que exibe o nome da faixa atual
let artista_faixa = document.querySelector('.artista-faixa'); // Elemento que exibe o nome do artista da faixa atual

// Seleciona os botões de controle
let playpause_btn = document.querySelector('.playpause-track'); // Botão para reproduzir ou pausar a música
let prox_btn = document.querySelector('.proxima-faixa'); // Botão para ir para a próxima faixa
let anterior_btn = document.querySelector('.faixa-anterior'); // Botão para voltar para a faixa anterior

// Seleciona os controles deslizantes e os elementos de tempo
let seek_slider = document.querySelector('.seek_slider'); // Controle deslizante para buscar diferentes partes da música
let volume_slider = document.querySelector('.volume_slider'); // Controle deslizante para ajustar o volume
let curr_time = document.querySelector('.tempo-atual'); // Elemento que exibe o tempo atual da música
let total_duration = document.querySelector('.duracao-total'); // Elemento que exibe a duração total da música

let wave = document.getElementById('wave'); // Elemento para visualização de onda de áudio
let randomIcon = document.querySelector('.fa-random'); // Ícone que indica se a reprodução aleatória está ativada ou não

let curr_track = document.createElement('audio'); // Elemento de áudio para reproduzir a música

// Variáveis de controle
let track_index = 0; // Índice da música atual na lista de músicas
let isPlaying = false; // Indica se a música está sendo reproduzida ou não
let isRandom = false; // Indica se a reprodução aleatória está ativada ou não
let updateTimer; // Temporizador para atualizar a interface do usuário


// Lista de músicas
const lista_musica = [ 
    // Cada objeto na lista representa uma música
    // Cada música tem uma imagem (img), um arquivo de música (music), um nome (name) e um artista (artist)
    // Adicione mais músicas conforme necessário
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
      {
        img: './src/cover2.jpg',
        music: "./src/Apotheosis.mp3",
        name: "Apotheosis",
        artist: "Lorna Shore",
      },
  
      {
          img: './src/cover2.jpg',
          music: "./src/Cursed to Die.mp3",
          name: "Cursed to Die",
          artist: "Lorna Shore",
      },
      {
          img: './src/cover2.jpg',
          music: "./src/Pain Remains I Dancing Like Flames.mp3",
          name: "Pain Remains I Dancing Like Flames",
          artist: "Lorna Shore",
      },
      {
          img: './src/cover2.jpg',
          music: "./src/Pain Remains II After All I've Done, I'll Disappear.mp3",
          name: "Pain Remains II After All I've Done, I'll Disappear",
          artist: "Lorna Shore",
      },
      {
          img: './src/cover2.jpg',
          music: "./src/Pain Remains III In a Sea of Fire.mp3",
          name: "Pain Remains III In a Sea of Fire",
          artist: "Lorna Shore",
      },
      {
          img: './src/cover2.jpg',
          music: "./src/Soulless Existence.mp3",
          name: "Soulless Existence",
          artist: "Lorna Shore",
      },
      {
          img: './src/cover2.jpg',
          music: "./src/SunEater.mp3",
          name: "Sun/Eater",
          artist: "Lorna Shore",
      },
   
];

// Carrega a faixa inicial
CarregarFaixa(track_index);
Ptrack(track_index);
// Função para carregar uma faixa
function CarregarFaixa(track_index){
    clearInterval(updateTimer); // Limpa o temporizador atual
    reset(); // Reseta o estado atual

    curr_track.src = lista_musica[track_index].music; // Define a fonte do elemento de áudio para a música atual
    curr_track.load(); // Carrega a música

    // Atualiza a interface do usuário para refletir a música atual
    arte_musica.style.backgroundImage = "url(" + lista_musica[track_index].img + ")";
    nome_faixa.textContent = lista_musica[track_index].name;
    artista_faixa.textContent = lista_musica[track_index].artist;
    tocando_agora.textContent = "Tocando musica " + (track_index + 1) + " de " + lista_musica.length;

    // Configura um temporizador para atualizar a interface do usuário a cada segundo
    updateTimer = setInterval(setUpdate, 1000);

    // Configura um ouvinte de eventos para ir para a próxima faixa quando a música atual termina
    curr_track.addEventListener('ended', nextTrack);
}
// Função para criar a lista de reprodução na interface do usuário
function Ptrack(){
    let playlist = document.querySelector('.playlist'); // Elemento que contém a lista de reprodução
    
    // Loop através da lista de músicas
    for (let i = 0; i < lista_musica.length; i++) {
        // Cria o HTML para a música atual
        let Html = ` <div class="p_musicas">
        <div class="p_arte" style="background-image: url(${lista_musica[i].img})" </div></div> 
        <div class="nome"> 
            <div class="p_titulo">${lista_musica[i].name}</div> 
            <div class="p_artista">${lista_musica[i].artist}</div> 
            </div> 
            <div class="p_botao"><i class="fa fa-play-circle fa-3x" id="p_play_${i}" onclick="escolheTrack(${i})"></i></div>`;        
        // Adiciona a música atual à lista de reprodução na interface do usuário
        playlist.insertAdjacentHTML("beforeend",Html);
        
    };
    ;
}

function escolheTrack(index){
   curr_track.src = lista_musica[index].music;
   curr_track.load();
   CarregarFaixa();
}
// Função para resetar o estado atual
function reset(){
    curr_time.textContent = "00:00"; // Reseta o tempo atual
    total_duration.textContent = "00:00"; // Reseta a duração total
    seek_slider.value = 0; // Reseta o valor do controle deslizante de busca
}

// Funções para controlar a reprodução aleatória
function faixaAleatoria(){
    isRandom ? pauseAlea() : tocarAlea(); // Se a reprodução aleatória estiver ativada, a pausa, caso contrário, começa
}
function tocarAlea(){
    isRandom = true; // Ativa a reprodução aleatória
    randomIcon.classList.add('randomActive'); // Adiciona a classe 'randomActive' ao ícone de reprodução aleatória
}
function pauseAlea(){
    isRandom = false; // Desativa a reprodução aleatória
    randomIcon.classList.add('randomActive'); // Remove a classe 'randomActive' do ícone de reprodução aleatória
}

// Funções para controlar a reprodução
function repetirFaixa(){
    let current_index = track_index; // Obtém o índice da faixa atual
    CarregarFaixa(current_index); // Carrega a faixa atual
    tocarFaixa(); // Começa a reproduzir a faixa
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : tocarFaixa(); // Se a música estiver sendo reproduzida, pausa, caso contrário, começa
}
function tocarFaixa(){
    curr_track.play(); // Começa a reproduzir a faixa
    isPlaying = true; // Define o estado de reprodução para verdadeiro
    arte_musica.classList.add('rotate'); // Adiciona a classe 'rotate' à arte do álbum
    wave.classList.add('loader'); // Adiciona a classe 'loader' à onda de áudio
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>'; // Muda o ícone do botão para o ícone de pausa
}
function pauseTrack(){
    curr_track.pause(); // Pausa a faixa
    isPlaying = false; // Define o estado de reprodução para falso
    arte_musica.classList.remove('rotate'); // Remove a classe 'rotate' da arte do álbum
    wave.classList.remove('loader'); // Remove a classe 'loader' da onda de áudio
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>'; // Muda o ícone do botão para o ícone de reprodução
}

// Funções para ir para a próxima ou a faixa anterior
function nextTrack(){
    if(track_index < lista_musica.length - 1 && isRandom === false){
        track_index += 1; // Se não for a última faixa e a reprodução aleatória não estiver ativada, vai para a próxima faixa
    }else if(track_index < lista_musica.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * lista_musica.length); // Se não for a última faixa e a reprodução aleatória estiver ativada, vai para uma faixa aleatória
        track_index = random_index;
    }else{
        track_index = 0; // Se for a última faixa, volta para a primeira faixa
    }
    CarregarFaixa(track_index); // Carrega a faixa selecionada
    tocarFaixa(); // Começa a reproduzir a faixa
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1; // Se não for a primeira faixa, volta para a faixa anterior
    }else{
        track_index = lista_musica.length -1; // Se for a primeira faixa, vai para a última faixa
    }
    CarregarFaixa(track_index); // Carrega a faixa selecionada
    tocarFaixa(); // Começa a reproduzir a faixa
}

// Funções para controlar a busca e o volume
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100); // Calcula a posição de busca com base no valor do controle deslizante de busca
    curr_track.currentTime = seekto; // Define o tempo atual da faixa para a posição de busca
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100; // Define o volume da faixa com base no valor do controle deslizante de volume
}

// Função para atualizar a interface do usuário enquanto a música está sendo reproduzida
function setUpdate(){
    let seekPosition = 0; // Inicializa a posição de busca
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration); // Calcula a posição de busca com base no tempo atual e na duração da faixa
        seek_slider.value = seekPosition; // Atualiza o valor do controle deslizante de busca

        // Calcula os minutos e segundos atuais e totais
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        // Adiciona um zero à esquerda se os segundos forem menores que 10
        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        // Atualiza os elementos de tempo na interface do usuário
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
