import * as fs from "fs/promises";
import path from "path";
import { first, intersection } from "lodash-es";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getData() {
  const file = await fs.readFile(path.join(__dirname, "input.txt"));
  const data = file.toString().split("\n");

  const pairs = data.map(line => line.split(","));
  return pairs.map(pair => {
    return [pair[0].split("-"), pair[1].split("-")];
  });
}

function isSubset(first) {}

async function part1(data: string[][][]) {
  let ret = 0;
  for (const pair of data) {
    pair.sort((a, b) => Number(a[0]) - Number(b[0]));
    const firstRange = pair[0].map(el => Number(el));
    const secondRange = pair[1].map(el => Number(el));

    if (secondRange[0] >= firstRange[0] && secondRange[1] <= firstRange[1])
      ret++;
    else if (firstRange[0] >= secondRange[0] && firstRange[1] <= secondRange[1])
      ret++;
  }

  return ret;
}

async function part2(data: string[][][]) {
  let ret = 0;
  for (const pair of data) {
    pair.sort((a, b) => Number(a[0]) - Number(b[0]));
    const firstRange = pair[0].map(el => Number(el));
    const secondRange = pair[1].map(el => Number(el));

    if (firstRange[1] >= secondRange[0]) ret++;
  }

  return ret;
}

const data = await getData();
console.log(await part1(data));
console.log(await part2(data));
