import { Client } from "reduct-js";

const client = new Client("http://127.0.0.1:8383", { apiToken: "my-token" });

for (const lifecycle of await client.getLifecycleList()) {
  console.log("Lifecycle:", lifecycle.name);
  console.log("Mode:", lifecycle.mode);
  console.log("Running:", lifecycle.isRunning);
  console.log("Provisioned:", lifecycle.isProvisioned);
}

const details = await client.getLifecycle("my-lifecycle");
console.log("Lifecycle:", details.info.name);
console.log("Settings:", details.settings);
