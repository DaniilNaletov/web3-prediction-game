import { useCallback, useState } from "react";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  usePublicClient,
  useWalletClient,
} from "wagmi";
import PredictionMarketFactoryAbi from "../../model/PredictionMarketFactoryAbi";
import { prepareWriteContract, writeContract } from "wagmi/actions";

const useMarketCreation = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [existedMarket, setExistedMarket] = useState("");

  const publicClient = usePublicClient();

  const account = useAccount();
  const { data: walletClient } = useWalletClient();

  console.log("ASD:", account, publicClient, walletClient);

  const { config } = usePrepareContractWrite({
    address: "0x595A74DDE1b1d08a48943A81602bc334474ce487",
    abi: PredictionMarketFactoryAbi,

    functionName: "createMarket",
    args: [
      999999999999,
      9999999999999,
      "0x40881C3b2033de18C47003A294E4c6C6A76e6793",
      "Temp",
    ],
  });

  const { data, isError, isLoading } = useContractWrite(config);

  console.log("Write:", data, isLoading, isError);

  const findMarket = useCallback(
    async (description: string, cutoffDate: number) => {
      const result = (await publicClient.readContract({
        address: "0x595A74DDE1b1d08a48943A81602bc334474ce487",
        abi: PredictionMarketFactoryAbi,
        functionName: "getMarket",
        args: [description, cutoffDate],
      })) as string;

      if (BigInt(result) !== BigInt(0)) {
        return result;
      }
      return null;
    },
    [publicClient]
  );

  const createMarket = useCallback(
    async (data: {
      description: string;
      cutoffDate: number;
      decisionDate: number;
      decisionProvider: string;
    }) => {
      const { description, cutoffDate, decisionDate, decisionProvider } = data;
      console.log(
        "Create:",
        description,
        cutoffDate,
        decisionDate,
        decisionProvider
      );

      setIsCreating(true);

      const existedMarket = await findMarket(description, cutoffDate);
      if (existedMarket) {
        setIsCreating(false);
        setExistedMarket(existedMarket);
      }

      const { request } = await prepareWriteContract({
        address: "0x595A74DDE1b1d08a48943A81602bc334474ce487",
        abi: PredictionMarketFactoryAbi,

        functionName: "createMarket",
        args: [cutoffDate, decisionDate, decisionProvider, description],
      });

      const { hash } = await writeContract(request);

      //   writeContract()

      console.log("CreateContract request sent:", hash);
    },
    [findMarket]
  );

  return { isCreating, existedMarket, createMarket };
};

export default useMarketCreation;
