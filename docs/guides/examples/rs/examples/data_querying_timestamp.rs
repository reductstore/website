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
        .data(Bytes::from("Some binary data"))
        .send()
        .await?;

    // Query records in the time range
    let record = bucket
        .read_record("entry-1")
        .timestamp(timestamp).send().await?;

    println!("Timestamp: {:?}", record.timestamp());
    println!("Content Length: {}", record.content_length());
    println!("Content Type: {}", record.content_type());
    println!("Labels: {:?}", record.labels());

    // Read the record data
    let data = record.bytes().await?;
    assert_eq!(data, Bytes::from("Some binary data"));


    Ok(())
}
