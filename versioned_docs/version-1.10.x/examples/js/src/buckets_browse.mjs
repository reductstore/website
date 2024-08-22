import { Client, QuotaType } from "reduct-js";
import assert from "node:assert";

// Create a new client with the server URL and an API token
const client = new Client("http://127.0.0.1:8383", { apiToken: "my-token" });

// Browse the list of buckets and print their information
for (const info of await client.getBucketList()) {
  console.log(`Bucket: ${info.name}`);
  console.log(`Size: ${info.size}`);
  console.log(`Entry Count: ${info.entryCount}`);
  console.log(`Oldest Record: ${info.oldestRecord}`);
  console.log(`Latest Record: ${info.latestRecord}`);
}

// Get information about a specific bucket
const bucket = await client.getBucket("example-bucket");
const settings = await bucket.getSettings();
console.log(`Settings: ${settings}`);
for (const info of await bucket.getEntryList()) {
  console.log(`Entry: ${info.name}`);
  console.log(`Size: ${info.size}`);
  console.log(`Oldest Record: ${info.oldestRecord}`);
  console.log(`Latest Record: ${info.latestRecord}`);
}
