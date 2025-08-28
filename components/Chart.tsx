"use client";

import { useEffect, useRef, useState } from "react";
import { init, dispose, Chart as KChart } from "klinecharts";
import { OHLCV, BollingerOptions, BollingerStyle } from "../lib/types";
import { computeBollingerBands } from "../lib/indicators/bollinger";

interface ChartProps {
  data: OHLCV[];
  bollingerOptions?: BollingerOptions;
  bollingerStyle?: BollingerStyle;
}

export default function Chart({
  data,
  bollingerOptions,
  bollingerStyle,
}: ChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<KChart | null>(null);
  const [bollingerData, setBollingerData] = useState<
    Array<{ upper: number; lower: number; basis: number } | null>
  >([]);

  // Initialize chart
  useEffect(() => {
    if (!chartRef.current) return;

    const chartElement = chartRef.current;
    const chart = init(chartElement);

    if (!chart) return;

    chartInstanceRef.current = chart;

    // Configure chart appearance
    chart.setStyles({
      grid: {
        show: true,
        horizontal: {
          show: true,
          size: 1,
          color: "#1f2937",
        },
        vertical: {
          show: true,
          size: 1,
          color: "#1f2937",
        },
      },
      candle: {
        bar: {
          upColor: "#22c55e",
          downColor: "#ef4444",
          noChangeColor: "#6b7280",
        },
      },
      crosshair: {
        show: true,
        horizontal: {
          show: true,
          line: {
            show: true,
            size: 1,
            color: "#6b7280",
          },
        },
        vertical: {
          show: true,
          line: {
            show: true,
            size: 1,
            color: "#6b7280",
          },
        },
      },
    });

    // Apply data if available
    if (data.length > 0) {
      const klineData = data.map((d) => ({
        timestamp: d.time,
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
        volume: d.volume || 0,
      }));
      chart.applyNewData(klineData);
    }

    return () => {
      if (chartInstanceRef.current) {
        dispose(chartElement);
        chartInstanceRef.current = null;
      }
    };
  }, [data]);

  // Update data when it changes
  useEffect(() => {
    if (chartInstanceRef.current && data.length > 0) {
      const klineData = data.map((d) => ({
        timestamp: d.time,
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
        volume: d.volume || 0,
      }));
      chartInstanceRef.current.applyNewData(klineData);
    }
  }, [data]);

  // Compute Bollinger Bands when options change
  useEffect(() => {
    if (bollingerOptions && data.length > 0) {
      const bands = computeBollingerBands(data, bollingerOptions);
      setBollingerData(bands);
    } else {
      setBollingerData([]);
    }
  }, [data, bollingerOptions]);

  return (
    <div className="relative">
      <div
        ref={chartRef}
        className="w-full h-[600px] bg-gray-900 rounded-lg border border-gray-700"
        style={{ width: "100%", height: "600px" }}
      />

      {/* Bollinger Bands Info Display */}
      {bollingerOptions && bollingerData.length > 0 && (
        <div className="absolute top-4 left-4 bg-gray-800 bg-opacity-90 p-3 rounded text-white text-sm">
          <div className="font-semibold mb-2">
            Bollinger Bands ({bollingerOptions.length})
          </div>
          <div className="space-y-1">
            {bollingerStyle?.upper.visible && (
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-0.5"
                  style={{ backgroundColor: bollingerStyle.upper.color }}
                />
                <span>
                  Upper:{" "}
                  {bollingerData[bollingerData.length - 1]?.upper?.toFixed(2) ||
                    "N/A"}
                </span>
              </div>
            )}
            {bollingerStyle?.basis.visible && (
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-0.5"
                  style={{ backgroundColor: bollingerStyle.basis.color }}
                />
                <span>
                  Basis:{" "}
                  {bollingerData[bollingerData.length - 1]?.basis?.toFixed(2) ||
                    "N/A"}
                </span>
              </div>
            )}
            {bollingerStyle?.lower.visible && (
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-0.5"
                  style={{ backgroundColor: bollingerStyle.lower.color }}
                />
                <span>
                  Lower:{" "}
                  {bollingerData[bollingerData.length - 1]?.lower?.toFixed(2) ||
                    "N/A"}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
