import { readFile } from 'fs/promises';
import { argv } from 'process';

const inputFile = argv[2];

const part1 = (puzzle: string): number => {
  const files = [];
  let currentPos = 0;
  let id = 0;
  for (let i = 0; i < puzzle.length; i++) {
    const digit = parseInt(puzzle[i], 10);
    const pos = currentPos;
    const size = digit;
    if (i % 2 == 0) {
      files.push({ id, pos, size});
      id++;
    }
    currentPos += size
  }
  //console.log(files);
  console.log(currentPos);
  return 0;
};

const part2 = (puzzle: string): number => {
  return 0;
};

const puzzle = (await readFile(inputFile))
  .toString('utf-8');
console.log(`Day 9, Part 1: ${part1(puzzle)}`);
console.log(`Day 9, Part 2: ${part2(puzzle)}`);
