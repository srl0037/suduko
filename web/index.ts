// index.ts
// @ts-ignore: Emscripten Module will be globally available after script load
declare var Module: any;

async function main() {
  // Wait for the Module to be ready
  await new Promise<void>((resolve) => {
    Module.onRuntimeInitialized = () => resolve();
  });

  const gridDiv = document.getElementById("grid")!;
  for (let i = 0; i < 81; i++) {
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.max = "9";
    input.value = "0";
    input.style.width = "30px";
    input.style.height = "30px";
    input.style.textAlign = "center";
    gridDiv.appendChild(input);
  }

  const inputs = gridDiv.querySelectorAll("input");

  document.getElementById("solve")!.addEventListener("click", () => {
    const puzzle = new Int32Array(81);
    inputs.forEach((input, i) => {
      const val = parseInt(input.value);
      puzzle[i] = isNaN(val) ? 0 : val;
    });

    const ptr = Module._malloc(puzzle.length * puzzle.BYTES_PER_ELEMENT);
    Module.HEAP32.set(puzzle, ptr / 4);

    const result = Module.ccall("solverPuzzle", "number", ["number"], [ptr]);

    if (result) {
        const solved: Int32Array = Module.HEAP32.subarray(ptr / 4, ptr / 4 + 81);
        solved.forEach((num: number, i: number) => {
            inputs[i].value = num.toString();
    });

    } else {
      alert("Could not solve the puzzle!");
    }

    Module._free(ptr);
  });
}

main();
