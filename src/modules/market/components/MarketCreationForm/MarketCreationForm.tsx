import React, { useState } from "react";
import useMarketCreation from "./useMarketCreation";

const MarketCreationForm: React.FC<{
  onMarketSelect: (market: string) => void;
}> = ({ onMarketSelect }) => {
  const [error, setError] = useState("");

  const { isCreating, existedMarket, createMarket } = useMarketCreation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    const formData = new FormData(e.currentTarget);

    const description = String(formData.get("description"));
    // const cutoffDate = String(formData.get("cutoffDate"));
    const cutoffDate = Number(1693951961989);
    const decisionDate = String(formData.get("decisionDate"));
    const decisionProvider = String(formData.get("decisionProvider"));

    if (!description || !description.length) {
      setError("Description can not be empty");
      return;
    }

    if (!cutoffDate) {
      setError("Cutoff date can not be empty");
      return;
    }

    if (new Date(cutoffDate).getTime() <= Date.now()) {
      setError("Cutoff date should be a future");
      return;
    }

    if (!decisionDate) {
      setError("Decision date can not be empty");
      return;
    }

    if (new Date(decisionDate).getTime() <= new Date(cutoffDate).getTime()) {
      setError("Decision date should be after cutoff date");
      return;
    }

    if (!decisionProvider || !decisionProvider.length) {
      setError("Decision provider can not be empty");
      return;
    }

    console.log("Send:", e, formData.get("cutoffDate"));

    createMarket({
      description,
      cutoffDate: new Date(cutoffDate).getTime(),
      decisionDate: new Date(decisionDate).getTime(),
      decisionProvider,
    });
  };

  return (
    <form
      className="flex flex-col p-4 rounded-md shadow gap-4"
      onSubmit={handleSubmit}
    >
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
        Create
      </button>
    </form>
  );
};

export default MarketCreationForm;
