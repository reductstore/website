import { Client } from "reduct-js";

// Create a new client with the server URL and an API token
const client = new Client("http://127.0.0.1:8383", { apiToken: "my-token" });

// Remove the token "token-to-remove"
await client.deleteToken("token-to-remove");
