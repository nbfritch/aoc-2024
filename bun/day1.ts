import { readFile } from 'fs/promises';
import { argv } from 'process';

const inputFile = argv[2];

const part1 = (lines: Array<string>): number => {
  const numbers = lines.map((x) => x.split('   ').map((y) => parseInt(y)));
  const left: Array<number> = [];
  const right: Array<number> = [];
  numbers.forEach(([l, r]) => {
    left.push(l);
    right.push(r);
  });
  const lsort = left.sort();
  const rsort = right.sort();
  const diffs = [];
  for (let i = 0; i < lsort.length; i++) {
    diffs.push(Math.abs(rsort[i] - lsort[i]));
  }
  return diffs.reduce((acc, x) => acc + x, 0);
};

const part2 = (lines: Array<string>): number => {
  const numbers = lines.map((x) => x.split('   ').map((y) => parseInt(y)));
  const left: Array<number> = [];
  const right: Array<number> = [];
  numbers.forEach(([l, r]) => {
    left.push(l);
    right.push(r);
  });

  let scores = [];
  for (let i = 0; i < left.length; i++) {
    const num = left[i];
    const timesInRight = right.filter((x) => x === num).length;
    scores.push(num * timesInRight);
  }
  return scores.reduce((acc, x) => acc + x, 0);
};

const puzzle = (await readFile(inputFile))
  .toString('utf-8')
  .split('\n')
  .filter((x) => x.length > 0);
console.log(`Day 1, Part 1: ${part1(puzzle)}`);
console.log(`Day 1, Part 2: ${part2(puzzle)}`);
