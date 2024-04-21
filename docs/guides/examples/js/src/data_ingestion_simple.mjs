const {Client} = require("reduct-js")

// Create a client instance, then get or create a bucket
const client = new Client("http://127.0.0.1:8383", { apiToken: "my-token"});
const bucket = await client.getOrCreateBucket("bucket");

// Send a record to the "entry-1" entry with the current timestamp
const timestamp = Date.now() * 1000;
let record = await bucket.beginWrite("entry-1", timestamp);
await record.write("Some binary data");
