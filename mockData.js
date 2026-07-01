// Mock API Response for Capital Gains
export const capitalGainsData = {
  stcg: {
    profits: 150000,
    losses: 50000
  },
  ltcg: {
    profits: 320000,
    losses: 120000
  }
};

// Mock API Response for Asset Holdings
export const holdingsData = [
  {
    id: "btc",
    name: "Bitcoin (BTC)",
    avgBuyPrice: 5500000,
    currentPrice: 5100000,
    stcgGain: -400000,
    ltcgGain: 0
  },
  {
    id: "eth",
    name: "Ethereum (ETH)",
    avgBuyPrice: 280000,
    currentPrice: 310000,
    stcgGain: 15000,
    ltcgGain: 15000
  },
  {
    id: "sol",
    name: "Solana (SOL)",
    avgBuyPrice: 14000,
    currentPrice: 11000,
    stcgGain: -3000,
    ltcgGain: 0
  },
  {
    id: "ada",
    name: "Cardano (ADA)",
    avgBuyPrice: 45,
    currentPrice: 48,
    stcgGain: 0,
    ltcgGain: 3000
  }
];