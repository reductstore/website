use reduct_rs::{ErrorCode, ReductClient, ReductError};
use tokio;

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    // Create a new client with the API URL and API token
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();

    // Rename the bucket "bucket-to-rename" to "bucket-renamed"
    let mut bucket = client.get_bucket("bucket-to-rename").await?;
    bucket.rename("bucket-renamed").await?;

    // Check that the bucket was renamed
    let bucket = client.get_bucket("bucket-renamed").await?;
    assert_eq!(bucket.name(), "bucket-renamed");
    let bucket = client.get_bucket("bucket-to-rename").await;
    assert_eq!(bucket.err().unwrap().status, ErrorCode::NotFound);
    Ok(())
}
