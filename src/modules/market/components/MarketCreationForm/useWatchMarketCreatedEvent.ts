import { useEffect } from "react";
import { watchContractEvent } from "wagmi/actions";
import { MARKET_FACTORY_ADDRESS } from "../../model/marketConstants";
import PredictionMarketFactoryAbi from "../../model/PredictionMarketFactoryAbi.json";

const useWatchMarketCreatedEvent = () => {
  useEffect(() => {
    const unwatch = watchContractEvent(
      {
        address: MARKET_FACTORY_ADDRESS,
        abi: PredictionMarketFactoryAbi,
        eventName: "marketCreated",
      },
      (log) => console.log("Watch ContractEvent: marketCreated", log)
    );

    return () => {
      unwatch();
    };
  }, []);
};

export default useWatchMarketCreatedEvent;
