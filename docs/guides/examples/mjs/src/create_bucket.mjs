import {Client, QuotaType} from "reduct-js";
import assert from "node:assert";

// Create a new client with the server URL and an API token
const client = new Client("http://127.0.0.1:8383", {apiToken: "my-api-token"});

// Create a bucket with the name "my-bucket" and a FIFO quota of 1GB
let settings = {
  quotaType: QuotaType.FIFO,
  quotaSize: 1000_000_000n,
}
const bucket = await client.getOrCreateBucket("bucket", settings);
assert(bucket.name === "bucket1");