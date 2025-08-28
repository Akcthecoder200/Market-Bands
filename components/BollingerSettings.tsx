"use client";

import { useState } from "react";
import { BollingerOptions, BollingerStyle } from "../lib/types";
import clsx from "clsx";

interface BollingerSettingsProps {
  options: BollingerOptions;
  style: BollingerStyle;
  onChange: (options: BollingerOptions, style: BollingerStyle) => void;
}

export default function BollingerSettings({ options, style, onChange }: BollingerSettingsProps) {
  const [activeTab, setActiveTab] = useState<"inputs" | "style">("inputs");

  const handleOptionsChange = (newOptions: Partial<BollingerOptions>) => {
    onChange({ ...options, ...newOptions }, style);
  };

  const handleStyleChange = (newStyle: Partial<BollingerStyle>) => {
    onChange(options, { ...style, ...newStyle });
  };

  const handleBandStyleChange = (band: "basis" | "upper" | "lower", changes: Partial<BollingerStyle[typeof band]>) => {
    handleStyleChange({
      [band]: { ...style[band], ...changes }
    });
  };

  const handleBackgroundChange = (changes: Partial<BollingerStyle["background"]>) => {
    handleStyleChange({
      background: { ...style.background, ...changes }
    });
  };

  return (
    <div className="text-white">
      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => setActiveTab("inputs")}
          className={clsx(
            "px-4 py-2 font-medium transition-colors",
            activeTab === "inputs"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400 hover:text-white"
          )}
        >
          Inputs
        </button>
        <button
          onClick={() => setActiveTab("style")}
          className={clsx(
            "px-4 py-2 font-medium transition-colors",
            activeTab === "style"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400 hover:text-white"
          )}
        >
          Style
        </button>
      </div>

      <div className="p-4">
        {activeTab === "inputs" && (
          <div className="space-y-4">
            {/* Length */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Length
              </label>
              <input
                type="number"
                min="1"
                value={options.length}
                onChange={(e) => handleOptionsChange({ length: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-400"
              />
            </div>

            {/* MA Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                MA Type
              </label>
              <select
                value={options.maType}
                onChange={(e) => handleOptionsChange({ maType: e.target.value as "SMA" })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-400"
              >
                <option value="SMA">SMA</option>
              </select>
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Source
              </label>
              <select
                value={options.source}
                onChange={(e) => handleOptionsChange({ source: e.target.value as "close" })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-400"
              >
                <option value="close">Close</option>
              </select>
            </div>

            {/* StdDev Multiplier */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                StdDev Multiplier
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={options.stdDevMultiplier}
                onChange={(e) => handleOptionsChange({ stdDevMultiplier: parseFloat(e.target.value) || 2 })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-400"
              />
            </div>

            {/* Offset */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Offset
              </label>
              <input
                type="number"
                value={options.offset}
                onChange={(e) => handleOptionsChange({ offset: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
        )}

        {activeTab === "style" && (
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-gray-800 p-3 rounded">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Preview</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-0.5" 
                    style={{ 
                      backgroundColor: style.upper.color,
                      borderStyle: style.upper.lineStyle,
                      borderTopWidth: style.upper.lineWidth,
                      borderTopColor: style.upper.color
                    }}
                  />
                  <span className="text-xs text-gray-400">Upper Band</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-0.5" 
                    style={{ 
                      backgroundColor: style.basis.color,
                      borderStyle: style.basis.lineStyle,
                      borderTopWidth: style.basis.lineWidth,
                      borderTopColor: style.basis.color
                    }}
                  />
                  <span className="text-xs text-gray-400">Basis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-0.5" 
                    style={{ 
                      backgroundColor: style.lower.color,
                      borderStyle: style.lower.lineStyle,
                      borderTopWidth: style.lower.lineWidth,
                      borderTopColor: style.lower.color
                    }}
                  />
                  <span className="text-xs text-gray-400">Lower Band</span>
                </div>
              </div>
            </div>

            {/* Upper Band */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-blue-400">Upper Band</h4>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={style.upper.visible}
                    onChange={(e) => handleBandStyleChange("upper", { visible: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-300">Visible</span>
                </label>
                <input
                  type="color"
                  value={style.upper.color}
                  onChange={(e) => handleBandStyleChange("upper", { color: e.target.value })}
                  className="w-full h-8 bg-gray-800 border border-gray-600 rounded"
                />
                <select
                  value={style.upper.lineWidth}
                  onChange={(e) => handleBandStyleChange("upper", { lineWidth: parseInt(e.target.value) })}
                  className="px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                >
                  <option value="1">1px</option>
                  <option value="2">2px</option>
                  <option value="3">3px</option>
                  <option value="4">4px</option>
                </select>
                <select
                  value={style.upper.lineStyle}
                  onChange={(e) => handleBandStyleChange("upper", { lineStyle: e.target.value as "solid" | "dashed" })}
                  className="px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                </select>
              </div>
            </div>

            {/* Basis */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-yellow-400">Basis (Middle)</h4>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={style.basis.visible}
                    onChange={(e) => handleBandStyleChange("basis", { visible: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-300">Visible</span>
                </label>
                <input
                  type="color"
                  value={style.basis.color}
                  onChange={(e) => handleBandStyleChange("basis", { color: e.target.value })}
                  className="w-full h-8 bg-gray-800 border border-gray-600 rounded"
                />
                <select
                  value={style.basis.lineWidth}
                  onChange={(e) => handleBandStyleChange("basis", { lineWidth: parseInt(e.target.value) })}
                  className="px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                >
                  <option value="1">1px</option>
                  <option value="2">2px</option>
                  <option value="3">3px</option>
                  <option value="4">4px</option>
                </select>
                <select
                  value={style.basis.lineStyle}
                  onChange={(e) => handleBandStyleChange("basis", { lineStyle: e.target.value as "solid" | "dashed" })}
                  className="px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                </select>
              </div>
            </div>

            {/* Lower Band */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-green-400">Lower Band</h4>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={style.lower.visible}
                    onChange={(e) => handleBandStyleChange("lower", { visible: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-300">Visible</span>
                </label>
                <input
                  type="color"
                  value={style.lower.color}
                  onChange={(e) => handleBandStyleChange("lower", { color: e.target.value })}
                  className="w-full h-8 bg-gray-800 border border-gray-600 rounded"
                />
                <select
                  value={style.lower.lineWidth}
                  onChange={(e) => handleBandStyleChange("lower", { lineWidth: parseInt(e.target.value) })}
                  className="px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                >
                  <option value="1">1px</option>
                  <option value="2">2px</option>
                  <option value="3">3px</option>
                  <option value="4">4px</option>
                </select>
                <select
                  value={style.lower.lineStyle}
                  onChange={(e) => handleBandStyleChange("lower", { lineStyle: e.target.value as "solid" | "dashed" })}
                  className="px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                </select>
              </div>
            </div>

            {/* Background Fill */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-purple-400">Background Fill</h4>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={style.background.visible}
                    onChange={(e) => handleBackgroundChange({ visible: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-300">Visible</span>
                </label>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Opacity: {style.background.opacity}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={style.background.opacity}
                    onChange={(e) => handleBackgroundChange({ opacity: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
