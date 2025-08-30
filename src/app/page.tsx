"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Chart from "../../components/Chart";
import BollingerSettings from "../../components/BollingerSettings";
import Modal from "../../components/Modal";
import { OHLCV, BollingerOptions, BollingerStyle } from "../../lib/types";

const defaultBollingerOptions: BollingerOptions = {
  length: 20,
  maType: "SMA",
  source: "close",
  stdDevMultiplier: 2,
  offset: 0,
};

const defaultBollingerStyle: BollingerStyle = {
  basis: {
    visible: true,
    color: "#f59e0b",
    lineWidth: 2,
    lineStyle: "solid",
  },
  upper: {
    visible: true,
    color: "#3b82f6",
    lineWidth: 2,
    lineStyle: "solid",
  },
  lower: {
    visible: true,
    color: "#10b981",
    lineWidth: 2,
    lineStyle: "solid",
  },
  background: {
    visible: true,
    opacity: 10,
  },
};

export default function Home() {
  const [data, setData] = useState<OHLCV[]>([]);
  const [showBollinger, setShowBollinger] = useState(false);
  const [bollingerOptions, setBollingerOptions] = useState<BollingerOptions>(
    defaultBollingerOptions
  );
  const [bollingerStyle, setBollingerStyle] = useState<BollingerStyle>(
    defaultBollingerStyle
  );
  const [showSettings, setShowSettings] = useState(false);

  // Load OHLCV data
  useEffect(() => {
    fetch("/data/ohlcv.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Failed to load OHLCV data:", err));
  }, []);

  const handleAddBollinger = () => {
    setShowBollinger(true);
    setShowSettings(true);
  };

  const handleSettingsChange = (
    options: BollingerOptions,
    style: BollingerStyle
  ) => {
    setBollingerOptions(options);
    setBollingerStyle(style);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src="/assets/logo_trade.svg"
              alt="LT Trade Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">LT Trade</h1>
              <p className="text-sm text-gray-400">Bollinger Bands Chart</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {!showBollinger && (
              <button
                onClick={handleAddBollinger}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
              >
                Add Bollinger Bands
              </button>
            )}
            {showBollinger && (
              <button
                onClick={() => setShowSettings(true)}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded transition-colors flex items-center space-x-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Settings</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        <div className="space-y-4">
          {/* Chart */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <Chart
              data={data}
              bollingerOptions={showBollinger ? bollingerOptions : undefined}
              bollingerStyle={showBollinger ? bollingerStyle : undefined}
            />
          </div>

          {/* Info Panel */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Market Data</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Total Candles:</span>
                <span className="ml-2 font-medium">{data.length}</span>
              </div>
              {data.length > 0 && (
                <>
                  <div>
                    <span className="text-gray-400">Latest Close:</span>
                    <span className="ml-2 font-medium">
                      {data[data.length - 1]?.close.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Latest Time:</span>
                    <span className="ml-2 font-medium">
                      {new Date(
                        data[data.length - 1]?.time
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </>
              )}
            </div>

            {showBollinger && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h3 className="font-medium mb-2">Bollinger Bands Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Length:</span>
                    <span className="ml-2 font-medium">
                      {bollingerOptions.length}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Multiplier:</span>
                    <span className="ml-2 font-medium">
                      {bollingerOptions.stdDevMultiplier}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Source:</span>
                    <span className="ml-2 font-medium">
                      {bollingerOptions.source}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Offset:</span>
                    <span className="ml-2 font-medium">
                      {bollingerOptions.offset}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Bollinger Bands Settings"
      >
        <BollingerSettings
          options={bollingerOptions}
          style={bollingerStyle}
          onChange={handleSettingsChange}
        />
      </Modal>
    </div>
  );
}
