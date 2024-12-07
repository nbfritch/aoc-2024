import { readFile } from 'fs/promises';
import { argv } from 'process';

const inputFile = argv[2];

const part1 = (rulesStr: string, updateStr: string): number => {
  const rules: Array<Array<number>> = rulesStr
    .split('\n')
    .filter((n) => n.length > 0)
    .map((rule) => rule.split('|').map((rulePart) => parseInt(rulePart, 10)));
  const updates = updateStr
    .split('\n')
    .filter((n) => n.length > 0)
    .map((update) => update.split(',').map((updatePart) => parseInt(updatePart, 10)));
  let sum = 0;
  for (const u of updates) {
    let brokenRule = false;
    for (const rule of rules) {
      const [before, after] = rule;
      if (u.includes(before) && u.includes(after)) {
        const bIndex = u.findIndex((uValue) => before === uValue);
        const aIndex = u.findIndex((uValue) => after === uValue);
        if (bIndex >= aIndex) {
          brokenRule = true;
        }
      }
    }

    if (brokenRule) {
      continue;
    } else {
      const middleIndex = Math.floor(u.length / 2);
      sum += u[middleIndex];
    }
  }
  return sum;
};

const part2 = (rulesStr: string, updateStr: string): number => {
  const rules: Array<Array<number>> = rulesStr
    .split('\n')
    .filter((n) => n.length > 0)
    .map((rule) => rule.split('|').map((rulePart) => parseInt(rulePart, 10)));
  const updates = updateStr
    .split('\n')
    .filter((n) => n.length > 0)
    .map((update) => update.split(',').map((updatePart) => parseInt(updatePart, 10)));
  let sum = 0;

  for (const u of updates) {
    const applicibleRules = rules.filter(([before, after]) => u.includes(before) && u.includes(after));
    const sortedU = [...u].sort((v1, v2) => {
      const rule = applicibleRules.find((rule) => (rule[0] == v1 && rule[1] == v2) || (rule[0] == v2 && rule[1] == v1));
      if (rule == null) {
        return 0;
      }
      return rule[0] == v1 ? -1 : 1;
    });
    console.log(sortedU);
    if (u.every((v, i) => sortedU[i] == v)) {
      continue;
    } else {
      const middleIndex = Math.floor(sortedU.length / 2);
      sum += sortedU[middleIndex];
    }
  }

  return sum;
};

const [rules, updates] = (await readFile(inputFile))
  .toString('utf-8')
  .split('\n\n')
  .filter((x) => x.length > 0);
console.log(`Day 1, Part 1: ${part1(rules, updates)}`);
console.log(`Day 1, Part 2: ${part2(rules, updates)}`);
