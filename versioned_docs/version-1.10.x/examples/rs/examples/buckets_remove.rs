use reduct_rs::{ErrorCode, ReductClient, ReductError};
use tokio;

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    // Create a new client with the API URL and API token
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();

    // Remove the bucket "bucket-to-remove"
    let bucket = client.get_bucket("bucket-to-remove").await?;
    bucket.remove().await?;

    // Check that the bucket no longer exists
    let bucket = client.get_bucket("bucket-to-remove").await;
    assert_eq!(bucket.err().unwrap().status, ErrorCode::NotFound);
    Ok(())
}
