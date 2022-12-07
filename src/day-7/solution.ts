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
    .map(command => command.split(" "));

  return data;
}

function getSubDir(filesystem, path) {
  return path.reduce((prev, curr) => {
    return prev[curr];
  }, filesystem);
}

function buildFilesystem(commands: string[][]) {
  const root = {};
  let path: string[] = [];
  for (const command of commands) {
    if (command[0] === "$") {
      if (command[1] === "cd") {
        if (command[2] === "..") {
          path.pop();
        } else {
          let dir = getSubDir(root, path);
          dir[command[2]] = {};
          path.push(command[2]);
        }
      }
      if (command[1] === "ls") {
        // no-op?
      }
    } else if (command[0] === "dir") {
      let dir = getSubDir(root, path);
      dir[command[1]] = {};
    } else {
      let dir = getSubDir(root, path);
      dir[command[1]] = Number(command[0]);
    }
  }
  return root;
}

function getSize(dir: Record<string, any>) {
  const stack = [dir];
  let size = 0;
  for (const subDir of stack) {
    for (const value of Object.values(subDir)) {
      if (typeof value === "object") stack.push(value);
      else size += value;
    }
  }
  return size;
}

function part1(stream: string[][]) {
  const fileSystem = buildFilesystem(stream);
  let sum = 0;
  const stack = [fileSystem];
  for (const subDir of stack) {
    for (const value of Object.values(subDir)) {
      if (typeof value === "object") {
        const size = getSize(value);
        stack.push(value);
        if (size <= 100000) sum += size;
      }
    }
  }
  return sum;
}

function part2(stream: string[][]) {
  const TOTAL_SIZE = 70000000;
  const SPACE_REQUIRED = 30000000;
  const fileSystem = buildFilesystem(stream);
  const USED_SIZE = getSize(fileSystem["/"]);
  const FREE_SPACE = TOTAL_SIZE - USED_SIZE;
  const SIZE_TO_DELETE = SPACE_REQUIRED - FREE_SPACE;

  let smallest = Infinity;
  const stack = [fileSystem];
  for (const subDir of stack) {
    for (const value of Object.values(subDir)) {
      if (typeof value === "object") {
        const size = getSize(value);
        stack.push(value);
        if (size >= SIZE_TO_DELETE && size < smallest) {
          smallest = size;
        }
      }
    }
  }
  return smallest;
}

const data = await getData();
console.log(part1(data));
console.log(part2(data));
