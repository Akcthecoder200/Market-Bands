# Bollinger Bands Chart - Next.js + KLineCharts

A production-ready Next.js application implementing Bollinger Bands indicator overlay on candlestick charts using KLineCharts library.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Features

- **Interactive Candlestick Chart**: Real-time responsive charting with KLineCharts
- **Bollinger Bands Indicator**: Complete implementation with configurable parameters
- **TradingView-style Settings**: Inputs and Style configuration panels
- **Real-time Updates**: Instant chart updates when changing parameters
- **TypeScript**: Fully type-safe implementation
- **TailwindCSS**: Modern, responsive UI design
- **200+ Sample Candles**: Realistic OHLCV data for demonstration

## 📊 Bollinger Bands Implementation

### Mathematical Formula

The implementation uses the following formulas:

- **Basis (Middle Band)**: `SMA(close, length)`
- **Standard Deviation**: **Population standard deviation** `sqrt(sum((x-mean)²)/N)`
- **Upper Band**: `basis + (multiplier × stdDev)`
- **Lower Band**: `basis - (multiplier × stdDev)`
- **Offset**: Shifts all bands forward/backward by N periods

### 📐 Standard Deviation Variant Used

This implementation uses **Population Standard Deviation** (dividing by N) rather than sample standard deviation (dividing by N-1). 

**Why Population StdDev?**
- Consistent with most trading platforms (TradingView, MetaTrader, etc.)
- Provides more conservative band width
- Industry standard for financial technical analysis
- Results in tighter bands which are generally preferred for trading signals

### Configuration Parameters

#### Inputs (Default Values)
- **Length**: 20 periods
- **MA Type**: SMA (Simple Moving Average) - only type implemented
- **Source**: Close price - only source implemented  
- **StdDev Multiplier**: 2.0
- **Offset**: 0 (no shift)

#### Style Settings
- **Basis Line**: Color, width, style (solid/dashed), visibility
- **Upper Band**: Color, width, style (solid/dashed), visibility  
- **Lower Band**: Color, width, style (solid/dashed), visibility
- **Background Fill**: Opacity control, visibility toggle

## 🛠️ Technology Stack

- **Next.js 15.5.2**: React framework with App Router
- **TypeScript 5**: Type-safe development
- **TailwindCSS 4**: Utility-first CSS framework
- **KLineCharts 10.0.0-alpha5**: Professional charting library
- **React 19.1.0**: Latest React features

## 📦 Project Structure

```
├── components/
│   ├── Chart.tsx              # KLineCharts wrapper component
│   ├── BollingerSettings.tsx  # Settings modal with Inputs & Style tabs
│   └── Modal.tsx              # Reusable modal component
├── lib/
│   ├── indicators/
│   │   └── bollinger.ts       # Pure Bollinger Bands calculation function
│   └── types.ts               # TypeScript type definitions
├── public/data/
│   └── ohlcv.json            # Sample OHLCV data (200+ candles)
├── src/app/
│   ├── page.tsx              # Main page with chart and controls
│   ├── layout.tsx            # App layout
│   └── globals.css           # Global styles
└── README.md                 # This file
```

## 🎯 Usage Guide

1. **View Chart**: Candlestick chart loads automatically with sample data
2. **Toggle Indicator**: Click "Show Bollinger Bands" checkbox to enable/disable
3. **Configure Settings**: Click the settings icon to open configuration modal
4. **Adjust Parameters**: 
   - **Inputs Tab**: Change length, multiplier, and offset
   - **Style Tab**: Customize colors, line width, and visibility
5. **Real-time Updates**: Changes apply instantly to the chart
6. **Visual Feedback**: View current band values in the top-left info panel

## 📈 Screenshots

### Main Chart Interface
*Screenshot showing the candlestick chart with Bollinger Bands overlay and control panel*

### Settings Modal - Inputs Tab
*Screenshot of the settings modal showing parameter configuration options*

### Settings Modal - Style Tab  
*Screenshot of the style configuration tab with color pickers and visibility controls*

> **Note**: Add actual screenshots here by taking screenshots of:
> 1. The main chart with Bollinger Bands enabled
> 2. The settings modal opened to the "Inputs" tab
> 3. The settings modal opened to the "Style" tab

## ⚡ Performance Notes

- Optimized for 200-1000 candles
- O(N × window) complexity for band calculation
- Efficient React re-rendering with proper memoization
- Smooth interactions with instant parameter updates

## 🔧 Technical Details

### KLineCharts Version
**Version**: 10.0.0-alpha5

This version provides:
- Built-in BOLL (Bollinger Bands) indicator
- Modern React integration
- TypeScript support
- Customizable chart styling

### Core Calculation Logic

```typescript
// Population standard deviation formula used
const variance = window.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / length;
const sd = Math.sqrt(variance);

// Band calculations
const basis = mean;
const upper = basis + stdDevMultiplier * sd;
const lower = basis - stdDevMultiplier * sd;
```

## 🚧 Known Limitations

- **Single Timeframe**: Demo uses daily candles only
- **Basic Data**: Static sample data rather than live feeds
- **MA Type**: Only SMA implemented (as specified in requirements)
- **Source**: Only close price supported (as specified in requirements)

## 🔮 Future Enhancements

- Multiple timeframe support
- Live data integration via WebSocket
- Additional moving average types (EMA, WMA)
- More technical indicators
- Export/import settings functionality
- Advanced charting features

## 🐛 Troubleshooting

### Common Issues

1. **Chart not loading**: Ensure all dependencies are installed with `npm install`
2. **Bollinger Bands not visible**: Check if the indicator is enabled via the checkbox
3. **Settings not applying**: Verify that you clicked "Apply" in the settings modal
4. **Build errors**: Run `npm run build` to check for TypeScript errors

### Debug Information

The application logs calculation results to the browser console. Open Developer Tools → Console to see:
- Bollinger Bands calculation results
- Chart initialization status
- Parameter update confirmations

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ using Next.js and KLineCharts**
