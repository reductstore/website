import {Client, QuotaType} from "reduct-js";
import assert from "node:assert";

// Create a new client with the server URL and an API token
const client = new Client("http://127.0.0.1:8383", {apiToken: "my-token"});

// Remove the bucket with the name "example-bucket"
const bucket = await client.getBucket("example-bucket");
await bucket.remove();

// Check that the bucket no longer exists
try {
  await client.getBucket("example-bucket");
} catch (e) {
  assert(e.status === 404);
}