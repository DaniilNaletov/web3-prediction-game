import { useCallback, useEffect } from "react";
import PredictionMarketFactoryAbi from "../../model/PredictionMarketFactoryAbi.json";
import {
  prepareWriteContract,
  readContract,
  waitForTransaction,
  watchContractEvent,
  writeContract,
} from "wagmi/actions";
import { MarketCreationData } from "../../interfaces/marketInterfaces";
import { MARKET_FACTORY_ADDRESS } from "../../model/marketConstants";

interface CreateMarketResult {
  type: "existed" | "success" | "error";
  market?: string;
}

const useMarketCreation = () => {
  useEffect(() => {
    const unwatch = watchContractEvent(
      {
        address: MARKET_FACTORY_ADDRESS,
        abi: PredictionMarketFactoryAbi,
        eventName: "marketCreated",
      },
      (log) => console.log("Watch marketCreated ContractEvent: ", log)
    );
    const unwatch2 = watchContractEvent(
      {
        address: MARKET_FACTORY_ADDRESS,
        abi: PredictionMarketFactoryAbi,
        eventName: "marketCreatedEvent",
      },
      (log) => console.log("Watch marketCreatedEvent ContractEvent: ", log)
    );

    return () => {
      unwatch();
      unwatch2();
    };
  }, []);

  const findMarket = useCallback(
    async (description: string, cutoffDate: number) => {
      const result = (await readContract({
        address: MARKET_FACTORY_ADDRESS,
        abi: PredictionMarketFactoryAbi,
        functionName: "getMarket",
        args: [description, cutoffDate],
      })) as string;

      if (BigInt(result) !== BigInt(0)) {
        return result;
      }
      return null;
    },
    []
  );

  const createMarket = useCallback(
    async (data: MarketCreationData): Promise<CreateMarketResult> => {
      const { description, cutoffDate, decisionDate, decisionProvider } = data;
      console.log(
        "createMarket:",
        description,
        cutoffDate,
        decisionDate,
        decisionProvider
      );

      try {
        const existedMarket = await findMarket(description, cutoffDate);
        if (existedMarket) {
          return { type: "existed", market: existedMarket };
        }

        const { request } = await prepareWriteContract({
          address: MARKET_FACTORY_ADDRESS,
          abi: PredictionMarketFactoryAbi,

          functionName: "createMarket",
          args: [cutoffDate, decisionDate, decisionProvider, description],
        });

        const { hash } = await writeContract(request);

        console.log("Contract Write hash:", hash);

        const data = await waitForTransaction({
          hash,
        });

        console.log("Contract Write transaction:", data);

        if (data.status === "success") {
          return { type: "success" };
        }

        return { type: "error" };
      } catch (e) {
        console.log("Something went wrong on contact creation");
        console.error(e);

        return { type: "error" };
      }
    },
    [findMarket]
  );

  return { createMarket };
};

export default useMarketCreation;
