// src/components/TokenSwap.tsx

import React, { useEffect, useState } from "react";
import { fetchTokenPrice } from "../api/funkitApi";

type Token = {
  symbol: string;
  address: string;
  chainId: number;
};

const tokens: Token[] = [
  {
    symbol: "USDT",
    address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    chainId: 137,
  },
  {
    symbol: "USDC",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    chainId: 1,
  },
  {
    symbol: "ETH",
    address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    chainId: 8453,
  },
  {
    symbol: "WBTC",
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    chainId: 1,
  },
];

export default function TokenSwap() {
  const [fromToken, setFromToken] = useState<Token>(tokens[0]);
  const [toToken, setToToken] = useState<Token>(tokens[1]);
  const [usdAmount, setUsdAmount] = useState<number>(100);
  const [fromPrice, setFromPrice] = useState<number | null>(null);
  const [toPrice, setToPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchPrices() {
      if (!fromToken || !toToken) return;
      setLoading(true);

      console.log(
        "🔄 Fetching prices for",
        fromToken.symbol,
        "and",
        toToken.symbol
      );

      const [fromRes, toRes] = await Promise.all([
        fetchTokenPrice(fromToken.chainId.toString(), fromToken.address),
        fetchTokenPrice(toToken.chainId.toString(), toToken.address),
      ]);

      console.log("✅ From token response:", fromRes);
      console.log("✅ To token response:", toRes);

      setFromPrice(fromRes?.price ?? null);
      setToPrice(toRes?.price ?? null);
      setLoading(false);
    }

    fetchPrices();
  }, [fromToken, toToken]);

  const fromAmount =
    fromPrice && fromPrice > 0 ? (usdAmount / fromPrice).toFixed(4) : "0.0000";
  const toAmount =
    toPrice && toPrice > 0 ? (usdAmount / toPrice).toFixed(4) : "0.0000";

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Token Swap Explorer</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">From Token:</label>
        <select
          className="w-full border rounded p-2"
          value={fromToken.symbol}
          onChange={(e) =>
            setFromToken(tokens.find((t) => t.symbol === e.target.value)!)
          }
        >
          {tokens.map((token) => (
            <option key={token.symbol} value={token.symbol}>
              {token.symbol}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">To Token:</label>
        <select
          className="w-full border rounded p-2"
          value={toToken.symbol}
          onChange={(e) =>
            setToToken(tokens.find((t) => t.symbol === e.target.value)!)
          }
        >
          {tokens.map((token) => (
            <option key={token.symbol} value={token.symbol}>
              {token.symbol}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">USD Amount:</label>
        <input
          type="number"
          className="w-full border rounded p-2"
          value={usdAmount}
          onChange={(e) => setUsdAmount(Number(e.target.value))}
        />
      </div>

      <div className="mt-4 space-y-1">
        {loading ? (
          <p className="text-gray-500">Loading prices...</p>
        ) : (
          <>
            <p>
              {usdAmount} USD ≈ {fromAmount} {fromToken.symbol}
            </p>
            <p>
              {usdAmount} USD ≈ {toAmount} {toToken.symbol}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
