import React from "react";
import MarketCreationForm from "../../../modules/market/components/MarketCreationForm/MarketCreationForm";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const MarketCreationPage: React.FC<{
  onBack: () => void;
  onMarketSelect: (market: string) => void;
}> = ({ onBack, onMarketSelect }) => {
  return (
    <div className="w-full h-full flex flex-col px-10 py-8">
      <div className="flex flex-row gap-3 items-center mb-8">
        <button className="flex px-3 py-1 rounded border" onClick={onBack}>
          Back
        </button>
        <h1 className="text-4xl">Market Creation</h1>
        <div className="flex-grow" />
        <ConnectButton />
      </div>
      {/* <MarketDetails market={market} /> */}
      <MarketCreationForm onMarketSelect={onMarketSelect} />
    </div>
  );
};

export default MarketCreationPage;
