"use strict";
const gridElement = document.getElementById("grid");
const solveButton = document.getElementById("solve");
// Create the 9x9 grid of input boxes
const inputs = [];
for (let row = 0; row < 9; row++) {
    const rowInputs = [];
    for (let col = 0; col < 9; col++) {
        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        input.className = "w-8 h-8 text-center border border-gray-300";
        gridElement.appendChild(input);
        rowInputs.push(input);
    }
    inputs.push(rowInputs);
}
Module.onRuntimeInitialized = () => {
    solveButton.addEventListener("click", () => {
        const puzzle = new Int32Array(81);
        // Read input values into the puzzle array
        for (let i = 0; i < 81; i++) {
            const val = inputs[Math.floor(i / 9)][i % 9].value;
            puzzle[i] = val ? parseInt(val) || 0 : 0;
        }
        const ptr = Module._malloc(puzzle.length * puzzle.BYTES_PER_ELEMENT);
        Module.HEAP32.set(puzzle, ptr / 4);
        const solved = Module.ccall("solverPuzzle", "number", ["number"], [ptr]);
        if (solved) {
            const result = Module.HEAP32.subarray(ptr / 4, ptr / 4 + 81);
            for (let i = 0; i < 81; i++) {
                inputs[Math.floor(i / 9)][i % 9].value = result[i].toString();
            }
        }
        else {
            alert("Could not solve puzzle!");
        }
        Module._free(ptr);
    });
};
