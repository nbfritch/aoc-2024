import { readFile } from "fs/promises";
import { argv } from "process";

const inputFile = argv[2];

const part1 = (lines: Array<string>): number => {
  return 0
};

const part2 = (lines: Array<string>): number => {
  return 0;
};

const puzzle = (await readFile(inputFile))
  .toString("utf-8")
  .split("\n")
  .filter((x) => x.length > 0);
console.log(`Day 4, Part 1: ${part1(puzzle)}`);
console.log(`Day 4, Part 2: ${part2(puzzle)}`);
