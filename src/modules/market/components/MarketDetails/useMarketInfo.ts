import { useMemo } from "react";
import { Address } from "viem";
import { useContractReads } from "wagmi";
import PredictionMarketAbi from "../../model/PredictionMarketAbi";
import { MarketInfo } from "../../interfaces/marketInterfaces";

const useMarketInfo = (market: Address) => {
  const base = {
    address: market as Address,
    abi: PredictionMarketAbi,
  };
  const { data, isLoading, isError } = useContractReads({
    contracts: [
      {
        ...base,
        functionName: "getDescription",
      },
      {
        ...base,
        functionName: "getCutoffDate",
      },
      {
        ...base,
        functionName: "getState",
      },
      {
        ...base,
        functionName: "getTotalVotesValue",
        args: [true],
      },
      {
        ...base,
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

// const fetchInfo = useCallback(async () => {
//     const base = {
//       address: market as Address,
//       abi: PredictionMarketAbi,
//     };

//     setIsLoading(true);
//     const results = await publicClient.multicall({
//       contracts: [
//         {
//           ...base,
//           functionName: "getDescription",
//         },
//         {
//           ...base,
//           functionName: "getCutoffDate",
//         },
//         {
//           ...base,
//           functionName: "getState",
//         },
//         {
//           ...base,
//           functionName: "getTotalVotesValue",
//           args: [true],
//         },
//         {
//           ...base,
//           functionName: "getTotalVotesValue",
//           args: [false],
//         },
//       ],
//     });

//     const [description, cutoffDate, state, votesUp, votesDown] = results.map(
//       (res) => res.result
//     );
//     const marketInfo: MarketInfo = {
//       description: String(description),
//       cutoffDate: Number(cutoffDate),
//       state: Boolean(state),
//       votesUp: Number(votesUp),
//       votesDown: Number(votesDown),
//     };
//     setMarketInfo(marketInfo);

//     setIsLoading(false);
//   }, [publicClient, market]);
