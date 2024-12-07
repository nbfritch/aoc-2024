import { readFile } from "fs/promises";
import { argv } from "process";

const inputFile = argv[2];

interface Reading {
  target: number;
  values: Array<number>;
}

const anyCombination = (
  target: number,
  value: number,
  otherValues: Array<number>,
): boolean => {
  if (otherValues.length === 0) {
    return target == value;
  }

  const [nextValue, ...rest] = otherValues;
  if (anyCombination(target, value + nextValue, rest)) {
    return true;
  }

  if (anyCombination(target, value * nextValue, rest)) {
    return true;
  }

  return false;
};

const part1 = (lines: Array<string>): number => {
  const anyCombination = (
    target: number,
    value: number,
    otherValues: Array<number>,
  ): boolean => {
    if (otherValues.length === 0) {
      return target == value;
    }

    const [nextValue, ...rest] = otherValues;

    if (anyCombination(target, value + nextValue, rest)) {
      return true;
    }

    if (anyCombination(target, value * nextValue, rest)) {
      return true;
    }

    return false;
  };

  const readings: Array<Reading> = lines.map((line) => {
    const [targetStr, valuesStr] = line.split(": ");

    return {
      target: parseInt(targetStr, 10),
      values: valuesStr.split(" ").map((p) => parseInt(p, 10)),
    };
  });

  return readings
    .filter((reading) => anyCombination(reading.target, 0, reading.values))
    .reduce((acc, i) => acc + i.target, 0);
};

const concatenate = (n1: number, n2: number): number => {
  return parseInt(`${n1}${n2}`, 10);
};

const part2 = (lines: Array<string>): number => {
  const anyCombination = (
    target: number,
    value: number,
    otherValues: Array<number>,
  ): boolean => {
    if (otherValues.length === 0) {
      return target == value;
    }

    const [nextValue, ...rest] = otherValues;
    if (anyCombination(target, concatenate(value, nextValue), rest)) {
      return true;
    }

    if (anyCombination(target, value + nextValue, rest)) {
      return true;
    }

    if (anyCombination(target, value * nextValue, rest)) {
      return true;
    }

    return false;
  };

  const readings: Array<Reading> = lines.map((line) => {
    const [targetStr, valuesStr] = line.split(": ");
    return {
      target: parseInt(targetStr, 10),
      values: valuesStr.split(" ").map((p) => parseInt(p, 10)),
    };
  });

  return readings
    .filter((reading) => anyCombination(reading.target, 0, reading.values))
    .reduce((acc, i) => acc + i.target, 0);
};

const puzzle = (await readFile(inputFile))
  .toString("utf-8")
  .split("\n")
  .filter((x) => x.length > 0);
console.log(`Day 7, Part 1: ${part1(puzzle)}`);
console.log(`Day 7, Part 2: ${part2(puzzle)}`);
