import {Client, QuotaType, ReplicationSettings} from "reduct-js";
import assert from "node:assert";

// Create a client instance
const client = new Client("http://127.0.0.1:8383", {apiToken: "my-token"});

// List all replications
for (const replication of await client.getReplicationList()) {
    console.log("Replication: ", replication.name);
    console.log("Active: ", replication.isActive);
    console.log("Pending records: ", replication.pendingRecords);
    console.log("Provisioned: ", replication.isActive);
}

// Get all details of a replication
const replication = await client.getReplication("example-replication");
console.log("Replication: ", replication.info.name);
console.log("Settings: ", replication.settings);
console.log("Failed records (last hour): ", replication.diagnostics.hourly.errored)
console.log("Successful records (last hour): ", replication.diagnostics.hourly.ok)
console.log("Errors (last hour): ", replication.diagnostics.hourly.errors)