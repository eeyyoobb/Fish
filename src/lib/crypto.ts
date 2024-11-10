export interface CryptoData {
    id: string;
    current_price: number;
    price_change_percentage_24h: number;
    total_volume: number;
    sparkline_in_7d: {
      price: number[];
    };
  }
  
  export interface CandleData {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
  }
  
  export async function fetchCryptoData(ids: string[]): Promise<CryptoData[]> {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(',')}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`
      );
      if (!response.ok) throw new Error('Failed to fetch crypto data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      throw error;
    }
  }
  
  export async function fetchCandleData(coinId: string): Promise<CandleData[]> {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=7`
      );
      if (!response.ok) throw new Error('Failed to fetch candle data');
      const data = await response.json();
      
      return data.map((candle: number[]) => ({
        time: candle[0] / 1000,
        open: candle[1],
        high: candle[2],
        low: candle[3],
        close: candle[4]
      }));
    } catch (error) {
      console.error('Error fetching candle data:', error);
      throw error;
    }
  }
  
  export function formatSparklineData(prices: number[]): { time: string; value: number }[] {
    return prices.map((price, index) => ({
      time: new Date(Date.now() - (prices.length - index) * 3600000)
        .toISOString()
        .split('T')[0],
      value: price,
    }));
  }