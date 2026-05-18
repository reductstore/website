import { Client, LifecycleType } from "reduct-js";

const client = new Client("http://127.0.0.1:8383", { apiToken: "my-token" });
await client.getOrCreateBucket("my-bucket");

const settings = {
  lifecycleType: LifecycleType.DELETE,
  bucket: "my-bucket",
  entries: ["js-example"],
  maxAge: "30d",
  interval: "1h",
  when: { "&anomaly": { $eq: 1 } },
};

await client.createLifecycle("my-lifecycle", settings);
