import * as fs from "fs/promises";
import path from "path";

export async function getData(__dirname: string) {
  const file = await fs.readFile(path.join(__dirname, "input.txt"));

  const data = file.toString().split("\n");

  return data;
}

export async function profile(label: string, func: () => any) {
  performance.mark("start");

  const result = await func();

  performance.mark("end");

  const measure = performance.measure("start to end", "start", "end");
  console.log(`${label} Time: ${measure.duration}ms`);

  return result;
}
