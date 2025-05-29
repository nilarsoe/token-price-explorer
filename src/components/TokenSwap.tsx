// src/components/TokenSwap.tsx
import React, { useEffect, useState } from "react";
import { fetchTokenInfo, fetchTokenPrice } from "../api/funkitApi";

const tokenOptions = [
  { name: "USDC", chainId: "1" },
  { name: "USDT", chainId: "137" },
  { name: "ETH", chainId: "8453" },
  { name: "WBTC", chainId: "1" },
];

export default function TokenSwap() {
  const [usdAmount, setUsdAmount] = useState("100");
  const [fromToken, setFromToken] = useState(tokenOptions[0]);
  const [toToken, setToToken] = useState(tokenOptions[1]);

  const [fromPrice, setFromPrice] = useState<number | null>(null);
  const [toPrice, setToPrice] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const fetchPrices = async () => {
    setError("");
    setFromPrice(null);
    setToPrice(null);

    try {
      const fromInfo = await fetchTokenInfo(fromToken.chainId, fromToken.name);
      const toInfo = await fetchTokenInfo(toToken.chainId, toToken.name);

      console.log("✅ fromInfo", fromInfo);
      console.log("✅ toInfo", toInfo);

      const fromAddress = fromInfo?.tokenAddress || fromInfo?.address;
      const toAddress = toInfo?.tokenAddress || toInfo?.address;

      if (!fromAddress || !toAddress) {
        throw new Error("Missing token address for one or both tokens");
      }

      const fromPriceInfo = await fetchTokenPrice(
        fromToken.chainId,
        fromAddress
      );
      const toPriceInfo = await fetchTokenPrice(toToken.chainId, toAddress);

      console.log("✅ fromPriceInfo", fromPriceInfo);
      console.log("✅ toPriceInfo", toPriceInfo);

      //setFromPrice(fromPriceInfo?.price || null);
      ///setToPrice(toPriceInfo?.price || null);

      setFromPrice(fromPriceInfo?.price ?? null);
      setToPrice(toPriceInfo?.price ?? null);
    } catch (err: any) {
      console.error("❌ Error fetching token info or price:", err);
      setError("❌ Failed to fetch prices.");
    }
  };

  useEffect(() => {
    fetchPrices();
  }, [fromToken, toToken]);

  const usd = parseFloat(usdAmount);
  const fromValue = fromPrice ? (usd / fromPrice).toFixed(4) : "-";
  const toValue = toPrice ? (usd / toPrice).toFixed(4) : "-";

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">💱 Token Swap Explorer</h1>

      <label className="block mb-2">USD Amount</label>
      <input
        className="w-full mb-4 p-2 border rounded"
        value={usdAmount}
        onChange={(e) => setUsdAmount(e.target.value)}
        type="number"
        min="0"
      />

      <div className="mb-4">
        <label className="block mb-1">From</label>
        <select
          className="w-full p-2 border rounded"
          value={fromToken.name}
          onChange={(e) =>
            setFromToken(
              tokenOptions.find((t) => t.name === e.target.value) ||
                tokenOptions[0]
            )
          }
        >
          {tokenOptions.map((token) => (
            <option key={token.name} value={token.name}>
              {token.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">To</label>
        <select
          className="w-full p-2 border rounded"
          value={toToken.name}
          onChange={(e) =>
            setToToken(
              tokenOptions.find((t) => t.name === e.target.value) ||
                tokenOptions[1]
            )
          }
        >
          {tokenOptions.map((token) => (
            <option key={token.name} value={token.name}>
              {token.name}
            </option>
          ))}
        </select>
      </div>

      {error ? (
        <p className="text-red-500 mt-2">{error}</p>
      ) : (
        <div className="mt-4">
          <p>
            💰 <strong>{usdAmount} USD</strong> ≈ <strong>{fromValue}</strong>{" "}
            {fromToken.name}
          </p>
          <p>
            🔁 ≈ <strong>{toValue}</strong> {toToken.name}
          </p>
        </div>
      )}
    </div>
  );
}
