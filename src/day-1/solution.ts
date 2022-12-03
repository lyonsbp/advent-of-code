import * as fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getData() {
  const file = await fs.readFile(path.join(__dirname, "input.txt"));

  const data = file.toString().split("\n");
  const calCounts = data.reduce(
    (prev, curr) => {
      if (curr === "") {
        prev.push(0);
      } else {
        prev[prev.length - 1] = prev[prev.length - 1] + Number(curr);
      }
      return prev;
    },
    [0]
  );
  calCounts.sort((a, b) => a - b);
  return calCounts;
}

async function part1() {
  const calCounts = await getData();
  return calCounts[calCounts.length - 1];
}

async function part2() {
  const calCounts = await getData();
  return calCounts
    .slice(calCounts.length - 3)
    .reduce((prev, curr) => prev + curr, 0);
}

console.log(await part1());
console.log(await part2());
