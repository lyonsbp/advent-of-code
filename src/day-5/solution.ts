import * as fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getData() {
  const file = await fs.readFile(path.join(__dirname, "input.txt"));
  const data = file.toString().split("\n");

  const commands = data.map(line => line.split(" "));
  return commands.map(command => {
    return [Number(command[1]), Number(command[3]), Number(command[5])];
  });
}

function getAllTops(stacks) {
  const ret = [];
  for (const stack of stacks) {
    ret.push(stack.pop());
  }
  return ret;
}

const stacks = [
  ["W", "T", "H", "P", "J", "C", "F"].reverse(),
  ["H", "B", "J", "Z", "F", "V", "R", "G"].reverse(),
  ["R", "T", "P", "H"].reverse(),
  ["T", "H", "P", "N", "S", "Z"].reverse(),
  ["D", "C", "J", "H", "Z", "F", "V", "N"].reverse(),
  ["Z", "D", "W", "F", "G", "M", "P"].reverse(),
  ["P", "D", "J", "S", "W", "Z", "V", "M"].reverse(),
  ["S", "D", "N"].reverse(),
  ["M", "F", "S", "Z", "D"].reverse()
];

function part1(commands: number[][]) {
  const localStacks = JSON.parse(JSON.stringify(stacks));

  for (const command of commands) {
    const [quantity, from, to] = command;

    for (let i = 0; i < quantity; i++) {
      const el = localStacks[from - 1].pop();
      localStacks[to - 1].push(el);
    }
  }
  return getAllTops(localStacks);
}

function part2(commands: number[][]) {
  const localStacks: number[][] = JSON.parse(JSON.stringify(stacks));

  for (const command of commands) {
    const [quantity, from, to] = command;
    const crates = localStacks[from - 1].slice(
      localStacks[from - 1].length - quantity
    );
    // Delete the slice we copied
    for (let i = 0; i < quantity; i++) {
      localStacks[from - 1].pop();
    }
    // Concat the stack with our slice
    localStacks[to - 1] = localStacks[to - 1].concat(crates);
  }
  return getAllTops(localStacks);
}

const data = await getData();
console.log(part1(data));
console.log(part2(data));

console.log([1, 2, 3].slice(1));
