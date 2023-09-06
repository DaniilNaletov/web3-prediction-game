import {
  prepareWriteContract,
  readContract,
  waitForTransaction,
  writeContract,
} from "wagmi/actions";
import { MARKET_FACTORY_ADDRESS } from "../../model/marketConstants";
import PredictionMarketFactoryAbi from "../../model/PredictionMarketFactoryAbi.json";
import { MarketCreationData } from "../../interfaces/marketInterfaces";

interface CreateMarketResult {
  type: "existed" | "success" | "error";
  existedMarket?: string;
  transactionHash?: string;
}

const findMarket = async (description: string, cutoffDate: number) => {
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
};

const createPredictionMarket = async (
  data: MarketCreationData
): Promise<CreateMarketResult> => {
  const { description, cutoffDate, decisionDate, decisionProvider } = data;
  console.log(
    "createPredictionMarket()",
    description,
    cutoffDate,
    decisionDate,
    decisionProvider
  );

  try {
    const existedMarket = await findMarket(description, cutoffDate);
    if (existedMarket) {
      return { type: "existed", existedMarket };
    }

    const { request } = await prepareWriteContract({
      address: MARKET_FACTORY_ADDRESS,
      abi: PredictionMarketFactoryAbi,

      functionName: "createMarket",
      args: [cutoffDate, decisionDate, decisionProvider, description],
    });

    const { hash: transactionHash } = await writeContract(request);

    console.log("Contract Write hash:", transactionHash);

    const transaction = await waitForTransaction({
      hash: transactionHash,
    });

    console.log("Contract Write transaction:", transaction);

    if (transaction.status === "success") {
      return { type: "success", transactionHash };
    }

    return { type: "error" };
  } catch (e) {
    console.log("Something went wrong on contact creation");
    console.error(e);

    return { type: "error" };
  }
};

export default createPredictionMarket;
