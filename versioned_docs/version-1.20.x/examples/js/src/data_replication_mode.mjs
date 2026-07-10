import { Client, ReplicationMode } from "reduct-js";

// Update replication mode without changing other settings
const client = new Client("http://127.0.0.1:8383", { apiToken: "my-token" });

// Pause to queue transactions without sending them
await client.setReplicationMode("my_replication", ReplicationMode.PAUSED);

// Disable to ignore new transactions
await client.setReplicationMode("my_replication", ReplicationMode.DISABLED);

// Re-enable to resume sending queued data
await client.setReplicationMode("my_replication", ReplicationMode.ENABLED);
