import path from "path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { getData, profile } from "../util/file.js";

const isSymbol = (char: string) => char.match(/[^0-9.a-zA-z]/);
const isGear = (char: string) => char.match(/[*]/);
const numLines = 140;

interface NumType {
  num: number;
  startInd: number;
  endInd: number;
  lineIdx: number;
}

async function part1() {
  const result = profile("Day 3 Part 1", async () => {
    const data = await getData(__dirname);

    const partNumbers = getPartNumbers(data);
    return partNumbers.reduce((prev, curr) => prev + curr, 0);
  });

  return result;
}

async function part2() {
  const result = profile("Day 3 Part 2", async () => {
    const data = await getData(__dirname);

    let gearRatios = 0;
    const gearMap = getGearMap(data);
    for (const key in gearMap) {
      if (gearMap[key].length === 2) {
        gearRatios += gearMap[key][0] * gearMap[key][1];
      }
    }

    return gearRatios;
  });

  return result;
}

function getGearMap(data: string[]): {} {
  let lineIdx = 0;
  let gearMap = {};
  for (const line of data) {
    const numbers = getNumbersInLine(line, lineIdx);

    for (const number of numbers) {
      const { num, startInd, endInd, lineIdx } = number;

      // Check left bound
      if (startInd > 0) {
        const leftChar = line[startInd - 1];
        if (isGear(leftChar)) {
          if (gearMap[`${lineIdx}-${startInd - 1}`]) {
            gearMap[`${lineIdx}-${startInd - 1}`].push(num);
          } else {
            gearMap[`${lineIdx}-${startInd - 1}`] = [num];
          }
        }
      }

      // Check right bound
      if (endInd < line.length - 1) {
        const rightChar = line[endInd];
        if (isGear(rightChar)) {
          if (gearMap[`${lineIdx}-${endInd}`]) {
            gearMap[`${lineIdx}-${endInd}`].push(num);
          } else {
            gearMap[`${lineIdx}-${endInd}`] = [num];
          }
        }
      }

      // Check line above
      if (lineIdx > 0) {
        const leftBound = Math.max(startInd - 1, 0);
        const rightBound = Math.min(endInd, line.length - 1);

        const prevLine = data[lineIdx - 1];
        for (let i = leftBound; i <= rightBound; i++) {
          const char = prevLine[i];
          if (isGear(char)) {
            if (gearMap[`${lineIdx - 1}-${i}`]) {
              gearMap[`${lineIdx - 1}-${i}`].push(num);
            } else {
              gearMap[`${lineIdx - 1}-${i}`] = [num];
            }
          }
        }
      }

      // Check line below
      if (lineIdx < numLines - 1) {
        const leftBound = Math.max(startInd - 1, 0);
        const rightBound = Math.min(endInd, line.length - 1);

        const nextLine = data[lineIdx + 1];
        for (let i = leftBound; i <= rightBound; i++) {
          const char = nextLine[i];
          if (isGear(char)) {
            if (gearMap[`${lineIdx + 1}-${i}`]) {
              gearMap[`${lineIdx + 1}-${i}`].push(num);
            } else {
              gearMap[`${lineIdx + 1}-${i}`] = [num];
            }
          }
        }
      }
    }

    lineIdx++;
  }

  return gearMap;
}

function getPartNumbers(data: string[]): number[] {
  let lineIdx = 0;
  let result = [];
  for (const line of data) {
    const numbers = getNumbersInLine(line, lineIdx);

    for (const number of numbers) {
      const { num, startInd, endInd, lineIdx } = number;

      // Check left bound
      if (startInd > 0) {
        const leftChar = line[startInd - 1];
        if (isSymbol(leftChar)) {
          result.push(num);
          continue;
        }
      }

      // Check right bound
      if (endInd < line.length - 1) {
        const rightChar = line[endInd];
        if (isSymbol(rightChar)) {
          result.push(num);
          continue;
        }
      }

      // Check line above
      if (lineIdx > 0) {
        const leftBound = Math.max(startInd - 1, 0);
        const rightBound = Math.min(endInd, line.length - 1);

        const prevLine = data[lineIdx - 1];
        let shouldContinue = false;
        for (let i = leftBound; i <= rightBound; i++) {
          const char = prevLine[i];
          if (isSymbol(char)) {
            result.push(num);
            shouldContinue = true;
            break;
          }
        }
        if (shouldContinue) continue;
      }

      // Check line below
      if (lineIdx < numLines - 1) {
        const leftBound = Math.max(startInd - 1, 0);
        const rightBound = Math.min(endInd, line.length - 1);

        const nextLine = data[lineIdx + 1];
        let shouldContinue = false;
        for (let i = leftBound; i <= rightBound; i++) {
          const char = nextLine[i];
          if (isSymbol(char)) {
            result.push(num);
            shouldContinue = true;
            break;
          }
        }
        if (shouldContinue) continue;
      }
    }

    lineIdx++;
  }

  return result;
}

function getNumbersInLine(line: string, lineIdx: number): NumType[] {
  let num = "";
  let startInd = -1;
  const result = [];
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const isCharNum = char.match(/\d/);

    if (isCharNum) {
      if (num === "") startInd = i;
      num += char;
    }
    if ((!isCharNum && num !== "") || (num !== "" && i === line.length - 1)) {
      result.push({
        num: +num,
        startInd: startInd,
        endInd: i,
        lineIdx
      });
      num = "";
      startInd = -1;
    }
  }

  return result;
}

console.log(await part1());
console.log(await part2());

// await part1();
// await part2();
