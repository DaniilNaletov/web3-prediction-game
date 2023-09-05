import React from "react";
import MarketDetails from "../../../modules/market/components/MarketDetails/MarketDetails";

const MarketDetailsPage: React.FC<{ market: string; onBack: () => void }> = ({
  market,
  onBack,
}) => {
  return (
    <div className="w-full h-full flex flex-col px-10 py-8">
      <div className="flex flex-row gap-3 items-center mb-8">
        <button className="flex px-3 py-1 rounded border" onClick={onBack}>
          Back
        </button>
        <h1 className="text-4xl">Market Details</h1>
      </div>
      <MarketDetails market={market} />
    </div>
  );
};

export default MarketDetailsPage;
