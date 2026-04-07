// reduct-js is published as CommonJS; in Node ESM examples we import the default export.
import reductJs from "reduct-js";

const { Client } = reductJs;

// Update replication mode without changing other settings
const client = new Client("http://127.0.0.1:8383", { apiToken: "my-token" });

// Pause to queue transactions without sending them
await client.setReplicationMode("my_replication", "paused");

// Disable to ignore new transactions
await client.setReplicationMode("my_replication", "disabled");

// Re-enable to resume sending queued data
await client.setReplicationMode("my_replication", "enabled");
