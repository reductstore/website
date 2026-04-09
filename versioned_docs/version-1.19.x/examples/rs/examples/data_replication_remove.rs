use reduct_rs::{ReductClient, ReductError};
use tokio;

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    // Create a client instance
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();

    // Remove the `repl-to-remove` replication
    client.delete_replication("repl-to-remove").await?;
    Ok(())
}
