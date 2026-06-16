use reduct_rs::{BucketSettings, ReductClient, ReductError};
use tokio;

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    // Create a new client with the API URL and API token
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();

    // Get an existing bucket
    let bucket = client.get_bucket("example-bucket").await?;

    // Change the quota size of the bucket to 5GB
    let new_settings = BucketSettings {
        quota_size: Some(5_000_000_000),
        ..BucketSettings::default()
    };
    bucket.set_settings(new_settings).await?;

    assert_eq!(bucket.settings().await?.quota_size, Some(5_000_000_000));
    Ok(())
}
