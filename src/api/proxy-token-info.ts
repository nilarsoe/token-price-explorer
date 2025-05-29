export default async function handler(req, res) {
  const { chainId, address } = req.query;

  try {
    const response = await fetch(
      `https://api.fun.xyz/v1/asset/erc20/info/${chainId}/${address}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Proxy error (token info):", error);
    res.status(500).json({ error: "Failed to fetch token info" });
  }
}
