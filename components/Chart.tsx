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

  // Update Bollinger Bands when options or data change
  useEffect(() => {
    if (!chartInstanceRef.current || data.length === 0) return;

    const chart = chartInstanceRef.current;

    // Apply new candlestick data
    const klineData = data.map((d) => ({
      timestamp: d.time,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
      volume: d.volume || 0,
    }));

    chart.applyNewData(klineData);

    // Calculate and apply Bollinger Bands if options are provided
    if (bollingerOptions) {
      const bollingerBands = computeBollingerBands(data, bollingerOptions);
      setBollingerData(bollingerBands);

      // Remove existing Bollinger Bands indicator if it exists
      chart.removeIndicator({ name: "BOLL" });

      // Create Bollinger Bands indicator
      chart.createIndicator(
        {
          name: "BOLL",
          calcParams: [
            bollingerOptions.length,
            bollingerOptions.stdDevMultiplier,
          ],
          styles: {
            lines: [
              {
                color: bollingerStyle?.upper.color || "#3b82f6",
                size: bollingerStyle?.upper.lineWidth || 1,
                // style: "solid",
                smooth: false,
                dashedValue: [],
              },
              {
                color: bollingerStyle?.basis.color || "#fbbf24",
                size: bollingerStyle?.basis.lineWidth || 1,

                smooth: false,
                dashedValue: [],
              },
              {
                color: bollingerStyle?.lower.color || "#3b82f6",
                size: bollingerStyle?.lower.lineWidth || 1,

                smooth: false,
                dashedValue: [],
              },
            ],
          },
        },
        false
      ); // false = don't stack, overlay on main pane
    } else {
      // Remove Bollinger Bands if no options provided
      chart.removeIndicator({ name: "BOLL" });
      setBollingerData([]);
    }
  }, [data, bollingerOptions, bollingerStyle]);

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
            {bollingerStyle?.upper.visible !== false && (
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-0.5"
                  style={{
                    backgroundColor: bollingerStyle?.upper.color || "#3b82f6",
                  }}
                />
                <span>
                  Upper:{" "}
                  {bollingerData[bollingerData.length - 1]?.upper?.toFixed(2) ||
                    "N/A"}
                </span>
              </div>
            )}
            {bollingerStyle?.basis.visible !== false && (
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-0.5"
                  style={{
                    backgroundColor: bollingerStyle?.basis.color || "#fbbf24",
                  }}
                />
                <span>
                  Basis:{" "}
                  {bollingerData[bollingerData.length - 1]?.basis?.toFixed(2) ||
                    "N/A"}
                </span>
              </div>
            )}
            {bollingerStyle?.lower.visible !== false && (
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-0.5"
                  style={{
                    backgroundColor: bollingerStyle?.lower.color || "#3b82f6",
                  }}
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
