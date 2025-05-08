use reduct_rs::{ReductClient, ReductError};
use tokio;

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    // Create a new client with the API URL and API token
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();

    // Get bucket to remove
    let bucket = client.get_bucket("bucket-to-remove").await?;

    // Delete only entry with name "example-entry"
    bucket.remove_entry("example-entry").await?;

    // Remove entire bucket
    bucket.remove().await?;
    Ok(())
}
