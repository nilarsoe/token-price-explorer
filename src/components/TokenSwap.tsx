import { useEffect, useState } from "react";
import { fetchTokenInfo, fetchTokenPrice } from "../api/funkitApi";

const tokenOptions = [
  { symbol: "USDC", chainId: "1" },
  { symbol: "USDT", chainId: "137" },
  { symbol: "ETH", chainId: "8453" },
  { symbol: "WBTC", chainId: "1" },
];

export default function TokenSwap() {
  const [fromToken, setFromToken] = useState(tokenOptions[0]);
  const [toToken, setToToken] = useState(tokenOptions[1]);
  const [usdAmount, setUsdAmount] = useState<number>(100);
  const [fromPriceInfo, setFromPriceInfo] = useState<any | null>(null);
  const [toPriceInfo, setToPriceInfo] = useState<any | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      const fromTokenInfo = await fetchTokenInfo(
        fromToken.chainId,
        fromToken.symbol
      );
      const toTokenInfo = await fetchTokenInfo(toToken.chainId, toToken.symbol);

      if (fromTokenInfo?.address && toTokenInfo?.address) {
        const fromPrice = await fetchTokenPrice(
          fromToken.chainId,
          fromTokenInfo.address
        );
        const toPrice = await fetchTokenPrice(
          toToken.chainId,
          toTokenInfo.address
        );

        setFromPriceInfo(fromPrice);
        setToPriceInfo(toPrice);
      } else {
        setFromPriceInfo(null);
        setToPriceInfo(null);
      }
    };

    fetchPrices();
  }, [fromToken, toToken]);

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsdAmount(parseFloat(e.target.value));
  };

  const fromValue =
    fromPriceInfo?.price != null
      ? (usdAmount / fromPriceInfo.price).toFixed(4)
      : "0.0000";

  const toValue =
    toPriceInfo?.price != null
      ? (usdAmount / toPriceInfo.price).toFixed(4)
      : "0.0000";

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Token Swap Explorer</h1>

      <div className="mb-4">
        <label className="block mb-1">From Token:</label>
        <select
          value={fromToken.symbol}
          onChange={(e) =>
            setFromToken(
              tokenOptions.find((t) => t.symbol === e.target.value) || fromToken
            )
          }
          className="w-full p-2 border rounded"
        >
          {tokenOptions.map((token) => (
            <option key={token.symbol} value={token.symbol}>
              {token.symbol}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">To Token:</label>
        <select
          value={toToken.symbol}
          onChange={(e) =>
            setToToken(
              tokenOptions.find((t) => t.symbol === e.target.value) || toToken
            )
          }
          className="w-full p-2 border rounded"
        >
          {tokenOptions.map((token) => (
            <option key={token.symbol} value={token.symbol}>
              {token.symbol}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">USD Amount:</label>
        <input
          type="number"
          value={usdAmount}
          onChange={handleUsdChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="bg-gray-100 p-4 rounded">
        <p>
          {usdAmount} USD ≈{" "}
          <strong>
            {fromValue} {fromToken.symbol}
          </strong>
        </p>
        <p>
          {usdAmount} USD ≈{" "}
          <strong>
            {toValue} {toToken.symbol}
          </strong>
        </p>
      </div>
    </div>
  );
}
