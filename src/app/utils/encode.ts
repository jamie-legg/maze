import { Move } from "../types";

const directionMap: { [key: string]: number } = {
  right: 0,
  down: 1,
  left: 2,
  up: 3,
};
const reverseDirectionMap: { [key: number]: "right" | "down" | "left" | "up" } = {
  0: "right",
  1: "down",
  2: "left",
  3: "up",
};
const distanceMap: { [key: number]: number } = {
  10: 0,
  20: 1,
  30: 2,
  40: 3,
  50: 4,
  60: 5,
  70: 6,
  80: 7,
  90: 8,
  100: 9,
};
const reverseDistanceMap: { [key: number]: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100 } = {
  0: 10,
  1: 20,
  2: 30,
  3: 40,
  4: 50,
  5: 60,
  6: 70,
  7: 80,
  8: 90,
  9: 100,
};

function encodeMaze(arr: Move[]): string {
  if (arr.length === 0) return "";

  let compact: number[] = [];
  let current = {
    direction: directionMap[arr[0].direction],
    distance: distanceMap[arr[0].distance],
  };
  let count = 1;

  for (let i = 1; i < arr.length; i++) {
    const code = {
      direction: directionMap[arr[i].direction],
      distance: distanceMap[arr[i].distance],
    };
    if (
      code.direction === current.direction &&
      code.distance === current.distance
    ) {
      count++;
      if (count > 3) {
        compact.push(
          (current.direction << 4) | (current.distance << 2) | (count - 2)
        );
        count = 1;
      }
    } else {
      compact.push(
        (current.direction << 4) | (current.distance << 2) | (count - 1)
      );
      current = code;
      count = 1;
    }
  }
  compact.push(
    (current.direction << 4) | (current.distance << 2) | (count - 1)
  );

  const buffer = Buffer.from(new Uint8Array(compact));
  return buffer.toString("base64");
}

function decodeMaze(encoded: string): Move[] {
  const buffer = Buffer.from(encoded, "base64");
  const compact = new Uint8Array(buffer);

  let arr: Move[] = [];
  let i = 0;
  while (i < compact.length) {
    const code = compact[i];
    const direction = reverseDirectionMap[code >> 4];
    const distance = reverseDistanceMap[(code >> 2) & 0b11];
    const count = (code & 0b11) + 1;
    for (let j = 0; j < count; j++) {
      arr.push({ direction, distance });
    }
    i++;
  }
  return arr;
}

export { encodeMaze, decodeMaze };
