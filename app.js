// Three js
var threejs = document.querySelector('.threejs');
threejs.addEventListener('click', function() {
    navigate('threejs-example/3DGallery.html');
});


function navigate(path) {
    var location = document.location.href + path;
    document.location.href  = location;
}

// nvd3-model
var nvd3Model = document.querySelector('.nvd3-model');
nvd3Model.addEventListener('click', function() {
    navigate('nvd3-model/cellularService.html');
});

// rotate-scale
var boxes = document.querySelectorAll('.box');
boxes.forEach(function(box) {
    box.addEventListener('click', animate);
});

function animate() {
    var target =  event.target;
    event.target.classList.toggle('rotate-scale');
}


// Random Animation
var randomboxes = document.querySelectorAll('.random-box');
randomboxes.forEach(function(box) {
    box.addEventListener('click', randomAnimation);
});

function randomAnimation() {
    var target =  event.target;
    var randomNumber = randomNumberGenerator(1, 5);
    var className = getAnimationClass(randomNumber);
    event.target.classList.toggle(className);
}

function getAnimationClass(number) {
    var output = 'random-box';
    switch(number) {
        case 1: output = 'spin-infinite'; break;
        case 2: output = 'pulse'; break;
        case 3: output = 'zoom'; break;
        case 4: output = 'colorized'; break;
        case 5: output = 'dance'; break;
    }

    return output;
}

function randomNumberGenerator(number1, number2) {
    return Math.floor(Math.random() * number2) + number1;
}


// Progress Bar
var progressBar = document.querySelector('.progress-bar-animation');
progressBar.addEventListener('click', progressBarAnimation);

function progressBarAnimation() {
    var bar =  document.querySelector('.custom-progress-bar');
    bar.classList.toggle('active');
}
