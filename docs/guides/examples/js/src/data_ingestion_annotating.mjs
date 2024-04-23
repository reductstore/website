import {Client} from "reduct-js";

// Create a client instance, then get or create a bucket
const client = new Client("http://127.0.0.1:8383", {apiToken: "my-token"});
const bucket = await client.getOrCreateBucket("bucket");

// Send a record  with labels and content type
const timestamp = BigInt(Date.now()) * 1000n;
let record = await bucket.beginWrite("entry-1", {
    timestamp: timestamp,
    contentType: "plain/text",
    labels: {
        "name": "example",
        "type": "simple"
    }
});
await record.write("Some binary data");
