import * as fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getData() {
  const file = await fs.readFile(path.join(__dirname, "input.txt"));
  const data = file.toString().split("");

  console.log(data);
  return data;
}

function hasDuplicates(stack) {
  const seen = {};
  for (const char of stack) {
    if (seen[char]) return true;
    seen[char] = true;
  }
  return false;
}

function part1(stream: string[]) {
  let count = 0;
  const stack = [];

  for (const char of stream) {
    count++;
    stack.push(char);
    if (stack.length >= 4 && !hasDuplicates(stack)) {
      break;
    } else if (stack.length >= 4) {
      stack.shift();
    }
  }
  return count;
}

function part2(stream: string[]) {
  let count = 0;
  const stack = [];

  for (const char of stream) {
    count++;
    stack.push(char);
    if (stack.length >= 14 && !hasDuplicates(stack)) {
      break;
    } else if (stack.length >= 14) {
      stack.shift();
    }
  }
  return count;
}

const data = await getData();
console.log(part1(data));
console.log(part2(data));
