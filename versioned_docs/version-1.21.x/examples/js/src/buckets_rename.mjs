import { Client } from "reduct-js";
import assert from "node:assert";

// Create a new client with the server URL and an API token
const client = new Client("http://127.0.0.1:8383", { apiToken: "my-token" });

// Rename the bucket 'bucket-to-rename' to 'bucket-renamed'
const bucket = await client.getBucket("bucket-to-rename");
await bucket.rename("bucket-renamed");

// Check that the bucket was renamed
assert(await client.getBucket("bucket-renamed"));
try {
  await client.getBucket("bucket-to-rename");
} catch (e) {
  assert(e.status === 404);
}
