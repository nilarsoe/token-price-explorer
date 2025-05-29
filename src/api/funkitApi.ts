// src/api/funkitApi.ts
import {
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo,
} from "@funkit/api-base";

const API_KEY = "Z9SZaOwpmE40KX61mUKWm5hrpGh7WHVkaTvQJpQk";

// Fetch token information by chain and symbol
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

// Fetch real token price using @funkit/api-base
export const fetchTokenPrice = async (
  chainId: string,
  tokenAddress: string
) => {
  try {
    const priceInfo = await getAssetPriceInfo({
      chainId,
      assetTokenAddress: tokenAddress,
      apiKey: API_KEY,
    });
    console.log(
      `✅ Price Info for ${tokenAddress} on chain ${chainId}:`,
      priceInfo
    );
    return priceInfo;
  } catch (error) {
    console.error(
      `❌ Error fetching price for ${tokenAddress} on chain ${chainId}:`,
      error
    );
    return null;
  }
};
