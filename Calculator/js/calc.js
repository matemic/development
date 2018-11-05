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

const calculateResult = () => {
	number2 = parseFloat(displayVal);
	let result = '';
	switch (operator) {
	case '+': {
		result = number1 + number2;
		break;
	}
	case '-': {
		result = number1 - number2;
		break;
	}
	case '*': {
		result = number1 * number2;
		break;
	}
	case '/': {
		if (number2 === 0) {
			result = 'Nie można dzielić przez zero';
		} else {
			result = number1 / number2;
		}
		break;
	}
	default: {
		return 'Nieprawidłowa operacja!';
	}
	}
	number1 = parseFloat(result);
	updateScreen(number1);
	console.log(`displayVal: ${displayVal}, Number1: ${number1}, Number2: ${number2}, isOper: ${isOper}, operator: ${operator} Result: ${result}`);
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
	isOper = false;
	updateScreen(displayVal);
	console.log(`displayVal: ${displayVal}, Number1: ${number1}, Number2: ${number2}, isOper: ${isOper}, operator: ${operator}`);
};

const handleOper = (oper) => {
	operator = oper;
	if (!isOper) {
		number1 = parseFloat(display.value);
		display.value = '0';
		isOper = true;
	}
	console.log(`displayVal: ${displayVal}, Number1: ${number1}, Number2: ${number2}, isOper: ${isOper}, operator: ${operator}`);
};

const showDigitFromTheUser = (e) => {
	squares.forEach(square => square.classList.remove('active'));
	const key = String.fromCharCode(e.keyCode);
	e.preventDefault();
	const evt = e.target.dataset;
	if (evt.calc || (key >= 0 && key <= 9)) {
		addDigitToTheScreen(evt.calc || key);
	}
	if (evt.oper 	|| (e.keyCode === 187 || e.keyCode === 189 || e.keyCode === 191
								|| e.keyCode === 56)) {
		if (e.keyCode === 187 && e.shiftKey) {
			handleOper('+');
		} else if (e.keyCode === 189) {
			handleOper('-');
		} else if (e.shiftKey && e.keyCode === 56) {
			handleOper('*');
		} else if (e.keyCode === 191) {
			handleOper('/');
		} else {
			handleOper(evt.oper);
		}
	}
	if (evt.decimal || e.keyCode === 190) {
		handleDecimal(evt.decimal || '.');
	}
	if (evt.clear || (e.keyCode === 27 || e.keyCode === 67)) {
		clearAll();
	}
	if (evt.equal || (e.keyCode === 187 && !e.shiftKey)) {
		calculateResult();
	}

	if (!evt.clear) {
		e.target.classList.add('active');
	}
};

const handleUserKeyBoard = (e) => {
	console.log((e.keyCode));
	console.log(e.target);
	showDigitFromTheUser(e);
};

document.addEventListener('keydown', handleUserKeyBoard);
squares.forEach(square => square.addEventListener('click', showDigitFromTheUser));
