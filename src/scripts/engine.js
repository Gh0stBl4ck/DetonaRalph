const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        live: document.querySelector(".menu-lives h2"), // Corrigido para o elemento das vidas
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
    state.values.curretTime = 60; // Resetando o tempo
    state.values.result = 0; // Resetando o placar
    state.view.timeLeft.textContent = state.values.curretTime;
    state.view.score.textContent = state.values.result;
}

function loseLife() {
    state.values.lives--; // Reduz uma vida
    state.view.live.textContent = `x${state.values.lives}`; // Atualiza a exibição de vidas

    if (state.values.lives === 0) {
        // Se as vidas acabarem, reseta tudo
        alert("Você perdeu todas as vidas! Jogo reiniciado.");
        state.values.lives = 3; // Reseta vidas
        resetGame(); // Reseta tempo e score
        state.view.live.textContent = `x${state.values.lives}`; // Atualiza a exibição
    } else {
        alert("Você perdeu uma vida! Sua pontuação foi: " + state.values.result + (".") + (" Prepare-se para continuar!"));
        resetGame(); // Reseta apenas tempo e score
    }
}

function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if (state.values.curretTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        loseLife(); // Chama a função para perder uma vida
        initialize(); // Reinicia o jogo
    }
}

function playSound() {
    let audio = new Audio("../src/audios/hit.m4a");
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
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        });
    });
}

function initialize() {
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    moveEnemy();
    addListenerHitBox();
}

initialize();
