use std::time::{Duration, SystemTime};

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

    // Send some records to the "rs-example" entry with labels "key1=value1" and "key2=value2
    let timestamp = SystemTime::now();
    bucket
        .write_record("rs-example")
        .timestamp(timestamp)
        .add_label("key1", "value1")
        .add_label("key2", "value2")
        .data(Bytes::from("Some binary data"))
        .send()
        .await?;

    bucket
        .write_record("rs-example")
        .timestamp(timestamp + Duration::from_secs(1))
        .add_label("key1", "value1")
        .add_label("key2", "value2")
        .data(Bytes::from("Some more binary data"))
        .send()
        .await?;

    // Update labels of a record: remove "key2" and update "key1"
    bucket
        .update_record("rs-example")
        .timestamp(timestamp)
        .remove_label("key2")
        .update_label("key1", "value3")
        .send()
        .await?;
    let record = bucket
        .read_record("rs-example")
        .timestamp(timestamp)
        .send()
        .await?;
    assert_eq!(record.labels().get("key1"), Some(&"value3".to_string()));
    assert_eq!(record.labels().get("key2"), None);

    // Update labels in a batch
    let record1 = RecordBuilder::new()
        .timestamp(timestamp)
        .add_label("key1", "value1")
        .add_label("key2", "") // Remove label "key2"
        .build();

    let record2 = RecordBuilder::new()
        .timestamp(timestamp + Duration::from_secs(1))
        .add_label("key1", "value1")
        .add_label("key2", "") // Remove label "key2"
        .build();

    let errors = bucket
        .update_batch("rs-example")
        .add_records(vec![record1, record2])
        .send()
        .await?;

    assert_eq!(errors.len(), 0);
    Ok(())
}
