import {Client} from "reduct-js";

// Create a client instance
const client = new Client("http://127.0.0.1:8383", {apiToken: "my-token"});

// Remove the `example-replication` replication
await client.deleteReplication("example-replication");