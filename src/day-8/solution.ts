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
    .map(item => item.split("").map(item => Number(item)));

  return data;
}

function checkVisible(i, j, currI, currJ, treeGrid) {
  if (
    j === 0 ||
    i === 0 ||
    j === treeGrid[i].length - 1 ||
    i === treeGrid.length - 1
  ) {
    return true;
  }

  return (
    checkRight(i, j, currI, currJ, treeGrid) ||
    checkLeft(i, j, currI, currJ, treeGrid) ||
    checkBottom(i, j, currI, currJ, treeGrid) ||
    checkTop(i, j, currI, currJ, treeGrid)
  );
}

function checkRight(i, j, currI, currJ, treeGrid) {
  if (
    (j === 0 ||
      i === 0 ||
      j === treeGrid[i].length - 1 ||
      i === treeGrid.length - 1) &&
    treeGrid[currI][currJ] > treeGrid[i][j]
  ) {
    return true;
  }

  if (treeGrid[currI][currJ] > treeGrid[i][j - 1]) {
    return checkRight(i, j - 1, currI, currJ, treeGrid);
  }
  return false;
}

function checkLeft(i, j, currI, currJ, treeGrid) {
  if (
    (j === 0 ||
      i === 0 ||
      j === treeGrid[i].length - 1 ||
      i === treeGrid.length - 1) &&
    treeGrid[currI][currJ] > treeGrid[i][j]
  ) {
    return true;
  }

  if (treeGrid[currI][currJ] > treeGrid[i][j + 1]) {
    return checkLeft(i, j + 1, currI, currJ, treeGrid);
  }

  return false;
}

function checkTop(i, j, currI, currJ, treeGrid) {
  if (
    (j === 0 ||
      i === 0 ||
      j === treeGrid[i].length - 1 ||
      i === treeGrid.length - 1) &&
    treeGrid[currI][currJ] > treeGrid[i][j]
  ) {
    return true;
  }

  if (treeGrid[currI][currJ] > treeGrid[i - 1][j]) {
    return checkTop(i - 1, j, currI, currJ, treeGrid);
  }
  return false;
}

function checkBottom(i, j, currI, currJ, treeGrid) {
  if (
    (j === 0 ||
      i === 0 ||
      j === treeGrid[i].length - 1 ||
      i === treeGrid.length - 1) &&
    treeGrid[currI][currJ] > treeGrid[i][j]
  ) {
    return true;
  }

  if (treeGrid[currI][currJ] > treeGrid[i + 1][j]) {
    return checkBottom(i + 1, j, currI, currJ, treeGrid);
  }

  return false;
}

function part1(grid: number[][]) {
  console.log(grid);
  const length = grid.length;
  const seen = [];
  for (let i = 0; i < length; i++) {
    seen.push(new Array(length).fill(0));
  }

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (checkVisible(i, j, i, j, grid)) seen[i][j] = 1;
    }
  }
  console.log(seen);
  // console.log(grid);
  // console.log(seen);

  return seen.flat().reduce((prev, curr) => prev + curr, 0);
}

function findLength(i, j, treeGrid) {
  if (
    j === 0 ||
    i === 0 ||
    j === treeGrid[i].length - 1 ||
    i === treeGrid.length - 1
  ) {
    return 0;
  }

  return (
    findLengthRight(i, j, i, j, treeGrid, 0) *
    findLengthLeft(i, j, i, j, treeGrid, 0) *
    findLengthTop(i, j, i, j, treeGrid, 0) *
    findLengthBottom(i, j, i, j, treeGrid, 0)
  );
}
function findLengthRight(i, j, currI, currJ, treeGrid, currLen) {
  if (
    j === 0 ||
    i === 0 ||
    j === treeGrid[i].length - 1 ||
    i === treeGrid.length - 1
  ) {
    return currLen;
  }
  if (treeGrid[currI][currJ] > treeGrid[i][j - 1]) {
    return findLengthRight(i, j - 1, currI, currJ, treeGrid, currLen + 1);
  }
  return currLen + 1;
}

function findLengthLeft(i, j, currI, currJ, treeGrid, currLen) {
  if (
    j === 0 ||
    i === 0 ||
    j === treeGrid[i].length - 1 ||
    i === treeGrid.length - 1
  ) {
    return currLen;
  }
  if (treeGrid[currI][currJ] > treeGrid[i][j + 1]) {
    return findLengthLeft(i, j + 1, currI, currJ, treeGrid, currLen + 1);
  }
  return currLen + 1;
}

function findLengthTop(i, j, currI, currJ, treeGrid, currLen) {
  if (
    j === 0 ||
    i === 0 ||
    j === treeGrid[i].length - 1 ||
    i === treeGrid.length - 1
  ) {
    return currLen;
  }
  if (treeGrid[currI][currJ] > treeGrid[i - 1][j]) {
    return findLengthTop(i - 1, j, currI, currJ, treeGrid, currLen + 1);
  }
  return currLen + 1;
}

function findLengthBottom(i, j, currI, currJ, treeGrid, currLen) {
  if (
    j === 0 ||
    i === 0 ||
    j === treeGrid[i].length - 1 ||
    i === treeGrid.length - 1
  ) {
    return currLen;
  }
  if (treeGrid[currI][currJ] > treeGrid[i + 1][j]) {
    return findLengthBottom(i + 1, j, currI, currJ, treeGrid, currLen + 1);
  }
  return currLen + 1;
}

function part2(stream: number[][]) {
  const scores: number[] = [];

  for (var i = 0; i < stream.length; i++) {
    for (var j = 0; j < stream[i].length; j++) {
      scores.push(findLength(i, j, stream));
    }
  }

  return Math.max(...scores);
}

const test = [
  [3, 0, 3, 7, 3],
  [2, 5, 5, 1, 2],
  [6, 5, 3, 3, 2],
  [3, 3, 5, 4, 9],
  [3, 5, 3, 9, 0]
];
const data = await getData();
console.log(part1(data));
console.log(part2(data));
