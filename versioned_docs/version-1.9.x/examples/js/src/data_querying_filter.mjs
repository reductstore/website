import { Client } from "reduct-js";
import assert from "node:assert";

// Create a client instance, then get or create a bucket
const client = new Client("http://127.0.0.1:8383", { apiToken: "my-token" });
const bucket = await client.getBucket("example-bucket");

// Query 10 photos from "imdb" entry which taken in 2006 but don't contain "Rowan Atkinson"
for await (const record of bucket.query("imdb", undefined, undefined, {
  limit: 10,
  include: { photo_taken: "2006" },
  exclude: { name: "b'Rowan Atkinson'" },
})) {
  console.log("Name", record.labels.name);
  console.log("Phot taken", record.labels.photo_taken);
  console.log("Gender", record.labels.gender);
  await record.readAsString();
}
