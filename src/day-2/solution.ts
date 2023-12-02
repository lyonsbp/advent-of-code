import path from "path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { getData, profile } from "../util/file.js";

const limit = {
  red: 12,
  green: 13,
  blue: 14
} as const;

async function part1() {
  const result = profile("Day 2 Part 1", async () => {
    const data = await getData(__dirname);
    const mappedGameData = getMappedGameData(data);
    const possibleGames = getPossibleGames(mappedGameData);

    return possibleGames.reduce((prev, curr) => prev + curr, 0);
  });

  return result;
}

async function part2() {
  const result = profile("Day 2 Part 2", async () => {
    const data = await getData(__dirname);
    const mappedGameData = getMappedGameData(data);

    return mappedGameData.reduce(
      (prev, curr) => prev + curr.red * curr.blue * curr.green,
      0
    );
  });

  return result;
}

function getPossibleGames(gameData): number[] {
  return gameData
    .map(
      (round: { red: number; green: number; blue: number; index: number }) => {
        if (
          round.red <= limit.red &&
          round.green <= limit.green &&
          round.blue <= limit.blue
        )
          return round.index;
      }
    )
    .filter((item: number | undefined) => item);
}

function getMappedGameData(data: string[]): any[] {
  return data.map(game => {
    let s = game.split(":");
    let gameNum = +s[0].split(" ")[1];

    let gameData = s[1].trim().split(";");

    const colorMap = {
      red: 0,
      blue: 0,
      green: 0
    };
    for (let round of gameData) {
      let colorData = round.split(",");
      for (let colorInfo of colorData) {
        let colorInfoData = colorInfo.trim().split(" ");
        colorMap[colorInfoData[1]] = Math.max(
          colorMap[colorInfoData[1]],
          +colorInfoData[0]
        );
      }
      colorMap["index"] = gameNum;
    }
    return colorMap;
  });
}

console.log(await part1());
console.log(await part2());

// await part1();
// await part2();
