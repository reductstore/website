import { Client } from "reduct-js";
import assert from "node:assert";

// Create a client instance, then get or create a bucket
const client = new Client("http://127.0.0.1:8383", { apiToken: "my-token" });
const bucket = await client.getOrCreateBucket("bucket");

// Send a record to the "js-example" entry with the current timestamp in microseconds
const timestamp = BigInt(Date.now()) * 1000n;
let record = await bucket.beginWrite("js-example", timestamp);
await record.write("Some binary data");

// Query records in the "js-example" entry of the bucket
for await (let record of bucket.query(
  "js-example",
  timestamp,
  timestamp + 1000n,
)) {
  // Print meta information
  console.log(`Timestamp: ${record.time}`);
  console.log(`Content Length: ${record.size}`);
  console.log(`Content Type: ${record.contentType}`);
  console.log(`Labels: ${JSON.stringify(record.labels)}`);

  // Read the record content
  let content = await record.read();
  assert(content.toString() === "Some binary data");
}
