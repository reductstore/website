use std::time::SystemTime;

use bytes::Bytes;
use reduct_rs::{ReductClient, ReductError};
use tokio;

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    // Create a client instance, then get or create a bucket
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();
    let bucket = client.create_bucket("test").exist_ok(true).send().await?;

    // Send a record to the "entry-1" entry with the current timestamp
    let timestamp = SystemTime::now();
    bucket
        .write_record("entry-1")
        .timestamp(timestamp)
        .data(Bytes::from("Hello, World!"))
        .send()
        .await?;

    Ok(())
}
