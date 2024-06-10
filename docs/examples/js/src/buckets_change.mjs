import {Client, QuotaType} from "reduct-js";
import assert from "node:assert";

// Create a new client with the server URL and an API token
const client = new Client("http://127.0.0.1:8383", {apiToken: "my-token"});

// Get an existing bucket
const bucket = await client.getBucket("example-bucket");

// Change the quota size of the bucket to 5GB
let new_settings = {
  quotaSize: 5000_000_000n,
}
await bucket.setSettings(new_settings);

assert((await bucket.getSettings()).quotaSize === 5000_000_000n);