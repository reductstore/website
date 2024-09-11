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

    //  Delete all records within a time range
    let removed_records = bucket
        .remove_query("rs-example")
        .start(timestamp)
        .stop(timestamp + Duration::from_secs(1))
        .send()
        .await?;
    assert_eq!(removed_records, 2);

    // You can also delete all records with a specific label
    bucket
        .remove_query("rs-example")
        .add_include("label1", "value1")
        .send()
        .await?;

    // Or each N-th record
    bucket
        .remove_query("rs-example")
        .each_n(2)
        .send()
        .await?;
    Ok(())
}
