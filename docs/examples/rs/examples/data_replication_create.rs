use reduct_rs::{Labels, ReductClient, ReductError};
use tokio;

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    // Create a client instance, then create a bucket as source bucket
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();
    let _ = client
        .create_bucket("my-bucket")
        .exist_ok(true)
        .send()
        .await?;

    // Set up a replication to a destination bucket for records
    // from the "rs-example" entry and with labels "anomaly=1"
    let _ = client
        .create_replication("my-bucket")
        .src_bucket("my-bucket")
        .dst_bucket("demo")
        .dst_host("https://play.reduct.store")
        .dst_token("reductstore")
        .entries(vec!["rs-example".to_string()])
        .include(Labels::from_iter(vec![("anomaly".to_string(), "1".to_string())]))
        .send()
        .await?;
    Ok(())
}
