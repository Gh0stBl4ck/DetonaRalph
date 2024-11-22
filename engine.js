const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        live: document.querySelector(".menu-lives h2"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
        lives: 3,
    },
    actions: {
        timerId: null,
        countDownTimerId: null,
    }
};

function resetGame() {
    state.values.curretTime = 60;
    state.values.result = 0;
    state.view.timeLeft.textContent = state.values.curretTime;
    state.view.score.textContent = state.values.result;
}

function loseLife() {
    state.values.lives--;
    state.view.live.textContent = `x${state.values.lives}`;

    if (state.values.lives === 0) {
        alert("Você perdeu todas as vidas! Jogo reiniciado.");
        state.values.lives = 3;
        resetGame();
        state.view.live.textContent = `x${state.values.lives}`;
    } else {
        alert("Você perdeu uma vida! Prepare-se para continuar.");
        resetGame();
    }
}

function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if (state.values.curretTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        loseLife();
        initialize();
    }
}

function playSound() {
    let audio = new Audio("audio/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function randowSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randowSquare = state.view.squares[randomNumber];
    randowSquare.classList.add("enemy");
    state.values.hitPosition = randowSquare.id;
}

function moveEnemy() {
    state.actions.timerId = setInterval(randowSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", handleHit); // Para PC
        square.addEventListener("touchstart", handleHit); // Para celular
    });
}

function handleHit(event) {
    const square = event.target;
    if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound();
    }
}

function initialize() {
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    moveEnemy();
    addListenerHitBox();
}

initialize();
