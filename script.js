const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
let currentInput = '';

buttons.forEach(button => {
  button.addEventListener('click', () => handleInput(button.textContent));
});

// Function to handle both button clicks and keyboard input
function handleInput(value) {
  if (value === 'C' || value === 'Escape') {
    currentInput = '';
    display.textContent = '0';
  } else if (value === '←' || value === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    display.textContent = currentInput || '0';
  } else if (value === '=' || value === 'Enter') {
    try {
      const expression = currentInput
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-');
      currentInput = eval(expression).toString();
      display.textContent = currentInput;
    } catch {
      display.textContent = 'Error';
      currentInput = '';
    }
  } else if (value === '±') {
    if (currentInput.startsWith('-')) {
      currentInput = currentInput.slice(1);
    } else {
      currentInput = '-' + currentInput;
    }
    display.textContent = currentInput;
  } else {
    currentInput += value;
    display.textContent = currentInput;
  }
}

// Keyboard support
document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (/^[0-9]$/.test(key)) {
    handleInput(key); // numbers
  } else if (['+', '-', '*', '/'].includes(key)) {
    handleInput(key); // operators
  } else if (key === 'Enter') {
    handleInput('Enter');
  } else if (key === 'Backspace') {
    handleInput('Backspace');
  } else if (key === 'Escape') {
    handleInput('Escape');
  } else if (key === '.') {
    handleInput('.');
  }
});
