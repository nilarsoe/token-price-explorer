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

export async function fetchTokenPrice(chainId: string, address: string) {
  try {
    const res = await fetch(`/api/proxy?chainId=${chainId}&address=${address}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(
      `❌ Error fetching price for token ${address} on chain ${chainId}:`,
      error
    );
    return null;
  }
}
