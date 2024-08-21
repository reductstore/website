use bytes::Bytes;
use reduct_rs::{RecordBuilder, ReductClient, ReductError};
use tokio;

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    // Create a client instance, then get or create a bucket
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();
    let bucket = client.create_bucket("test").exist_ok(true).send().await?;

    // Prepare a batch of records
    let record_1 = RecordBuilder::new()
        .timestamp_us(1_000_000)
        .data("Records #1")
        .build();

    let record_2 = RecordBuilder::new()
        .timestamp_us(2_000_000)
        .data("Records #2")
        .build();

    // Send the batch of records to the "rs-example" entry
    let errors = bucket
        .write_batch("rs-example")
        .add_records(vec![record_1, record_2])
        .send()
        .await?;

    // Check if there are any errors and return first one
    for (_timestamp, error) in errors {
        return Err(error);
    }

    Ok(())
}
