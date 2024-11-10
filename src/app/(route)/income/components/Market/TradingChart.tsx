import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, IChartApi } from 'lightweight-charts';
import { fetchCandleData, type CandleData } from '@/lib/crypto';

interface TradingChartProps {
  symbol: string;
  data: { time: string; value: number }[][];
  color?: string[];
  coinIds: string[];
}

const TradingChart: React.FC<TradingChartProps> = ({ 
  symbol, 
  data, 
  color = ['#2962FF'], 
  coinIds 
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [candleData, setCandleData] = useState<CandleData[][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCandleData = async () => {
      try {
        const newData = await Promise.all(
          coinIds.map(coinId => fetchCandleData(coinId))
        );
        setCandleData(newData);
      } catch (error) {
        console.error('Failed to fetch candle data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCandleData();
    const interval = setInterval(loadCandleData, 60000);
    return () => clearInterval(interval);
  }, [coinIds]);

  useEffect(() => {
    if (!chartContainerRef.current || !candleData.length) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#1a1a1a' },
        textColor: '#DDD',
      },
      grid: {
        vertLines: { color: '#2a2a2a' },
        horzLines: { color: '#2a2a2a' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    coinIds.forEach((_, index) => {
        const series = chart.addCandlestickSeries({
          upColor: color[index] || '#26a69a',
          downColor: '#ef5350',
          borderVisible: false,
          wickUpColor: color[index] || '#26a69a',
          wickDownColor: '#ef5350',
        });
      
        if (candleData[index]) {
          const formattedData = candleData[index].map(data => ({
            ...data,
            time: Math.floor(data.time / 1000),
            //@ts-ignore
          })) as (CandlestickData<Time> | WhitespaceData<Time>)[];
      
          series.setData(formattedData);
        }
      });
      

    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [candleData, color, coinIds]);

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">{symbol}</h2>
        {loading && (
          <div className="text-sm text-gray-400">Loading chart data...</div>
        )}
      </div>
      <div ref={chartContainerRef} className="relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradingChart;