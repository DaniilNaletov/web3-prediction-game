import React from "react";
import MarketList from "../../../modules/market/components/MarketList/MarketList";

const MarketsPage: React.FC<{
  onMarketSelect: (market: string | null) => void;
  onNewMarketClick: () => void;
}> = ({ onMarketSelect, onNewMarketClick }) => {
  return (
    <div className="w-full h-full flex flex-col items-center px-10 py-8">
      <div className="flex flex-row w-full justify-between mb-8">
        <h1 className="text-4xl">🕹️ Prediction Game</h1>

        <button
          className="flex px-3 py-1 rounded bg-purple-700 hover:bg-opacity-90 transition-all text-white h-max"
          onClick={onNewMarketClick}
        >
          New Market
        </button>
      </div>

      <MarketList onMarketSelect={onMarketSelect} />
    </div>
  );
};

export default MarketsPage;
