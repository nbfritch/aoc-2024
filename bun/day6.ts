import { readFile } from "fs/promises";
import { argv } from "process";

const inputFile = argv[2];

interface Pos {
  x: number;
  y: number;
}

const turnRight = (p: Pos): Pos => {
  return {
    x: -p.y,
    y: p.x
  }
};

const part1 = (lines: Array<string>): number => {
  let start: { x: number; y: number } | null = null;
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === '^') {
        start = { x, y };
        break;
      }
    }
  }

  if (start == null) {
    throw new Error('Must contain char ^');
  }

  const guardedPositions: Array<Array<boolean>> = lines.map(line => Array.from(line).map(_ => false));

  let currentPos: Pos = { ...start };
  let currentDirection: Pos = { x: 0, y: -1 };

  while (true) {
    if (currentPos.y < 0 || currentPos.x < 0 || currentPos.y >= lines.length || currentPos.x >= lines[currentPos.y].length) {
      break;
    }

    guardedPositions[currentPos.y][currentPos.x] = true;

    const thingInFront = { x: currentPos.x + currentDirection.x, y: currentPos.y + currentDirection.y };
    if (thingInFront.y < 0 || thingInFront.x < 0 || thingInFront.y >= lines.length || thingInFront.x >= lines[currentPos.y].length) {
      break;
    }
    if (lines[thingInFront.y][thingInFront.x] == '#') {
      currentDirection = turnRight(currentDirection);
    }

    currentPos = { x: currentPos.x + currentDirection.x, y: currentPos.y + currentDirection.y };
  }

  let sum = 0;
  for (let y = 0; y < guardedPositions.length; y++) {
    for (let x = 0; x < guardedPositions[y].length; x++) {
      if (guardedPositions[y][x] == true) {
        sum += 1;
      }
    }
  }
  return sum;
};

const part2 = (lines: Array<string>): number => {
  return 0;
};

const puzzle = (await readFile(inputFile))
  .toString("utf-8")
  .split("\n")
  .filter((x) => x.length > 0);
console.log(`Day 6, Part 1: ${part1(puzzle)}`);
console.log(`Day 6, Part 2: ${part2(puzzle)}`);
