import { Client } from "reduct-js";

// Create a client instance, then get or create a bucket
const client = new Client("http://127.0.0.1:8383", { apiToken: "my-token" });
const bucket = await client.getOrCreateBucket("bucket");

// Prepare a batch of records
const batch = await bucket.beginWriteBatch("js-example");
const timestamp = BigInt(Date.now()) * 1000n; // Current timestamp in microseconds
batch.add(timestamp, "Records #1");
batch.add(timestamp + 1000000n, "Records #2");

// Send the batch
const errors = await batch.write();

// Check for errors and throw first one
for (const [_timestamp, err] of errors.entries()) {
  throw err;
}
