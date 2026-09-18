use reduct_rs::{ReductClient, ReductError};

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();

    for lifecycle in client.list_lifecycles().await? {
        println!("Lifecycle: {}", lifecycle.name);
        println!("Mode: {:?}", lifecycle.mode);
        println!("Running: {}", lifecycle.is_running);
        println!("Provisioned: {}", lifecycle.is_provisioned);
    }

    let detail = client.get_lifecycle("my-lifecycle").await?;
    println!("Lifecycle: {}", detail.info.name);
    println!("Settings: {:?}", detail.settings);

    Ok(())
}
