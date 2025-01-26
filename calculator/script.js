const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = ""; // Current number being typed
let previousInput = ""; // Stored number for calculations
let operator = ""; // Operator selected

// Add event listeners to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (value === "C") {
      // Clear everything
      currentInput = "";
      previousInput = "";
      operator = "";
      updateDisplay("0");
    } else if (value === "=") {
      // Perform the calculation
      if (currentInput && previousInput && operator) {
        const result = calculate(parseFloat(previousInput), parseFloat(currentInput), operator);
        updateDisplay(result);
        previousInput = result.toString(); // Store result for further calculations
        currentInput = "";
        operator = ""; // Reset operator after calculation
      }
    } else if (["+", "-", "*", "/"].includes(value)) {
      // Store the operator and move the current input to previousInput
      if (currentInput) {
        if (previousInput && operator) {
          // Perform intermediate calculation
          const intermediateResult = calculate(parseFloat(previousInput), parseFloat(currentInput), operator);
          previousInput = intermediateResult.toString();
          updateDisplay(`${previousInput} ${value}`);
        } else {
          previousInput = currentInput;
          updateDisplay(`${previousInput} ${value}`);
        }
        currentInput = "";
        operator = value; // Update the operator
      }
    } else {
      // Append numbers or dot to the current input
      if (value === "." && currentInput.includes(".")) {
        // Prevent multiple dots in the current number
        return;
      }
      currentInput += value;
      updateDisplay(previousInput ? `${previousInput} ${operator} ${currentInput}` : currentInput);
    }
  });
});

// Perform the calculation
function calculate(num1, num2, op) {
  switch (op) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num2 !== 0 ? num1 / num2 : "Error"; // Prevent division by zero
    default:
      return "Error";
  }
}

// Update the display content
function updateDisplay(content) {
  display.textContent = content;
}
