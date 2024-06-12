use reduct_rs::{Labels, ReductClient, ReductError};
use tokio;

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    // Create a client instance
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();

    // List all replications
    for replication in client.list_replications().await? {
        println!("Replication: {}", replication.name);
        println!("Active: {}", replication.is_active);
        println!("Pending records: {}", replication.pending_records);
        println!("Provisioned: {}", replication.is_provisioned);
    }

    // Get all details of a replication
    let replication = client.get_replication("example-replication").await?;
    println!("Replication: {}", replication.info.name);
    println!("Settings: {:?}", replication.settings);
    println!(
        "Failed records (last hour): {}",
        replication.diagnostics.hourly.errored
    );
    println!(
        "Successful records (last hour): {}",
        replication.diagnostics.hourly.ok
    );
    println!(
        "Errors (last hour): {:?}",
        replication.diagnostics.hourly.errors
    );

    Ok(())
}
