import {
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo,
} from "@funkit/api-base";

const API_KEY = "Z9SZaOwpmE40KX61mUKWm5hrpGh7WHVkaTvQJpQk";

export async function fetchTokenInfo(chainId: string, symbol: string) {
  try {
    const tokenInfo = await getAssetErc20ByChainAndSymbol({
      chainId,
      symbol,
      apiKey: API_KEY,
    });
    console.log("✅ Token Info:", tokenInfo);
    return tokenInfo;
  } catch (error) {
    console.error("❌ Error fetching token info:", error);
    return null;
  }
}

export async function fetchTokenPrice(chainId: string, address: string) {
  try {
    const priceInfo = await getAssetPriceInfo({
      chainId,
      assetTokenAddress: address,
      apiKey: API_KEY,
    });
    console.log("✅ Price Info:", priceInfo);
    return priceInfo;
  } catch (err) {
    console.error("❌ Error fetching token price:", err);
    return null;
  }
}
