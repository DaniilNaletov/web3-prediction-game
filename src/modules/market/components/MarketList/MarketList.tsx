import React, { useEffect, useState } from "react";
import { getMarkets } from "../../api/marketApi";
import { Market } from "../../interfaces/marketInterfaces";
import getEmojiFromAddress from "../../../../common/getEmojiFromAddress";

const MarketList: React.FC<{
  onMarketSelect?: (market: string | null) => void;
}> = ({ onMarketSelect }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [markets, setMarkets] = useState<Market[]>([]);

  const fetchMarkets = async () => {
    setIsLoading(true);
    const markets = await getMarkets();
    setIsLoading(false);

    setMarkets(markets.sort((m1, m2) => m2.lastEventDate - m1.lastEventDate));
  };

  useEffect(() => {
    fetchMarkets();
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <ul className="flex flex-col gap-3 w-full">
      {markets.map((market) => {
        return (
          <li
            key={market.id}
            className="rounded-md p-4 flex flex-row gap-2 shadow hover:shadow-md transition-shadow cursor-pointer"
            onClick={onMarketSelect?.bind(null, market.address)}
          >
            <p className="text-xl">
              {getEmojiFromAddress(BigInt(market.address))}
            </p>
            <div>
              <p>{market.description}</p>
              <p className="text-sm text-gray-500">{market.address}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default MarketList;
