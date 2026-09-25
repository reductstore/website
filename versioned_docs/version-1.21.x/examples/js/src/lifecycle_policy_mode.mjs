import { Client, LifecycleMode } from "reduct-js";

const client = new Client("http://127.0.0.1:8383", { apiToken: "my-token" });

await client.setLifecycleMode("my-lifecycle", LifecycleMode.DRY_RUN);
await client.setLifecycleMode("my-lifecycle", LifecycleMode.DISABLED);
await client.setLifecycleMode("my-lifecycle", LifecycleMode.ENABLED);
