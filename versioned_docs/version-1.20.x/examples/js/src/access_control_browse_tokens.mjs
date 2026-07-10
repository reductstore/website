import { Client } from "reduct-js";

// Create a new client with the server URL and an API token
const client = new Client("http://127.0.0.1:8383", { apiToken: "my-token" });

// Browse all tokens and print their information
const tokenList = await client.getTokenList();
for (const token of tokenList) {
  console.log(`Token: ${token.name}`);
  console.log(`Created: ${token.createdAt}`);
  console.log(`Provisioned: ${token.isProvisioned}`);

  // Get detailed information about a specific token
  const tokenInfo = await client.getToken(token.name);
  console.log(`Permissions: ${tokenInfo.permissions}`);
}
