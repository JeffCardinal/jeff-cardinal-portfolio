import { sha256 } from "@noble/hashes/sha2.js";

export const KEY_BITE_SEGMENTS = 12;

export function generateKeyBittingPattern(password: string, segments = KEY_BITE_SEGMENTS): number[] {
  const digest = sha256(new TextEncoder().encode(password));
  const choices = new Uint8Array(segments);
  // Fold all 32 hash bytes into the segment choices.
  digest.forEach((byte, index) => { choices[index % segments] ^= byte; });

  let level = 2;
  const levels = [level];
  choices.forEach((choice, index) => {
    const remaining = segments - index - 1;
    const moves = [
      { change: 0, weight: 0.67 }, // Flat
      { change: 1, weight: 1.2 },  // Angle up
      { change: -1, weight: 1.2 }, // Angle down
    ].filter(({ change }) => {
      const next = level + change;
      // Both ends join the fixed blade at full height. Reserve enough steps
      // to return to the top without introducing a two-level jump at the tip.
      return next >= 0 && next <= 2 && next + remaining >= 2;
    });
    const totalWeight = moves.reduce((total, move) => total + move.weight, 0);
    let selection = (choice / 256) * totalWeight;
    for (const move of moves) {
      selection -= move.weight;
      if (selection < 0) {
        level += move.change;
        break;
      }
    }
    levels.push(level);
  });
  return levels;
}
