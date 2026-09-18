import { Client } from "reduct-js";
import assert from "node:assert";

// Create a new client with the server URL and an API token
const client = new Client("http://127.0.0.1:8383", { apiToken: "my-token" });

// Get the bucket 'example-bucket'
const bucket = await client.getBucket("example-bucket");

// Rename the entry 'entry_1' to 'entry_2'
await bucket.renameEntry("entry_1", "entry_2");

// Check that the entry was renamed
const entries = (await bucket.getEntryList()).map((entry) => entry.name);
assert(entries.includes("entry_2"));
assert(!entries.includes("entry_1"));
