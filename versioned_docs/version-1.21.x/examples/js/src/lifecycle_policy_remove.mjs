import { Client } from "reduct-js";

const client = new Client("http://127.0.0.1:8383", { apiToken: "my-token" });
await client.deleteLifecycle("lifecycle-to-remove");
