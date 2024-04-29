use reduct_rs::{QuotaType, ReductClient, ReductError};
use tokio;

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    // Create a new client with the API URL and API token
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();

    // Create a bucket with the name "my-bucket" and a FIFO quota of 1GB
    let bucket = client
        .create_bucket("my-bucket")
        .quota_type(QuotaType::FIFO)
        .quota_size(1_000_000_000)
        .exist_ok(true)
        .send()
        .await?;

    assert_eq!(bucket.name(), "my-bucket");
    Ok(())
}
