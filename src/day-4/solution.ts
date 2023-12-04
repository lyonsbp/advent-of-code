import path from "path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { getData, profile } from "../util/file.js";

async function part1() {
  const result = profile("Day 4 Part 1", async () => {
    const data = await getData(__dirname);

    const parsedData = getParsedData(data);

    return parsedData.reduce((prev, curr) => {
      return (prev += getScore(curr));
    }, 0);
  });

  return result;
}

function getParsedData(data: string[]) {
  const ret = [];
  let cardIdx = 1;

  for (const card of data) {
    const [, cardData] = card.split(":");
    const [winningNums, ourNums] = cardData.split(" | ");

    const gameObj = {
      winningNums: winningNums
        .split(" ")
        .map(num => +num)
        .filter(num => num !== 0),
      ourNums: ourNums
        .split(" ")
        .map(num => +num)
        .filter(num => num !== 0),
      cardIdx
    };
    ret.push(gameObj);
    cardIdx++;
  }

  return ret;
}

function getScore(cardData: { winningNums: any; ourNums: any; cardNum: any }) {
  const { winningNums, ourNums, cardNum } = cardData;

  let score = 0;

  for (const num of ourNums) {
    if (winningNums.includes(num)) {
      score = Math.max(1, score * 2);
    }
  }

  return score;
}

async function part2() {
  const result = profile("Day 4 Part 2", async () => {
    const data = await getData(__dirname);

    const parsedData = getParsedData(data);

    let cardCopies = Array(parsedData.length).fill(1);
    for (const { winningNums, ourNums, cardIdx } of parsedData) {
      const matches = getNumMatches({ winningNums, ourNums });
      if (matches > 0) {
        for (let i = 1; i <= matches; i++) {
          if (cardIdx - 1 + i < parsedData.length) {
            cardCopies[cardIdx - 1 + i] += cardCopies[cardIdx - 1];
          }
        }
      }
    }
    return cardCopies.reduce((a, b) => a + b, 0);
  });

  return result;
}

function getNumMatches(cardData) {
  let matches = 0;

  for (const num of cardData.ourNums) {
    if (cardData.winningNums.includes(num)) {
      matches++;
    }
  }
  return matches;
}

console.log(await part1());
// 155302
// 24160
console.log(await part2());
// 5604889
// 5659035

// await part1();
// await part2();
