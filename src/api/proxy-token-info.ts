import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { chainId, address } = req.query;

  if (!chainId || !address) {
    return res.status(400).json({ error: "Missing query params" });
  }

  try {
    const apiUrl = `https://api.funkit.xyz/token/info?chainId=${chainId}&address=${address}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Proxy error (info):", error);
    res.status(500).json({ error: "Failed to fetch token info" });
  }
}
