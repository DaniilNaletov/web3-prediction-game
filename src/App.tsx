import React, { useState } from "react";
import { useAccount } from "wagmi";
import MarketsPage from "./pages/MarketsPage/MarketsPage";
import MarketDetailsPage from "./pages/MarketDetailsPage/MarketDetailsPage";
import MarketCreationPage from "./pages/MarketCreationPage/MarketCreationPage";

const App: React.FC = () => {
  const { isConnected } = useAccount();
  console.log("Acc:", isConnected);

  const [currentMarket, setCurrentMarket] = useState<string | null>(null);

  const handleMarketSelect = (market: string | null) => {
    setCurrentMarket(market);
  };

  const handleBack = () => {
    setCurrentMarket(null);
  };

  const handleNewMarket = () => {
    setCurrentMarket("draft");
  };

  if (currentMarket === "draft") {
    return (
      <MarketCreationPage
        onBack={handleBack}
        onMarketSelect={handleMarketSelect}
      />
    );
  }

  if (currentMarket) {
    return <MarketDetailsPage market={currentMarket} onBack={handleBack} />;
  }

  return (
    <MarketsPage
      onMarketSelect={handleMarketSelect}
      onNewMarketClick={handleNewMarket}
    />
  );
};

export default App;
