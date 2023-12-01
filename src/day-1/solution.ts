import * as fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "node:url";
import { sum } from "lodash";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getData() {
  const file = await fs.readFile(path.join(__dirname, "input.txt"));

  const data = file.toString().split("\n");

  return data;
}

async function part1() {
  const data = await getData();

  let sum = 0;
  for (const line of data) {
    let first = null;
    let last = null;
    for (const char of line) {
      if (char.match(/\d/)) {
        if (first === null) {
          first = char;
        } else {
          last = char;
        }
      }
    }
    if (last === null) {
      last = first;
    }
    sum += parseInt(first + last);
  }

  return sum;
}

async function part2() {
  const data = await getData();

  let newData = data.map(convertStringNumeralsToNumbers);

  let sum = 0;
  for (const line of newData) {
    let first = null;
    let last = null;
    for (const char of line) {
      if (char.match(/\d/)) {
        if (first === null) {
          first = char;
        } else {
          last = char;
        }
      }
    }
    if (last === null) {
      last = first;
    }
    sum += parseInt(first + last);
  }

  return sum;
}

function convertStringNumeralsToNumbers(line: string) {
  let newLine = line;

  newLine = newLine.replaceAll("one", "one1one");
  newLine = newLine.replaceAll("two", "two2two");
  newLine = newLine.replaceAll("three", "three3three");
  newLine = newLine.replaceAll("four", "four4four");
  newLine = newLine.replaceAll("five", "five5five");
  newLine = newLine.replaceAll("six", "six6six");
  newLine = newLine.replaceAll("seven", "seven7seven");
  newLine = newLine.replaceAll("eight", "eight8eight");
  newLine = newLine.replaceAll("nine", "nine9nine");

  return newLine;
}

console.log(await part1());
console.log(await part2());
