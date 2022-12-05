import * as fs from "fs/promises";
import path from "path";
import { intersection } from "lodash-es";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getData() {
  const file = await fs.readFile(path.join(__dirname, "input.txt"));
  const data = file.toString().split("\n");

  return data;
}

function getCharCode(char: string): number {
  const code = char.charCodeAt(0);
  if (code >= 65 && code <= 90) return code - 38;
  if (code >= 97 && code <= 122) return code - 96;
}

function getCommonItem(items: string) {
  const length = items.length;
  const firstHalf = items.slice(0, Math.floor(length / 2));
  const secondHalf = items.slice(Math.floor(length / 2));
  const firstMap = {};

  for (const char of firstHalf) {
    firstMap[char] = true;
  }

  for (const char of secondHalf) {
    if (firstMap[char]) return char;
  }
}

async function part1(data: string[]) {
  const commonItems = [];

  for (const items of data) {
    commonItems.push(getCommonItem(items));
  }
  return commonItems.reduce((prev, curr) => prev + getCharCode(curr), 0);
}

async function part2(data) {
  const badges = [];
  const groups = [];

  data.reverse();
  while (data.length) {
    groups.push([data.pop(), data.pop(), data.pop()]);
  }

  for (const group of groups) {
    const int = intersection(
      ...[group[0].split(""), group[1].split(""), group[2].split("")]
    );
    badges.push(int[0]);
  }
  return badges.reduce((prev, curr) => prev + getCharCode(curr), 0);
}

const data = await getData();
console.log(await part1(data));
console.log(await part2(data));
