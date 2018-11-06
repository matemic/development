'use strict';

const power = document.querySelector('.power');
const startGame = document.querySelector('.start');
const strictMode = document.querySelector('.strict-mode');
const counter = document.querySelector('.counter');
const sounds = [...document.querySelectorAll('audio')];
const colors = [...document.querySelectorAll('.sound')];

const simonGame = {
	soundsOrder: [],
	playerOrder: [],
	isPowerOn: false,
	isStrictMode: false,
	isGameStarted: false,
	isComputerTurn: false,
	isWrongAnswer: false,
	stepsCount: 1
};

const enableStrictMode = (e) => {
	const { isPowerOn, isStrictMode } = simonGame;
	if (isPowerOn && !isStrictMode) {
		simonGame.isStrictMode = true;
	}
	else {
		simonGame.isStrictMode = false;
		e.target.checked = false;
	}
}

const powerOnSimon = () => {
	const { isPowerOn } = simonGame;
		if (!isPowerOn) {
			counter.textContent = '-';
			simonGame.isPowerOn = !simonGame.isPowerOn;
		} else {
			counter.textContent = '';
			simonGame.isPowerOn = false;
		}
}

const startSimonGame = () => {
	const { isPowerOn } = simonGame;
	if (!isPowerOn) return;
	counter.textContent = 1;
	for (let i = 0; i <= 16; i++) {
		simonGame.soundsOrder.push(Math.floor(Math.random() * 4 + 1));
	}
	simonGame.isComputerTurn = true;
	setInterval(gameTurn, 800);
	simonGame.isGameStarted = true;
}

const removeColors = () => {
	colors.forEach(color => color.classList.remove('active'));
}

const playFirstSound = () => {
	sounds[0].play();
	removeColors();
	colors[0].classList.add('active');
}

const playSecondSound = () => {
	sounds[1].play();
	removeColors();
	colors[1].classList.add('active');
}

const playThirdSound = () => {
	sounds[2].play();
	removeColors();
	colors[2].classList.add('active');
}

const playFourthSound = () => {
	sounds[3].play();
	removeColors();
	colors[3].classList.add('active');
}

const gameTurn  = () => {
	const { soundsOrder, stepsCount } = simonGame;
		if (simonGame.isComputerTurn) {
			setTimeout(() => {
					if (soundsOrder[stepsCount] === 1) playFirstSound();
					if (soundsOrder[stepsCount] === 2) playSecondSound();
					if (soundsOrder[stepsCount] === 3) playThirdSound();
					if (soundsOrder[stepsCount] === 4) playFourthSound();
					simonGame.stepsCount++;
			}, 200);
		}
		if (simonGame.stepsCount === simonGame.soundsOrder.length) {
			clearInterval(gameTurn);
			removeColors();
		}
}

const playerTurn = (e) => {
	const { isPowerOn, isGameStarted } = simonGame;
		if (isPowerOn && isGameStarted) {
			console.log(e.target);
		}
		console.log(simonGame);
}

power.addEventListener('change', powerOnSimon);
startGame.addEventListener('click', startSimonGame);
strictMode.addEventListener('change', enableStrictMode);
colors.forEach(color => color.addEventListener('click', playerTurn));


