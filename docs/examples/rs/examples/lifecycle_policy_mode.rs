use reduct_rs::{LifecycleMode, ReductClient, ReductError};

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();

    client
        .set_lifecycle_mode("my-lifecycle", LifecycleMode::DryRun)
        .await?;
    client
        .set_lifecycle_mode("my-lifecycle", LifecycleMode::Disabled)
        .await?;
    client
        .set_lifecycle_mode("my-lifecycle", LifecycleMode::Enabled)
        .await?;

    Ok(())
}
