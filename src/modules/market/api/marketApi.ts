import { Market } from "../interfaces/marketInterfaces";

export const getMarkets = async (): Promise<Market[]> => {
  const response = await fetch("https://emp-backend-test.fly.dev/markets");

  return await response.json();
};
