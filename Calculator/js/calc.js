const Calculator = (function () {

    const squares = document.querySelectorAll('.square');
    const input = document.getElementById('calcExpression').value;
    const equal = document.querySelector('.square[data-equal]');
    const warningInfo = document.querySelector('.warning-info');
    const operators = ['/', '*', '-', '+', '=', '.'];
    
    
    
    window.addEventListener('keydown', handleKeyboard);
    squares.forEach(square => square.addEventListener('click', calculateExpression));

}());