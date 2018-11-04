const squares = document.querySelectorAll('.square');
const display = document.getElementById('calcExpression');

let isOper = false;
let number1 = null;
let number2 = null;
let displayVal = null;
let operator = null;

const updateScreen = (value) => {
	display.value = value;
};

const calculateResult = (num1, oper) => {
	number2 = parseFloat(displayVal);
	let result = '';
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
	number1 = parseFloat(result);
	updateScreen(number1);
	console.log(`displayVal: ${displayVal}, Number1: ${number1}, Number2: ${number2}, isOper: ${isOper}, operator: ${operator}`);
};

const clearAll = () => {
	display.value = '0';
	isOper = false;
	number1 = null;
	number2 = null;
	displayVal = null;
	operator = null;
	console.log(`displayVal: ${displayVal}, Number1: ${number1}, Number2: ${number2}, isOper: ${isOper}, operator: ${operator}`);
};

const handleDecimal = (dec) => {
	if (!display.value.includes('.')) {
		display.value += dec;
	}
};
const addDigitToTheScreen = (digit) => {
	displayVal = display.value;
	if (displayVal === '0') {
		displayVal = digit;
	} else {
		displayVal += digit;
	}
	if (number1 && isOper) {
		calculateResult(number1, operator);
	}
	updateScreen(displayVal);
	console.log(`displayVal: ${displayVal}, Number1: ${number1}, Number2: ${number2}, isOper: ${isOper}, operator: ${operator}`);
};

const handleOper = (oper) => {
	if (!isOper) {
		operator = oper;
		isOper = !isOper;
		number1 = parseFloat(displayVal);
		display.value = '0';
	}
	console.log(`displayVal: ${displayVal}, Number1: ${number1}, Number2: ${number2}, isOper: ${isOper}, operator: ${operator}`);
	isOper = false;
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
	squares.forEach(square => square.classList.remove('active'));
	e.target.classList.add('active');
};

squares.forEach(square => square.addEventListener('click', showDigitFromTheUser));
