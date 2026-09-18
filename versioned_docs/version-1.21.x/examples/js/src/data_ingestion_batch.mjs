import { Client } from "reduct-js";

// Create a client instance, then get or create a bucket
const client = new Client("http://127.0.0.1:8383", { apiToken: "my-token" });
const bucket = await client.getOrCreateBucket("my-bucket");

// Prepare a batch of records for different entries
const batch = bucket.beginWriteRecordBatch();
const timestamp = BigInt(Date.now()) * 1000n; // Current timestamp in microseconds
batch.add("sensor-1", timestamp, "Temperature: 20.5", "text/plain", {
  unit: "C",
});
batch.add("sensor-1", timestamp + 1000000n, "Temperature: 20.6", "text/plain", {
  unit: "C",
});
batch.add("camera-1", timestamp + 2000000n, "Frame #1", "text/plain");

// Write records from multiple entries in one request
const errors = await batch.send();

// Check for errors and throw first one
for (const entryErrors of errors.values()) {
  for (const [_timestamp, err] of entryErrors.entries()) {
    throw err;
  }
}
