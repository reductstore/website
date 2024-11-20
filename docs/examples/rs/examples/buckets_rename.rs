use reduct_rs::{ReductClient, ReductError};
use tokio;

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    // Create a new client with the API URL and API token
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();

    // Get the bucket 'example-bucket'
    let bucket = client.get_bucket("example-bucket").await?;

    // Rename the entry 'entry_1' to 'entry_2'
    bucket.rename_entry("entry_1", "entry_2").await?;

    // Check that the entry was renamed
    let entries = bucket.entries().await?;
    let entry_names: Vec<String> = entries.iter().map(|entry| entry.name.clone()).collect();
    assert!(entry_names.contains(&"entry_2".to_string()));
    assert!(!entry_names.contains(&"entry_1".to_string()));

    Ok(())
}
