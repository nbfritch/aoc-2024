import { readFile } from 'fs/promises';
import { argv } from 'process';

const inputFile = argv[2];

const evalMul = (mulInstr: string): number => {
  const nums = mulInstr.replaceAll('mul(', '').replaceAll(')', '').replaceAll(',', ' ');
  const [left, right] = nums.split(' ').map((x) => parseInt(x, 10));
  return left * right;
};

const part1 = (puzzle: string): number => {
  const mulInstrs = puzzle.matchAll(/mul\([0-9]+\,[0-9]+\)/g);
  let sum = 0;
  for (const instr of mulInstrs) {
    const n = evalMul(instr[0]);
    sum += n;
  }
  return sum;
};

const part2 = (puzzle: string): number => {
  const mulRegex = /mul\([0-9]+\,[0-9]+\)/g;
  const doRegex = /do\(\)/g;
  const dontRegex = /don\'t\(\)/g;
  const mulInstrs = puzzle.matchAll(mulRegex).map((match) => ({ index: match.index, match: match[0] }));
  const doInstrs = puzzle.matchAll(doRegex).map((match) => ({ index: match.index, match: match[0] }));
  const dontInstrs = puzzle.matchAll(dontRegex).map((match) => ({ index: match.index, match: match[0] }));
  const allInstrs = [...mulInstrs, ...doInstrs, ...dontInstrs].sort((a, b) => a.index - b.index).map((x) => x.match);
  let sum = 0;
  let enable = true;
  for (const instr of allInstrs) {
    if (instr == "don't()") {
      enable = false;
      continue;
    } else if (instr == 'do()') {
      enable = true;
      continue;
    }

    if (enable) {
      sum += evalMul(instr);
    }
  }
  return sum;
};

const puzzle = (await readFile(inputFile)).toString('utf-8');
console.log(`Day 3, Part 1: ${part1(puzzle)}`);
console.log(`Day 3, Part 2: ${part2(puzzle)}`);
