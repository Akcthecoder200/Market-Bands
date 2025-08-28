export interface OHLCV {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface BollingerOptions {
  length: number; // e.g., 20
  maType: "SMA"; // expose field, SMA only implemented
  source: "close"; // close only for this assignment
  stdDevMultiplier: number; // e.g., 2
  offset: number; // integer, can be negative
}

export interface BollingerStyle {
  basis: {
    visible: boolean;
    color: string;
    lineWidth: number;
    lineStyle: "solid" | "dashed";
  };
  upper: {
    visible: boolean;
    color: string;
    lineWidth: number;
    lineStyle: "solid" | "dashed";
  };
  lower: {
    visible: boolean;
    color: string;
    lineWidth: number;
    lineStyle: "solid" | "dashed";
  };
  background: {
    visible: boolean;
    opacity: number; // 0-100
  };
}

export interface BollingerData {
  time: number;
  basis: number;
  upper: number;
  lower: number;
}
