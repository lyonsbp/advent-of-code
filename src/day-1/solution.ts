import path from "path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { getData, profile } from "../util/file.js";

async function part1() {
  const result = profile("Day 1 Part 1", async () => {
    const data = await getData(__dirname);

    let sum = 0;
    for (const line of data) {
      const { first, last } = getFirstAndLastNumbers(line);
      sum += parseInt(first + last);
    }

    return sum;
  });

  return result;
}

async function part2() {
  const result = profile("Day 1 Part 2", async () => {
    const data = await getData(__dirname);

    let newData = data.map(convertStringNumeralsToNumbers);

    let sum = 0;
    for (const line of newData) {
      const { first, last } = getFirstAndLastNumbers(line);
      sum += parseInt(first + last);
    }

    return sum;
  });

  return result;
}

function getFirstAndLastNumbers(line: string) {
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

  return { first, last };
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

await part1();
await part2();
