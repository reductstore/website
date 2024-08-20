import {Client} from "reduct-js";
import assert from "node:assert";

// Create a new client with the server URL and an API token
const client = new Client("http://127.0.0.1:8383", {apiToken: "my-token"});

// Remove the bucket with the name "bucket-to-remove"
const bucket = await client.getBucket("bucket-to-remove");
await bucket.remove();

// Check that the bucket no longer exists
try {
  await client.getBucket("bucket-to-remove");
} catch (e) {
  assert(e.status === 404);
}