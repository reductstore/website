import {Client} from "reduct-js";
import assert from "node:assert";

// Create a client instance, then get or create a bucket
const client = new Client("http://127.0.0.1:8383", {apiToken: "my-token"});
const bucket = await client.getOrCreateBucket("bucket");

// Send some records to the "entry" entry with labels
const timestamp = BigInt(Date.now()) * 1000n;
let record = await bucket.beginWrite("entry-1", {
    ts: timestamp,
    labels: {"key1": "value1", "key2": "value2"},
});
await record.write("Some binary data");

record = await bucket.beginWrite("entry-1", {
    ts: timestamp + 1000_000n,
    labels: {"key1": "value1", "key2": "value2"},
});
await record.write("Some more binary data");

// Update labels of a record: remove "key2" and update "key1"
await bucket.update("entry-1", timestamp, {"key1": "new-value", "key2": ""});
record = await bucket.beginRead("entry-1", timestamp, true);    // only labels
assert(record.labels["key1"] === "new-value");
assert(record.labels["key2"] === undefined);


// Update labels in a batch
const batch = await bucket.beginUpdateBatch("entry-1");
batch.addOnlyLabels(timestamp, {label1: "value1", label2: ""});
batch.addOnlyLabels(timestamp + 1000_000n, {label3: "value3"});
const errors = await batch.write();
assert(errors.size === 0);
