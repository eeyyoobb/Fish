"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { Wallet } from 'lucide-react';
import TradingChart from './TradingChart';
import CryptoCard from './CryptoCard';
import { fetchCryptoData, formatSparklineData, type CryptoData } from '@/lib/crypto';

function App() {
  const [cryptoData, setCryptoData] = useState<Record<string, CryptoData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Wrap cryptoIds in useMemo to ensure stability
  const cryptoIds = useMemo(() => ['bitcoin', 'binancecoin', 'tether'], []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCryptoData(cryptoIds);
        const dataMap = data.reduce((acc, crypto) => ({
          ...acc,
          [crypto.id]: crypto
        }), {});
        setCryptoData(dataMap);
        setError(null);
      } catch (err) {
        setError('Failed to fetch cryptocurrency data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [cryptoIds]);

  if (loading) {
    return (
      <div className="realtive glass flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative glass flex items-center justify-center">
        <div className="bg-gray-900 border border-red-700 text-red-100 px-4 py-3 rounded-lg" role="alert">
          <strong className="font-normal block sm:inline"> Network Error: </strong>
          <span className="block sm:inline">{"Check your internet or try to refresh the page"}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative glass">
      <nav className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">CryptoTracker Pro</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {cryptoData.bitcoin && (
            <CryptoCard
              name="Bitcoin"
              symbol="BTC"
              price={cryptoData.bitcoin.current_price}
              change24h={cryptoData.bitcoin.price_change_percentage_24h}
              volume24h={cryptoData.bitcoin.total_volume}
            />
          )}
          {cryptoData.binancecoin && (
            <CryptoCard
              name="Binance Coin"
              symbol="BNB"
              price={cryptoData.binancecoin.current_price}
              change24h={cryptoData.binancecoin.price_change_percentage_24h}
              volume24h={cryptoData.binancecoin.total_volume}
            />
          )}
          {cryptoData.tether && (
            <CryptoCard
              name="Tether"
              symbol="USDT"
              price={cryptoData.tether.current_price}
              change24h={cryptoData.tether.price_change_percentage_24h}
              volume24h={cryptoData.tether.total_volume}
            />
          )}
        </div>

        <div className="space-y-8">
          {cryptoData.bitcoin && cryptoData.binancecoin && cryptoData.tether && (
            <TradingChart
              symbol="Crypto Market Overview"
              data={[
                formatSparklineData(cryptoData.bitcoin.sparkline_in_7d.price),
                formatSparklineData(cryptoData.binancecoin.sparkline_in_7d.price),
                formatSparklineData(cryptoData.tether.sparkline_in_7d.price)
              ]}
              color={['#F7931A', '#F3BA2F', '#26A17B']}
              coinIds={cryptoIds}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
