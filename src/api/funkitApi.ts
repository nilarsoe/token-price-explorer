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
  address: string
): Promise<{ price: number } | null> => {
  try {
    const priceInfo = await getAssetPriceInfo({
      chainId,
      address,
      apiKey: API_KEY,
    });
    console.log(
      `✅ Price Info for token ${address} on chain ${chainId}:`,
      priceInfo
    );
    return { price: priceInfo.price };
  } catch (error) {
    console.error(
      `❌ Error fetching price for token ${address} on chain ${chainId}:`,
      error
    );
    return null;
  }
};
