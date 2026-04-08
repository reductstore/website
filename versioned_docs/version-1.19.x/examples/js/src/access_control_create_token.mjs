import { Client } from "reduct-js";

// Create a new client with the server URL and an API token
const client = new Client("http://127.0.0.1:8383", { apiToken: "my-token" });

// Create a token with read/write access, a 1 hour inactivity TTL,
// and an IP allowlist for local access.
const token = await client.createToken("new-token", {
  permissions: {
    fullAccess: false,
    read: ["example-bucket"],
    write: ["example-bucket"],
  },
  ttl: 3600,
  ipAllowlist: ["127.0.0.1", "::1"],
});

console.log(`Generated token: ${token}`);
