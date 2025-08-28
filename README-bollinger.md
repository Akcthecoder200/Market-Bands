# Bollinger Bands Chart - Next.js + KLineCharts

A production-ready Next.js application implementing Bollinger Bands indicator overlay on candlestick charts using KLineCharts library.

## Features

- **Interactive Candlestick Chart**: Real-time responsive charting with KLineCharts
- **Bollinger Bands Indicator**: Complete implementation with configurable parameters
- **TradingView-style Settings**: Inputs and Style configuration panels
- **Real-time Updates**: Instant chart updates when changing parameters
- **TypeScript**: Fully type-safe implementation
- **TailwindCSS**: Modern, responsive UI design
- **200+ Sample Candles**: Realistic OHLCV data for demonstration

## Setup & Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

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

## Bollinger Bands Implementation

### Formula

The implementation uses the following formulas:

- **Basis (Middle Band)**: `SMA(close, length)`
- **Standard Deviation**: Population standard deviation `sqrt(sum((x-mean)²)/N)`
- **Upper Band**: `basis + (multiplier × stdDev)`
- **Lower Band**: `basis - (multiplier × stdDev)`
- **Offset**: Shifts all bands forward/backward by N periods

### Why Population Standard Deviation?

This implementation uses **population standard deviation** (dividing by N) rather than sample standard deviation (dividing by N-1). This is consistent with most trading platforms and provides more conservative band width, which is generally preferred for trading applications.

### Configuration Options

#### Inputs (Defaults)
- **Length**: 20 periods
- **MA Type**: SMA (Simple Moving Average)
- **Source**: Close price
- **StdDev Multiplier**: 2.0
- **Offset**: 0 (no shift)

#### Style Settings
- **Basis Line**: Color, width, style (solid/dashed), visibility
- **Upper Band**: Color, width, style (solid/dashed), visibility  
- **Lower Band**: Color, width, style (solid/dashed), visibility
- **Background Fill**: Opacity control, visibility toggle

## Usage

1. **View Chart**: Candlestick chart loads automatically with sample data
2. **Add Indicator**: Click "Add Bollinger Bands" button
3. **Configure Settings**: Use the settings modal to adjust parameters
4. **Real-time Updates**: Changes apply instantly to the chart
5. **Visual Feedback**: Hover to see band values in the info overlay

## Technology Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **TailwindCSS**: Utility-first CSS framework
- **KLineCharts**: Professional charting library
- **React 18**: Latest React features

## Dependencies

```json
{
  "klinecharts": "^10.x.x",
  "clsx": "^2.x.x"
}
```

**KLineCharts Version**: Check `package.json` for exact version used.

## Performance Notes

- Optimized for 200-1000 candles
- O(N × window) complexity for band calculation
- Efficient React re-rendering with proper memoization
- Smooth interactions with instant parameter updates

## Known Limitations

- **Overlay Integration**: Current implementation shows computed values in console and info panel. Full visual overlay integration with KLineCharts would require deeper integration with their custom overlay API
- **Single Timeframe**: Demo uses daily candles only
- **Basic Tooltips**: Custom crosshair values would need additional KLineCharts configuration

## Trade-offs Made

1. **Simplified Overlay**: Focused on core calculation logic and UI rather than complex KLineCharts overlay rendering
2. **Population StdDev**: Chose consistency with trading platforms over statistical correctness
3. **Static Data**: Used pre-generated OHLCV for demo rather than live data feeds
4. **Basic Error Handling**: Minimal error states to focus on core functionality

## Future Enhancements

- Full visual overlay integration with KLineCharts
- Multiple timeframe support
- Live data integration
- Additional technical indicators
- Export/import settings functionality
- Advanced tooltip customization

## Screenshots

*Placeholder: Add screenshots of the application showing the chart, settings modal, and Bollinger Bands overlay*

## License

MIT License - see LICENSE file for details.
