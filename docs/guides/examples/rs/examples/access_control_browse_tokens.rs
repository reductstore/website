use reduct_rs::{Permissions, QuotaType, ReductClient, ReductError};
use tokio;

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    // Create a new client with the API URL and API token
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();

    // Browse all tokens and print their information
    let tokens = client.list_tokens().await?;
    for token in tokens {
        println!("Token: {}", token.name);
        println!("Created: {:?}", token.created_at);
        println!("Provisioned: {:?}", token.is_provisioned);

        // Get detailed information about the token
        let token = client.get_token(&token.name).await?;
        println!("Permissions: {:?}", token.permissions);
    }

    Ok(())
}