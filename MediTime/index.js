const app = () => {
    const myApp = document.querySelector(".app");
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");

    // All songs
    const sounds = document.querySelectorAll(".sound-picker button");

    // Current Time
    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".time-select button");

    // Get total length of the path
    const outlineLength = outline.getTotalLength();

    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;

    const checkPlaying = (song) => {
        if (song.paused) {
            song.play();
            play.src = "./src/images/pause.svg";
        } else {
            song.pause();
            play.src = "./src/images/play.svg";
        }
    }

    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    timeSelect.forEach(option => {
        option.addEventListener('click', function () {
            fakeDuration = this.getAttribute('data-time');
            song.pause();
            song.currentTime = 0;
            play.src = './src/images/play.svg';
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        });
    });

    sounds.forEach(sound => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute("data-sound");
            myApp.style.background = `url(${this.getAttribute("data-image")})`;
            play.src = "./src/images/play.svg";
        })
    })

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        timeDisplay.textContent = `${minutes}:${seconds}`;

        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = './src/images/replay.svg';

        }
    }



}


app();