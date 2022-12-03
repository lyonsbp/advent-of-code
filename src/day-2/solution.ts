import * as fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getData() {
  const file = await fs.readFile(path.join(__dirname, "input.txt"));
  const data = file.toString().split("\n");

  return data;
}

/*
  A: Rock, X: Rock
  B: Paper, Y: Paper
  C: Scissors, Z: Scissors
*/
const outcomeMap = {
  A: {
    X: 4,
    Y: 8,
    Z: 3
  },
  B: {
    X: 1,
    Y: 5,
    Z: 9
  },
  C: {
    X: 7,
    Y: 2,
    Z: 6
  }
};
async function part1() {
  const games = await getData();
  return games.reduce((prev, curr) => {
    return prev + outcomeMap[curr[0]][curr[2]];
  }, 0);
}

/*
  A: Rock, X: Lose
  B: Paper, Y: Draw
  C: Scissors, Z: Win
*/
const outcomeMap2 = {
  A: {
    X: 3,
    Y: 4,
    Z: 8
  },
  B: {
    X: 1,
    Y: 5,
    Z: 9
  },
  C: {
    X: 2,
    Y: 6,
    Z: 7
  }
};
async function part2() {
  const games = await getData();
  return games.reduce((prev, curr) => {
    return prev + outcomeMap2[curr[0]][curr[2]];
  }, 0);
}

console.log(await part1());
console.log(await part2());
