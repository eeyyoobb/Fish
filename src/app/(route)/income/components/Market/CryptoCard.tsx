import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CryptoCardProps {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
}

const CryptoCard: React.FC<CryptoCardProps> = ({
  name,
  symbol,
  price,
  change24h,
  volume24h,
}) => {
  const isPositive = change24h >= 0;

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <span className="text-gray-400">{symbol}</span>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-2xl font-bold text-white">${price.toLocaleString()}</p>
          <div className={`flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            <span className="ml-1">{Math.abs(change24h).toFixed(2)}%</span>
          </div>
        </div>
        
        <div className="text-sm">
          <p className="text-gray-400">24h Volume</p>
          <p className="font-semibold text-gray-200">${volume24h.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;