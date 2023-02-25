let play = document.getElementById('play');
let music = document.querySelector('audio');
let circle = document.querySelector('.circle');
let img = circle.querySelector('img');
let sName = document.querySelector('.container h1');
let artistName = document.querySelector('.container h2');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let rangeInp = document.querySelector('.range input');
let rangeBar = document.querySelector('.rangeBar');


let arr = [
    {
        musicName: "All Black",
        artistName: "Raftaar and Sukh-E"
    },
    {
        musicName: "Daaru Party",
        artistName: "Millind Gaba"
    },
    {
        musicName: "She Dont Know",
        artistName: "Millind Gaba"
    }
];


let isPlayed = false;

const playMusic = () => {
    isPlayed = true;
    play.classList.replace('fa-play', 'fa-pause');
    music.play();
    circle.classList.add('start');
}

const pauseMusic = () => {
    isPlayed = false;
    play.classList.replace('fa-pause', 'fa-play');
    music.pause();
    circle.classList.remove('start');
}

play.onclick = function () {
    isPlayed ? pauseMusic() : playMusic();
}

function songs() {
    sName.innerHTML = arr[count].musicName;
    artistName.innerHTML = arr[count].artistName;
    let musicConcat = arr[count].musicName;
    let musicNam = musicConcat.replaceAll(" ", "_");
    music.src = musicNam + ".mp3";
    img.src = musicNam + ".jpg";
    play.classList.replace('fa-play', 'fa-pause');
    music.play();
    isPlayed = true;
    circle.classList.add('start');
}

let count = 0;
const nextFun = () => {
    count += 1;
    if (count == arr.length) {
        count = 0;
    }
    songs();
}

const prevFun = () => {
    count -= 1;
    if (count < 0) {
        count = arr.length - 1;
    }
    // console.log(count)
    songs();
}

// making range bar

music.addEventListener('timeupdate', (event) => {
    const { currentTime, duration } = event.srcElement;
    let sec = parseInt((currentTime / duration) * 100);
    // console.log(sec)

    rangeInp.value = sec;

    rangeBar.style.width = sec + "%";
    rangeBar.style.borderRadius = '0%';
    if (sec < 2) {
        rangeBar.style.width = "2%";
        rangeBar.style.borderRadius = '50%';
    }
})

rangeInp.addEventListener('change', () => {
    console.log(rangeInp.value * music.duration / 100)
    music.currentTime = rangeInp.value * music.duration / 100;
    rangeBar.style.width = music.currentTime + "%";
})

// ended function call
music.addEventListener('ended', () => {
    nextFun();
});



next.addEventListener('click', nextFun);
prev.addEventListener('click', prevFun);
