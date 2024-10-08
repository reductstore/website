import { Client } from "reduct-js";
import assert from "node:assert";

// Create a client instance, then get or create a bucket
const client = new Client("http://127.0.0.1:8383", { apiToken: "my-token" });
const bucket = await client.getOrCreateBucket("bucket");

// Send some records to the "entry-1" entry
const timestamp = BigInt(Date.now()) * 1000n;
let record = await bucket.beginWrite("entry-1", timestamp);
await record.write("Some binary data");

record = await bucket.beginWrite("entry-1", timestamp + 1000_000n);
await record.write("Some more binary data");

// Delete all records withing a time range
const removedRecords = await bucket.removeQuery(
  "entry-1",
  timestamp,
  timestamp + 2000_000n,
);
assert(removedRecords === 2);

// You can also delete all records with a specific label
await bucket.removeQuery("entry-1", undefined, undefined, {
  include: { label1: "value1" },
});

// Or each N-th record
await bucket.removeQuery("entry-1", undefined, undefined, { eachN: 2 });
