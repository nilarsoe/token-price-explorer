// src/api/funkitApi.ts

export async function fetchTokenInfo(chainId: string, address: string) {
  try {
    const res = await fetch(
      `/api/proxy-token-info?chainId=${chainId}&address=${address}`
    );
    return await res.json();
  } catch (error) {
    console.error("❌ Error fetching token info:", error);

    return null;
  }
}

export async function fetchTokenPrice(chainId: string, address: string) {
  try {
    const res = await fetch(
      `/api/proxy-token-price?chainId=${chainId}&address=${address}`
    );
    return await res.json();
  } catch (error) {
    console.error("❌ Error fetching token info:", error);

    return null;
  }
}
