const display = document.getElementById("displayText");
const buttons = document.querySelector(".buttons");

let inputText = "0";
let isResult = false;

buttons.addEventListener("click", function (e) {
  const button = e.target;
  if (button.tagName !== "BUTTON") {
    return;
  }

  const number = button.dataset.number;
  const operator = button.dataset.operator;
  const action = button.dataset.action;

  if (number !== undefined) {
    clickNumber(number);
  } else if (operator !== undefined) {
    clickOperator(operator);
  } else if (action === "dot") {
    clickDot();
  } else if (action === "equal") {
    calculate();
  } else if (action === "clear") {
    clearAll();
  } else if (action === "back") {
    backspace();
  }
});

function clickNumber(num) {
  if (isResult) {
    inputText = "0";
    isResult = false;
  }

  const lastChar = inputText.slice(-1);

  if (inputText === "0") {
    inputText = num;
  } else if (isOperator(lastChar)) {
    inputText = inputText + num;
  } else {
    const lastNumber = getLastNumber();
    if (lastNumber === "0") {
      inputText = inputText.slice(0, -1) + num;
    } else {
      inputText = inputText + num;
    }
  }

  display.textContent = inputText;
}

function clickOperator(op) {
  isResult = false;

  const lastChar = inputText.slice(-1);

  if (isOperator(lastChar)) {
    inputText = inputText.slice(0, -1) + op;
  } else {
    inputText = inputText + op;
  }

  display.textContent = inputText;
}

function clickDot() {
  const lastChar = inputText.slice(-1);

  if (isOperator(lastChar)) {
    inputText = inputText + "0.";
    display.textContent = inputText;
    return;
  }

  const lastNumber = getLastNumber();
  if (lastNumber.indexOf(".") !== -1) return;

  inputText = inputText + ".";
  display.textContent = inputText;
}

function calculate() {
  const lastChar = inputText.slice(-1);
  if (isOperator(lastChar)) {
    inputText = inputText.slice(0, -1);
  }

  const formula = inputText
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-");

  try {
    const result = eval(formula);
    inputText = String(result);
    display.textContent = inputText;
    isResult = true;
  } catch {
    display.textContent = "エラー";
  }
}

function getLastNumber() {
  const split = inputText.split(/[+−×÷]/);
  return split[split.length - 1];
}

function clearAll() {
  inputText = "0";
  display.textContent = inputText;
  isResult = false;
}

function backspace() {
  if (inputText.length > 1) {
    inputText = inputText.slice(0, -1);
  } else {
    inputText = "0";
  }
  display.textContent = inputText;
}

function isOperator(char) {
  return char === "+" || char === "−" || char === "×" || char === "÷";
}
