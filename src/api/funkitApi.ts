// src/api/funkitApi.ts
import {
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo,
} from "@funkit/api-base";

const API_KEY = "Z9SZaOwpmE40KX61mUKWm5hrpGh7WHVkaTvQJpQk";

export const fetchTokenInfo = async (chainId: string, symbol: string) => {
  try {
    const token = await getAssetErc20ByChainAndSymbol({
      chainId,
      symbol,
      apiKey: API_KEY,
    });
    if (!token || !token.address) {
      throw new Error(
        `Token not found or missing address: ${symbol} on chain ${chainId}`
      );
    }
    console.log(`✅ Token Info for ${symbol}:`, token);
    return token;
  } catch (error) {
    console.error(
      `❌ Error fetching token info for ${symbol} on chain ${chainId}:`,
      error
    );
    return null;
  }
};

export const fetchTokenPrice = async (
  chainId: string,
  tokenAddress: string
) => {
  console.log(`✅ MOCK Price Info for ${tokenAddress} on chain ${chainId}`);
  return { price: 2000 }; // simulate ETH price
};
