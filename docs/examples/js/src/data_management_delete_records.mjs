import { Client } from "reduct-js";
import assert from "node:assert";

// Create a client instance, then get or create a bucket
const client = new Client("http://127.0.0.1:8383", { apiToken: "my-token" });
const bucket = await client.getOrCreateBucket("bucket");

// Send some records to the "entry-1" entry
const timestamp = BigInt(Date.now()) * 1000n;
let record = await bucket.beginWrite("entry-1",  timestamp);
await record.write("Some binary data");

record = await bucket.beginWrite("entry-1",  timestamp + 1000_000n);
await record.write("Some more binary data");

// Delete a sole record
await bucket.removeRecord("entry-1", timestamp);

// Delete a batch of records
const batch = await bucket.beginRemoveBatch("entry-1");
batch.addOnlyTimestamp(timestamp);  // already deleted, so this error will be in the errors map
batch.addOnlyTimestamp(timestamp + 1000_000n);
const errors = await batch.write();

assert(errors.size === 1);
console.log(errors);
