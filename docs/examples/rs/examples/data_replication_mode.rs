use reduct_rs::{ReductClient, ReductError, ReplicationMode};
use tokio;

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    // Update replication mode without changing other settings
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();

    // Pause to queue transactions without sending them
    client
        .set_replication_mode("my_replication", ReplicationMode::Paused)
        .await?;

    // Disable to ignore new transactions
    client
        .set_replication_mode("my_replication", ReplicationMode::Disabled)
        .await?;

    // Re-enable to resume sending queued data
    client
        .set_replication_mode("my_replication", ReplicationMode::Enabled)
        .await?;

    Ok(())
}
