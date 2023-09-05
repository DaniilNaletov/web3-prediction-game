import { useMemo } from "react";
import { Address } from "viem";
import { useContractReads } from "wagmi";
import PredictionMarketAbi from "../../model/PredictionMarketAbi.json";
import { MarketInfo } from "../../interfaces/marketInterfaces";

const useMarketInfo = (market: Address) => {
  const { data, isLoading, isError } = useContractReads({
    contracts: [
      {
        address: market,
        // @ts-expect-error Ignore check
        abi: PredictionMarketAbi,
        functionName: "getDescription",
      },
      {
        address: market,
        // @ts-expect-error Ignore check
        abi: PredictionMarketAbi,
        functionName: "getCutoffDate",
      },
      {
        address: market,
        // @ts-expect-error Ignore check
        abi: PredictionMarketAbi,
        functionName: "getState",
      },
      {
        address: market,
        // @ts-expect-error Ignore check
        abi: PredictionMarketAbi,
        functionName: "getTotalVotesValue",
        args: [true],
      },
      {
        address: market,
        // @ts-expect-error Ignore check
        abi: PredictionMarketAbi,
        functionName: "getTotalVotesValue",
        args: [false],
      },
    ],
  });

  const marketInfo: MarketInfo | null = useMemo(() => {
    if (!data) {
      return null;
    }

    const [description, cutoffDate, state, votesUp, votesDown] = data.map(
      (res) => res.result
    );
    return {
      description: String(description),
      cutoffDate: Number(cutoffDate),
      state: Boolean(state),
      votesUp: Number(votesUp),
      votesDown: Number(votesDown),
    };
  }, [data]);

  return { marketInfo, isLoading, isError };
};

export default useMarketInfo;
