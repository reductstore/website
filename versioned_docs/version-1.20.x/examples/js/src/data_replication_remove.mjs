import { Client } from "reduct-js";

// Create a client instance
const client = new Client("http://127.0.0.1:8383", { apiToken: "my-token" });

// Remove the `repl-to-remove` replication
await client.deleteReplication("repl-to-remove");
