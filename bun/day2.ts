import { readFile } from 'fs/promises';
import { argv } from 'process';

const inputFile = argv[2];

const part1 = (lines: Array<string>): number => {
  const reports = lines.map((line) => line.split(' ').map((value) => parseInt(value)));
  let validReports = 0;
  for (const report of reports) {
    let diffs = [];
    for (let j = 0; j < report.length - 1; j++) {
      diffs.push(report[j] - report[j + 1]);
    }

    if (diffs.every((diff) => diff >= -3 && diff <= -1) || diffs.every((diff) => diff >= 1 && diff <= 3)) {
      validReports++;
    }
  }

  return validReports;
};

const validIfOneRemoved = (report: Array<number>): boolean => {
  for (let i = 0; i < report.length; i++) {
    const copy = [...report];
    copy.splice(i, 1);
    let diffs = [];
    for (let j = 0; j < copy.length - 1; j++) {
      diffs.push(copy[j] - copy[j + 1]);
    }
    if (diffs.every((diff) => [-3, -2, -1].includes(diff)) || diffs.every((diff) => [1, 2, 3].includes(diff))) {
      return true;
    }
  }
  return false;
};

const part2 = (lines: Array<string>): number => {
  const reports = lines.map((line) => line.split(' ').map((value) => parseInt(value)));
  let validReports = 0;
  for (const report of reports) {
    let diffs = [];
    for (let j = 0; j < report.length - 1; j++) {
      diffs.push(report[j] - report[j + 1]);
    }
    if (diffs.every((diff) => [-3, -2, -1].includes(diff)) || diffs.every((diff) => [1, 2, 3].includes(diff))) {
      validReports++;
    } else {
      if (validIfOneRemoved(report)) {
        validReports++;
      }
    }
  }

  return validReports;
};

const puzzle = (await readFile(inputFile))
  .toString('utf-8')
  .split('\n')
  .filter((x) => x.length > 0);
console.log(`Day 2, Part 1: ${part1(puzzle)}`);
console.log(`Day 2, Part 2: ${part2(puzzle)}`);
