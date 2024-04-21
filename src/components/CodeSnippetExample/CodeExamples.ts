export const pythonCodeExample = `
import time
import asyncio
from reduct import Client, Bucket

async def main():
    client = Client('http://127.0.0.1:8383')
    bucket: Bucket = await client.create_bucket("my-bucket", exist_ok=True)

    ts = time.time_ns() / 1000
    await bucket.write("entry-1", b"Hey!!", ts)
    async with bucket.read("entry-1", ts) as record:
        data = await record.read_all()
        print(data)

loop = asyncio.get_event_loop()
loop.run_until_complete(main())
`.trim();

export const JavascriptCodeExample = `
const {Client} = require("reduct-js")
const client = new Client("http://127.0.0.1:8383");

const main = async () => {
  const bucket = await client.getOrCreateBucket("bucket");

  const timestamp = Date.now() * 1000;
  let record = await bucket.beginWrite("entry-1", timestamp);
  await record.write("Hello, World!");

  record = await bucket.beginRead("entry-1", timestamp);
  console.log((await record.read()).toString());
};

main()
    .then(() => console.log("done"))
    .catch((err) => console.error("oops: ", err));
`.trim();

export const CplusPlusCodeExample = `
#include <reduct/client.h>
#include <iostream>

using reduct::IBucket;
using reduct::IClient;

int main() {
  auto client = IClient::Build("http://127.0.0.1:8383");
  auto [bucket, create_err] = client->GetOrCreateBucket("bucket");

  IBucket::Time ts = IBucket::Time::clock::now();
  [[maybe_unused]] auto err = bucket->Write("entry-1", ts, [](auto rec) {
    rec->WriteAll("Hello, World!");
  });

  err = bucket->Read("entry-1", ts, [](auto rec) {
    std::cout << "Read record: "
      << rec.ReadAll().result << std::endl;
    return true;
  });
}
`.trim();

export const rustCodeExample = `
use bytes::Bytes;
use reduct_rs::{ReductError, ReductClient};
use std::str::from_utf8;
use std::time::SystemTime;
use tokio;

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    let timestamp = SystemTime::now();

    let client = ReductClient::builder().url("http://127.0.0.1:8383").build();
    let bucket = client.create_bucket("test").exist_ok(true).send().await?;
    bucket
        .write_record("entry-1")
        .timestamp(timestamp)
        .data(Bytes::from("Hello, World!")).send().await?;

    let record = bucket
        .read_record("entry-1")
        .timestamp(timestamp).send().await?;

    println!(
        "Data: {}",
        from_utf8(&record.bytes().await?.to_vec()).unwrap()
    );

    Ok(())
}
`.trim();

export const CurlCodeExample = `
export API_PATH="http://127.0.0.1:8383/api/v1"
# Create a bucket
curl -d "{\"quota_type\":\"FIFO\", \"quota_size\":10000}" \
  -X POST -a "\${API_PATH}"/b/my_data

# Write some data
export TIME=\`date +%s000000\`
curl -d "some_data" \
  -X POST -a \${API_PATH}/b/my_data/entry_1?ts=\${TIME}

# Read the data by using its timestamp
curl -a \${API_PATH}/b/my_data/entry_1?ts=\${TIME}
`.trim();
