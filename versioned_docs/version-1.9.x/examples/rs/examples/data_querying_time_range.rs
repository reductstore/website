use std::time::{Duration, SystemTime};

use bytes::Bytes;
use futures::StreamExt;
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

    // Send a record to the "rs-example" entry with the current timestamp
    let timestamp = SystemTime::now();
    bucket
        .write_record("rs-example")
        .timestamp(timestamp)
        .data(Bytes::from("Some binary data"))
        .send()
        .await?;

    // Query records in the time range
    let query = bucket
        .query("rs-example")
        .start(timestamp)
        .stop(timestamp + Duration::from_secs(1))
        .send()
        .await?;

    tokio::pin!(query);

    while let Some(record) = query.next().await {
        let record = record?;
        println!("Timestamp: {:?}", record.timestamp());
        println!("Content Length: {}", record.content_length());
        println!("Content Type: {}", record.content_type());
        println!("Labels: {:?}", record.labels());

        // Read the record data
        let data = record.bytes().await?;
        assert_eq!(data, Bytes::from("Some binary data"));
    }

    Ok(())
}
