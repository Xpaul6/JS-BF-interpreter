function FuckMyBrain(programArray) {

    // Matching loop brackets check
    var bracketDiff = 0;
    for (i of programArray) {
        if (i == "[") bracketDiff++;
        else if (i == "]") bracketDiff--;
    }
    if (bracketDiff != 0) {
        throw new Error("unmatched bracket detected. Check if provided code is valid");
    }

    // Variables definition
    var output = ""; // String that stores all outputed symbols
    var tape = new Array(30000).fill(0); // Array of zeros with length of 30000
    var arrayPointer = 0; // Index of memory(array) pointer
    var programPointer = 0; // Index of program pointer
    var iterationLimit = 10000000; // Hardcoded iteration number limit to prevent infinite loops
    var iterationCounter = 0; // Counts interpreter iterations

    // Main interpreter loop
    while (programPointer < programArray.length) {

        // Infinite loop detection
        if (++iterationCounter > iterationLimit) { // Brakes a loop if iteration limit is exceeded
            throw new Error("infinite loop detected. Check if provided code is valid");
        }

        // Main switch case tree
        switch (programArray[programPointer]) {
            case "+":
                tape[arrayPointer] != 255 ? tape[arrayPointer]++ : tape[arrayPointer] = 0; // Overflow simultaion
                break;
            case "-":
                tape[arrayPointer] != 0 ? tape[arrayPointer]-- : tape[arrayPointer] = 255; // Overflow simultaion
                break;
            case ">":
                arrayPointer++;
                break;
            case "<":
                arrayPointer--;
                break;
            case ".":
                output += String.fromCharCode(tape[arrayPointer]); // Outputs character of presented ASCII code
                break;
            case ",":
                tape[arrayPointer] = programArray[programPointer + 1].charCodeAt(0); // Writes an ASCII code of given symbol
                programPointer++;
                break;
            case "[":
                if (tape[arrayPointer] == 0) {
                    var loopCounter = 1; // Represents the number of nested loops
                    while (loopCounter > 0) { // Moves program pointer forwards until it reaches its corresponding bracket 
                        programPointer++;
                        if (programArray[programPointer] == "[") {
                            loopCounter++;
                        } else if (programArray[programPointer] == "]") {
                            loopCounter--;
                        }
                    } 
                }
                break;
            case "]":
                if (tape[arrayPointer] != 0) {
                    var loopCounter = 1; // Represents the number of nested loops
                    while (loopCounter > 0) { // Moves program pointer backwards until it reaches its corresponding bracket
                        programPointer--;
                        if (programArray[programPointer] == "]") {
                            loopCounter++;
                        } else if (programArray[programPointer] == "[") {
                            loopCounter--;
                        }
                    }    
                }
                break;
        }

        // Moving to the next instruction
        programPointer++;
    }
    return output;
}

function Run() {
    var program = document.getElementById("inputField").value.split(""); // Array of user-provided program symbols
    var outputField = document.getElementById("outputField");
    outputField.textContent = "";
    try {
        outputField.textContent = FuckMyBrain(program); // Interpreter call 
        outputField.classList.remove("error");
    } catch (error){
        outputField.textContent = error;
        outputField.className = "error";
    }
}
