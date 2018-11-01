const squares = document.querySelectorAll('.square');
const display = document.getElementById('calcExpression');
const warningInfo = document.querySelector('.warning-info');

let isOper = false;
let number1 = null;
let number2 = null;
let displayVal = null;
let operator = null;

const calculateResult = (num1, oper) => {
	let result = '';
	number2 = parseFloat(display.value);
	switch (oper) {
	case '+': {
		result = num1 + number2;
		break;
	}
	case '-': {
		result = num1 - number2;
		break;
	}
	case '*': {
		result = num1 * number2;
		break;
	}
	case '/': {
		if (number2 === 0) {
			result = 'Nie można dzielić przez zero';
		} else {
			result = num1 / number2;
		}
		break;
	}
	default: {
		return 'Nieprawidłowa operacja!';
	}
	}
	display.value = result;
};

const clearAll = () => {
	display.value = '0';
	isOper = false;
	number1 = null;
	number2 = null;
	displayVal = null;
	operator = null;
};

const handleDecimal = (dec) => {
	if (!display.value.includes('.')) {
		display.value += dec;
	}
};
const addDigitToTheScreen = (digit) => {
	displayVal = display.value;
	if (display.value === '0') {
		display.value = digit;
	} else {
		display.value = displayVal + digit;
	}
};

const handleOper = (oper) => {
	if (!isOper) {
		operator = oper;
		isOper = !isOper;
		number1 = parseFloat(display.value);
		display.value = '0';
	}
};

const showDigitFromTheUser = (e) => {
	const evt = e.target.dataset;
	if (evt.calc) {
		addDigitToTheScreen(evt.calc);
	}
	if (evt.oper) {
		handleOper(evt.oper);
	}
	if (evt.decimal) {
		handleDecimal(evt.decimal);
	}
	if (evt.clear) {
		clearAll();
	}
	if (evt.equal) {
		calculateResult(number1, operator);
	}
};
// window.addEventListener('keydown', handleKeyboard);
squares.forEach(square => square.addEventListener('click', showDigitFromTheUser));
