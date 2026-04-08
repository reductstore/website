import { Client } from "reduct-js";
import assert from "node:assert/strict";

// Create a client instance, then get or create a bucket
const client = new Client("http://127.0.0.1:8383", { apiToken: "my-token" });
const bucket = await client.getOrCreateBucket("my-bucket");

// Write attachments for an entry
await bucket.writeAttachments("camera/front", {
  schema: { type: "object", version: "1.0" },
  calibration: { fx: 1260.1, fy: 1261.2 },
});

// Read attachments
let attachments = await bucket.readAttachments("camera/front");
assert.equal(attachments.schema.type, "object");

// Remove one attachment by key
await bucket.removeAttachments("camera/front", ["calibration"]);
attachments = await bucket.readAttachments("camera/front");
assert.equal(attachments.calibration, undefined);

// Remove all attachments
await bucket.removeAttachments("camera/front");
attachments = await bucket.readAttachments("camera/front");
assert.deepEqual(attachments, {});
