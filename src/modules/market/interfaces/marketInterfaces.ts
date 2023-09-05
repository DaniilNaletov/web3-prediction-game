export interface Market {
  id: string;
  description: string;
  address: string;
  providerAddress: string;
  state: boolean;
  winToken: null;
  lastEventDate: number;
}

export interface MarketInfo {
  description: string;
  cutoffDate: number;
  state: boolean;
  votesUp: number;
  votesDown: number;
}
