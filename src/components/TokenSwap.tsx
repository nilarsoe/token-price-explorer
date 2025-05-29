import { useEffect, useState } from "react";
import {
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo,
} from "@funkit/api-base";
import { ArrowLeftRight } from "lucide-react"; // install with `npm i lucide-react`

const API_KEY = "Z9SZaOwpmE40KX61mUKWm5hrpGh7WHVkaTvQJpQk";

const tokens = [
  { symbol: "USDC", chainId: "1" },
  { symbol: "USDT", chainId: "137" },
  { symbol: "ETH", chainId: "8453" },
  { symbol: "WBTC", chainId: "1" },
];

export default function TokenSwap() {
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [usdAmount, setUsdAmount] = useState(100);
  const [fromPrice, setFromPrice] = useState<number | null>(null);
  const [toPrice, setToPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const [fromTokenInfo, toTokenInfo] = await Promise.all([
          getAssetErc20ByChainAndSymbol({
            chainId: fromToken.chainId,
            symbol: fromToken.symbol,
            apiKey: API_KEY,
          }),
          getAssetErc20ByChainAndSymbol({
            chainId: toToken.chainId,
            symbol: toToken.symbol,
            apiKey: API_KEY,
          }),
        ]);

        const [fromPriceData, toPriceData] = await Promise.all([
          getAssetPriceInfo({
            chainId: fromToken.chainId,
            assetTokenAddress: fromTokenInfo.address,
            apiKey: API_KEY,
          }),
          getAssetPriceInfo({
            chainId: toToken.chainId,
            assetTokenAddress: toTokenInfo.address,
            apiKey: API_KEY,
          }),
        ]);

        setFromPrice(fromPriceData.unitPrice);
        setToPrice(toPriceData.unitPrice);
      } catch (error) {
        console.error("Error fetching prices:", error);
        setFromPrice(null);
        setToPrice(null);
      }
    };

    fetchPrices();
  }, [fromToken, toToken]);

  const handleSwap = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const formatTokenAmount = (amount: number) => {
    if (amount >= 0.0001) return amount.toFixed(4);
    if (amount > 0) return amount.toExponential(2);
    return "0.0000";
  };

  const fromAmount = fromPrice
    ? formatTokenAmount(usdAmount / fromPrice)
    : "0.0000";
  const toAmount = toPrice ? formatTokenAmount(usdAmount / toPrice) : "0.0000";

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold text-center">Token Swap Explorer</h1>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          From Token:
        </label>
        <select
          value={fromToken.symbol}
          onChange={(e) =>
            setFromToken(tokens.find((t) => t.symbol === e.target.value)!)
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          {tokens.map((token) => (
            <option key={token.symbol} value={token.symbol}>
              {token.symbol}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSwap}
          className="text-gray-600 hover:text-black p-2"
          aria-label="Swap tokens"
        >
          <ArrowLeftRight size={24} />
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          To Token:
        </label>
        <select
          value={toToken.symbol}
          onChange={(e) =>
            setToToken(tokens.find((t) => t.symbol === e.target.value)!)
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          {tokens.map((token) => (
            <option key={token.symbol} value={token.symbol}>
              {token.symbol}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          USD Amount:
        </label>
        <input
          type="number"
          value={usdAmount}
          onChange={(e) => setUsdAmount(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div className="bg-gray-100 rounded-lg p-4 text-center space-y-2">
        <p>
          <strong>{usdAmount} USD</strong> ≈{" "}
          <strong>
            {fromAmount} {fromToken.symbol}
          </strong>
        </p>
        <p>
          <strong>{usdAmount} USD</strong> ≈{" "}
          <strong>
            {toAmount} {toToken.symbol}
          </strong>
        </p>
      </div>
    </div>
  );
}
