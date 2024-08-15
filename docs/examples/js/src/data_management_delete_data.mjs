import {Client} from "reduct-js";
import assert from "node:assert";

// Create a new client with the server URL and an API token
const client = new Client("http://127.0.0.1:8383", {apiToken: "my-token"});

// Get bucket to remove
const bucket = await client.getBucket("bucket-to-remove");

// Delete only entry with name "example-entry"
await bucket.removeEntry("example-entry");

// Remove entire bucket
await bucket.remove();
