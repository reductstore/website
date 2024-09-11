use std::time::{Duration, SystemTime};

use bytes::Bytes;
use reduct_rs::{ErrorCode, RecordBuilder, ReductClient, ReductError};
use tokio;

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    // Create a client instance, then get or create a bucket
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();
    let bucket = client.create_bucket("test").exist_ok(true).send().await?;

    // Send some records to the "rs-example" entry
    let timestamp = SystemTime::now();
    bucket
        .write_record("rs-example")
        .timestamp(timestamp)
        .data(Bytes::from("Some binary data"))
        .send()
        .await?;

    bucket
        .write_record("rs-example")
        .timestamp(timestamp  + Duration::from_secs(1))
        .data(Bytes::from("Some more binary data"))
        .send()
        .await?;

    //  Delete a sole record
    bucket
        .remove_record("rs-example")
        .timestamp(timestamp)
        .send()
        .await?;

    //  Delete a batch of records
    let batch = bucket.remove_batch("rs-example");
    let errors = batch
        .add_timestamp(timestamp)   // was already deleted, so this error will be in the errors map
        .add_timestamp(timestamp + Duration::from_secs(1)).send().await?;

    assert_eq!(errors.len(), 1);
    assert_eq!(errors.values().next().unwrap().status, ErrorCode::NotFound);
    Ok(())
}
