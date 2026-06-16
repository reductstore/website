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

    // Prepare a batch of records for different entries
    let record_1 = RecordBuilder::new()
        .entry("sensor-1")
        .timestamp_us(1_000_000)
        .data("Temperature: 20.5")
        .content_type("text/plain")
        .add_label("unit", "C")
        .build();

    let record_2 = RecordBuilder::new()
        .entry("sensor-1")
        .timestamp_us(2_000_000)
        .data("Temperature: 20.6")
        .content_type("text/plain")
        .add_label("unit", "C")
        .build();

    let record_3 = RecordBuilder::new()
        .entry("camera-1")
        .timestamp_us(3_000_000)
        .data("Frame #1")
        .content_type("text/plain")
        .build();

    // Write records from multiple entries in one request
    let errors = bucket
        .write_record_batch()
        .add_records(vec![record_1, record_2])
        .add_record(record_3)
        .send()
        .await?;

    // Check if there are any errors and return first one
    for ((_entry, _timestamp), error) in errors {
        return Err(error);
    }

    Ok(())
}
