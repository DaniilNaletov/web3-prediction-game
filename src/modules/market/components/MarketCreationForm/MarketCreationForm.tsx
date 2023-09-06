import React, { useState } from "react";
import { useAccount } from "wagmi";
import validateCreationData from "../../model/validateCreationData";
import { MarketCreationData } from "../../interfaces/marketInterfaces";
import createPredictionMarket from "./createPredictionMarket";
import useWatchMarketCreatedEvent from "../../hooks/useWatchMarketCreatedEvent";

const MarketCreationForm: React.FC<{
  onMarketSelect: (market: string) => void;
}> = ({ onMarketSelect }) => {
  const [error, setError] = useState("");
  const [existedMarket, setExistedMarket] = useState("");
  const [createdMarket, setCreatedMarket] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const { isConnected } = useAccount();

  useWatchMarketCreatedEvent();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setExistedMarket("");
    setCreatedMarket("");

    if (!isConnected) {
      setError("Please connect your wallet");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const creationData: MarketCreationData = {
      description: String(formData.get("description")),
      cutoffDate: Date.parse(String(formData.get("cutoffDate"))),
      decisionDate: Date.parse(String(formData.get("decisionDate"))),
      decisionProvider: String(formData.get("decisionProvider")),
    };

    const error = validateCreationData(creationData);
    if (error) {
      setError(error);
      return;
    }

    setIsCreating(true);
    const result = await createPredictionMarket(creationData);
    setIsCreating(false);

    if (result.type === "existed") {
      setExistedMarket(result.existedMarket as string);
    } else if (result.type === "success") {
      setCreatedMarket(result.transactionHash as string);
    } else if (result.type === "error") {
      setError("Something went wrong... Try again");
    }
  };

  return (
    <form
      className="flex flex-col p-4 rounded-md shadow gap-4"
      onSubmit={handleSubmit}
    >
      {isCreating && (
        <div className="flex flex-row items-center gap-3 bg-green-50 rounded-md p-2 text-green-500">
          <p>Creating a new market...</p>
        </div>
      )}
      {createdMarket && (
        <div className="flex flex-row items-center gap-3 bg-green-50 rounded-md p-2 text-green-500">
          <p>✅ Market created!</p>
        </div>
      )}
      {existedMarket && (
        <div className="flex flex-row items-center gap-3 bg-green-50 rounded-md p-2 text-green-500">
          <p>Market already exist!</p>
          <button
            className="flex px-3 py-1 rounded bg-purple-700 hover:bg-opacity-90 transition-all text-white h-max"
            onClick={onMarketSelect.bind(null, existedMarket)}
          >
            See Market
          </button>
        </div>
      )}
      {error && (
        <div className=" bg-red-50 rounded-md p-2 text-red-500">{error}</div>
      )}
      <div>
        <p>Description</p>
        <input
          className="border rounded outline-none px-3 py-1 mt-1 w-full"
          name="description"
          type="text"
          disabled={isCreating}
        />
      </div>
      <div>
        <p>Cutoff Date</p>
        <input
          className="border rounded outline-none px-3 py-1 mt-1 w-full"
          name="cutoffDate"
          type="datetime-local"
          disabled={isCreating}
        />
      </div>
      <div>
        <p>Decision Date</p>
        <input
          className="border rounded outline-none px-3 py-1 mt-1 w-full"
          name="decisionDate"
          type="datetime-local"
          disabled={isCreating}
        />
      </div>
      <div>
        <p>Decision Provider</p>
        <input
          className="border rounded outline-none px-3 py-1 mt-1 w-full"
          name="decisionProvider"
          type="text"
          disabled={isCreating}
        />
      </div>

      <button
        type="submit"
        className="flex flex-row items-center justify-center px-3 py-1 rounded bg-purple-700 hover:bg-opacity-90 transition-all text-white h-max text-center"
        disabled={isCreating}
      >
        {isCreating ? "Creating ..." : "Create"}
      </button>
    </form>
  );
};

export default MarketCreationForm;
