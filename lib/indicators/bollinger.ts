// lib/indicators/bollinger.ts
import { OHLCV } from "../types";

export type BollingerOptions = {
  length: number; // e.g., 20
  maType: "SMA"; // expose field, SMA only implemented
  source: "close"; // close only for this assignment
  stdDevMultiplier: number; // e.g., 2
  offset: number; // integer, can be negative
};

/**
 * Returns an array aligned to input data length.
 * Each index contains either null or { time, basis, upper, lower }.
 *
 * We use POPULATION standard deviation: variance = sum((x-mean)^2)/N
 */
export function computeBollingerBands(
  data: OHLCV[],
  options: BollingerOptions
): Array<null | { time: number; basis: number; upper: number; lower: number }> {
  const { length, stdDevMultiplier, offset } = options;
  const result: Array<null | { time: number; basis: number; upper: number; lower: number }> =
    new Array(data.length).fill(null);

  if (length <= 0 || data.length === 0) return result;

  const closes = data.map(d => d.close);

  for (let i = 0; i < data.length; i++) {
    if (i < length - 1) continue; // not enough data

    // window of last `length` closes ending at i
    const windowStart = i - length + 1;
    const window = closes.slice(windowStart, i + 1);

    const sum = window.reduce((s, v) => s + v, 0);
    const mean = sum / length;

    // population variance (divide by N)
    const variance = window.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / length;
    const sd = Math.sqrt(variance);

    const basis = mean;
    const upper = basis + stdDevMultiplier * sd;
    const lower = basis - stdDevMultiplier * sd;

    const targetIndex = i + offset;
    if (targetIndex >= 0 && targetIndex < data.length) {
      result[targetIndex] = {
        time: data[i].time,
        basis,
        upper,
        lower
      };
    }
  }

  return result;
}
