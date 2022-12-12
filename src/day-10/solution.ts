import * as fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getData() {
  const file = await fs.readFile(path.join(__dirname, "input.txt"));
  const data = file
    .toString()
    .split("\n")
    .map(line => line.split(" "))
    .map(item => [item[0], Number(item[1])]);

  return data;
}

function part1(commands: (string | number)[][]) {
  let reg = 1;
  let cycle = 0;
  let nextLog = 20;
  const ret: number[] = [];

  function logSignal() {}

  for (const [command, param] of commands) {
    if (command === "noop") {
      cycle++;
      if (cycle === nextLog) {
        nextLog += 40;
        ret.push(cycle * reg);
      }
    }
    if (command === "addx") {
      for (let i = 0; i < 2; i++) {
        cycle += 1;
        if (cycle === nextLog) {
          nextLog += 40;
          ret.push(cycle * reg);
        }
      }
      reg += +param;
    }
  }

  return ret.reduce((prev, curr) => prev + curr, 0);
}

function part2(commands: (string | number)[][]) {
  const screen: string[][] = [];
  const width = 40;
  const height = 6;

  let cycle = 0;
  let reg = 1;

  for (let i = 0; i < height; i++) {
    screen.push(new Array(width).fill("."));
  }

  for (const [command, param] of commands) {
    if (command === "noop") {
      if (Math.abs((cycle % 40) - reg) <= 1) {
        const col = cycle % width;
        const row = Math.floor(cycle / width);
        screen[row][col] = "#";
      }
      cycle++;
    }
    if (command === "addx") {
      for (let i = 0; i < 2; i++) {
        if (Math.abs((cycle % 40) - reg) <= 1) {
          const col = cycle % width;
          const row = Math.floor(cycle / width);
          screen[row][col] = "#";
        }
        cycle++;
      }
      reg += +param;
    }
  }

  for (const row of screen) {
    console.log(row.join(""));
  }
}

const data = await getData();
console.log(part1(data));
console.log(part2(data));
