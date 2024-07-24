export interface EnrichedTicker extends Ticker {
  symbol: string;
  change: number;
  currency1: string;
  currency2: string;
}
export interface Ticker {
  ask: number;
  bid: number;
  close: number;
  high: number;
  last: number;
  low: number;
  market: string;
  microtimestamp: number;
  open: number;
  pair: string;
  volume: number;
  vwap: number;
}
export interface BitStampSocketResponse {
  channel: string;
  data: {
    tickers: Ticker[];
  };
  event: string;
}
