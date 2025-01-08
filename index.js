function FuckMyBrain(programArray) {
    var output = "";
    var tape = new Array(30000).fill(0); // Array of zeros with length of 30000
    var arrayPointer = 0; // Index of memory(array) pointer
    var programPointer = 0; // Index of program pointer
    while (programPointer < programArray.length) {
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
            // Input symbols by putting them right after the comma in program code
            case ",":
                tape[arrayPointer] = programArray[programPointer + 1].charCodeAt(0); // Writes an ASCII code of given symbol
                programPointer++;
                break;
            case "[":
                if (tape[arrayPointer] == 0) {
                    var innerLoopCounter = 1; // Is 1 by default to prevent values lower than 0
                    while (innerLoopCounter > 0) { // Moves program pointer until it reaches its corresponding bracket 
                        programPointer++;
                        if (programArray[programPointer] == "[") {
                            innerLoopCounter++;
                        } else if (programArray[programPointer] == "]") {
                            innerLoopCounter--;
                        }
                    } 
                }
                break;
            case "]":
                if (tape[arrayPointer] != 0) {
                    var innerLoopCounter = 1; // Is 1 by default to prevent values lower than 0
                    while (innerLoopCounter > 0) { // Moves program pointer until it reaches its corresponding bracket
                        programPointer--;
                        if (programArray[programPointer] == "]") {
                            innerLoopCounter++;
                        } else if (programArray[programPointer] == "[") {
                            innerLoopCounter--;
                        }
                    }    
                }
                break;
        }
        programPointer++; // Moving to the next instruction
    }
    return output;
}

function Run() {
    var program = document.getElementById("inputField").value.split("");
    document.getElementById("outputField").textContent = "";
    document.getElementById("outputField").textContent = FuckMyBrain(program); // Interpreter call
}

/*
Code examples:

Input: ++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.
Output: Hello World!

Input: >,4<++++++++[>------<-]>>++++++++[>++++++<-]<[>>+.<<-]>.
Output: 1234

Input: +++++++++++++[>>+++++<<-]++++++[>++++<-]>++[>.+<-]
Output: ABCDEFGHIJKLMNOPQRSTUVWXYZ
*/