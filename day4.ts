import { readFile } from "fs/promises";
import { argv } from "process";

const inputFile = argv[2];

const vectors = [
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
];

const xmas = "XMAS";

const findXmas = (
  puzzle: Array<string>,
  vector: Array<number>,
  x: number,
  y: number,
): boolean => {
  let ix = x;
  let iy = y;
  for (let c = 0; c < xmas.length; c++) {
    if (
      ix >= puzzle[0].length ||
      iy >= puzzle.length ||
      ix < 0 ||
      iy < 0 ||
      puzzle[iy][ix] !== xmas[c]
    ) {
      return false;
    }
    ix += vector[0];
    iy += vector[1];
  }
  return true;
};

const part1 = (lines: Array<string>): number => {
  let instances = 0;
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === "X") {
        for (const vector of vectors) {
          if (findXmas(lines, vector, x, y)) {
            instances++;
          }
        }
      }
    }
  }
  return instances;
};

const diagonalVectors = [
  [1, -1],
  [1, 1],
  [-1, 1],
  [-1, -1],
];

const validMas = ["SSMM", "MSSM", "MMSS", "SMMS"];

const findMas = (puzzle: Array<string>, x: number, y: number): boolean => {
  const diagonalSpaces = diagonalVectors.map(
    (vector) => puzzle[y + vector[1]]?.[x + vector[0]],
  );
  return validMas.includes(diagonalSpaces.join(""));
};

const part2 = (lines: Array<string>): number => {
  let instances = 0;
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === "A") {
        if (findMas(lines, x, y)) {
          instances++;
        }
      }
    }
  }
  return instances;
};

const puzzle = (await readFile(inputFile))
  .toString("utf-8")
  .split("\n")
  .filter((x) => x.length > 0);
console.log(`Day 4, Part 1: ${part1(puzzle)}`);
console.log(`Day 4, Part 2: ${part2(puzzle)}`);
