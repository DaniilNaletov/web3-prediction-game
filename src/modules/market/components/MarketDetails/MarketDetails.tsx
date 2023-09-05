import React from "react";
import { Address } from "wagmi";
import useMarketInfo from "./useMarketInfo";
import getEmojiFromAddress from "../../../../common/getEmojiFromAddress";

const MarketDetails: React.FC<{
  market: string;
}> = ({ market }) => {
  const { marketInfo, isError } = useMarketInfo(market as Address);

  if (isError) {
    return <div className="">Error on load market {market} details...</div>;
  }

  if (marketInfo) {
    const dateDiff = new Date(marketInfo.cutoffDate).getTime() - Date.now();
    const hours = Math.round(Math.abs(dateDiff) / 36e5);

    return (
      <div className="flex flex-col p-4 rounded-md shadow gap-4">
        <div className="flex flex-row gap-3">
          <p className="text-2xl">{getEmojiFromAddress(BigInt(market))}</p>
          <p className="text-2xl">{marketInfo.description}</p>
        </div>

        <p>Cutoff Date in: {hours} hours</p>

        <p>Active: {!marketInfo.state ? "Yes" : "No"}</p>

        <div className="flex flex-row gap-3">
          <p>Votes up: {marketInfo.votesUp} 👍</p>
          <p>Votes down: {marketInfo.votesUp} 👎</p>
        </div>
      </div>
    );
  }

  return <div>Loading ...</div>;
};

export default MarketDetails;
