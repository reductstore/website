use futures_util::stream::StreamExt;
use reduct_rs::{condition, QuotaType, ReductClient, ReductError};
use std::pin::pin;
use std::time::{Duration, SystemTime};
use tokio;

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    // 1. Create a ReductStore client
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();

    // 2. Get or create a bucket with 1Gb quota
    let bucket = client
        .create_bucket("my-bucket")
        .quota_type(QuotaType::FIFO)
        .quota_size(1_000_000_000)
        .exist_ok(true)
        .send()
        .await?;

    // 3. Write some data with timestamps and labels to the 'entry-1' entry
    let start = SystemTime::now();
    bucket
        .write_record("sensor-1")
        .data("<Blob data>")
        .timestamp(start)
        .add_label("score", 10)
        .send()
        .await?;

    bucket
        .write_record("sensor-1")
        .data("<Blob data>")
        .timestamp(start + Duration::from_secs(1))
        .add_label("score", 20)
        .send()
        .await?;

    // 4. Query the data by time range and condition
    let query = bucket
        .query("sensor-1")
        .start(start)
        .stop(start + Duration::from_secs(2))
        .when(condition!({"&score": {"$gt": 15}}))
        .send()
        .await?;

    let mut query = pin!(query);
    while let Some(record) = query.next().await {
        let record = record?;
        println!("Record timestamp: {:?}", record.timestamp());
        println!("Record size: {}", record.content_length());
        println!("{:?}", record.bytes().await?);
    }

    // 5. Exit
    Ok(())
}
