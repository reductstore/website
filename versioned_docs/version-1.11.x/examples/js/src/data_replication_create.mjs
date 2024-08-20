import {Client} from "reduct-js";

// Create a client instance, then create a bucket as source bucket
const client = new Client("http://127.0.0.1:8383", {apiToken: "my-token"});
await client.getOrCreateBucket("my-bucket");

// Set up a replication to a destination bucket for records
// from the "js-example" entry and with labels "anomaly=1"
const settings = {
    srcBucket: "my-bucket",
    dstBucket: "demo",
    dstHost: "https://play.reduct.store",
    dstToken: "reductstore",
    entries: ["js-entry"],
    include: {"anomaly": "1"}
}
await client.createReplication("my-replication", settings);