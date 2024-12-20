document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggleMode");
    const outputElement = document.getElementById("output");
    const prefixInput = document.getElementById("prefixInput");
    const postfixInput = document.getElementById("postfixInput");
    const clearButton = document.getElementById("clear");
    const evalPrefixButton = document.getElementById("evalPrefix");
    const evalPostfixButton = document.getElementById("evalPostfix");
  
    // Toggle dark mode
    toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      toggleButton.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌛";
    });
  
    // Prefix expression
    evalPrefixButton.addEventListener("click", () => {
      const expression = prefixInput.value.trim();
      if (expression) {
        const result = evaluatePrefix(expression);
        outputElement.textContent = `Prefix result: ${result}`;
      } else {
        outputElement.textContent = "Please enter a prefix expression.";
      }
    });
  
    // Postfix expression
    evalPostfixButton.addEventListener("click", () => {
      const expression = postfixInput.value.trim();
      if (expression) {
        const result = evaluatePostfix(expression);
        outputElement.textContent = `Postfix result: ${result}`;
      } else {
        outputElement.textContent = "Please enter a postfix expression.";
      }
    });
  
    // Clear inputs and results
    clearButton.addEventListener("click", () => {
      prefixInput.value = "";
      postfixInput.value = "";
      outputElement.textContent = "";
    });
  
    // Functions to evaluate expressions
    function evaluatePrefix(expression) {
      const stack = [];
      const tokens = expression.split(" ").reverse();
      for (let token of tokens) {
        if (isOperator(token)) {
          const operand1 = stack.pop();
          const operand2 = stack.pop();
          stack.push(performOperation(token, operand1, operand2));
        } else {
          stack.push(Number(token));
        }
      }
      return stack.pop();
    }
  
    function evaluatePostfix(expression) {
      const stack = [];
      const tokens = expression.split(" ");
      for (let token of tokens) {
        if (isOperator(token)) {
          const operand2 = stack.pop();
          const operand1 = stack.pop();
          stack.push(performOperation(token, operand1, operand2));
        } else {
          stack.push(Number(token));
        }
      }
      return stack.pop();
    }
  
    function isOperator(token) {
      return ["+", "-", "*", "/"].includes(token);
    }
  
    function performOperation(operator, operand1, operand2) {
      switch (operator) {
        case "+":
          return operand1 + operand2;
        case "-":
          return operand1 - operand2;
        case "*":
          return operand1 * operand2;
        case "/":
          return operand1 / operand2;
        default:
          return 0;
      }
    }
  });
  