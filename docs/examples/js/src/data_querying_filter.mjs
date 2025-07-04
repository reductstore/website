import { Client } from "reduct-js";

// Create a client instance, then get or create a bucket
const client = new Client("http://127.0.0.1:8383", { apiToken: "my-token" });
const bucket = await client.getBucket("example-bucket");

// Query 10 photos from "imdb" entry which taken after 2006 with the face score less than 4
for await (const record of bucket.query("imdb", undefined, undefined, {
  when: {
    "&photo_taken": { $gt: 2006 },
    "&face_score": { $lt: 4 },
    $limit: 10,
  },
})) {
  console.log("Name", record.labels.name);
  console.log("Photo taken", record.labels.photo_taken);
  console.log("Face score", record.labels.face_score);
  await record.readAsString();
}
