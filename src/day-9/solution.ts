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
    .map(line => line.split(" "))
    .map(item => [item[0], Number(item[1])]);

  return data;
}

function simulateRope(moves: (string | number)[][], knots = 2) {
  let [pos, visited] = [new Array(knots--).fill(0).map(e => [0, 0]), []];
  for (const [dir, num] of moves) {
    for (let i = 0; i < num; i++) {
      pos[0][dir == "R" || dir == "L" ? 0 : 1] +=
        dir == "R" || dir == "U" ? 1 : -1;

      for (let j = 0; j < knots; j++) {
        let dx = pos[j][0] - pos[j + 1][0];
        let dy = pos[j][1] - pos[j + 1][1];

        if (Math.abs(dx) > 1) {
          pos[j + 1][0] += dx > 0 ? 1 : -1;
          if (Math.abs(dy) != 0) pos[j + 1][1] += dy > 0 ? 1 : -1;
        } else if (Math.abs(dy) > 1) {
          pos[j + 1][1] += dy > 0 ? 1 : -1;
          if (Math.abs(dx) != 0) pos[j + 1][0] += dx > 0 ? 1 : -1;
        }
      }

      if (!visited.includes(`${pos[knots][0]}:${pos[knots][1]}`))
        visited.push(`${pos[knots][0]}:${pos[knots][1]}`);
    }
  }
  return visited.length;
}

function part1(moves: (string | number)[][]) {
  return simulateRope(moves);
}

function part2(moves: (string | number)[][]) {
  return simulateRope(moves, 10);
}

const data = await getData();
console.log(part1(data));
console.log(part2(data));
