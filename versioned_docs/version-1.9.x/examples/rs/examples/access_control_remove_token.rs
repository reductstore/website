use reduct_rs::{Permissions, QuotaType, ReductClient, ReductError};
use tokio;

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    // Create a new client with the API URL and API token
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();

    // Remove the token "token-to-remove"
    client.delete_token("token-to-remove").await?;
    Ok(())
}