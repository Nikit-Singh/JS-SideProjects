window.addEventListener('load', () => {
    const sounds = document.querySelectorAll('.sound');
    const pads = document.querySelectorAll('.pads div');
    const animations = document.querySelector('.animations');
    const colors = [
        '#2196f3',
        '#1e88e5',
        '#1976d2',
        '#1565c0',
        '#0d47a1',
        '#053883'
    ];



    pads.forEach((pad, index) => {
        pad.addEventListener('click', function () {
            sounds[index].currentTime = 0;
            sounds[index].play();
            createAnimations(index);
        });
    });



    const createAnimations = (index) => {
        const element = document.createElement('div');
        animations.appendChild(element);
        element.style.backgroundColor = colors[index];
        element.style.animation = 'jump 1s ease';
        element.addEventListener('animationend', function () {
            animations.removeChild(this);
        });
    }

});