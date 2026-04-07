use reduct_rs::{Permissions, ReductClient, ReductError, TokenCreateOptions};
use tokio;

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    // Create a new client with the API URL and API token
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();

    // Create a token with read/write access, a 1 hour inactivity TTL,
    // and an IP allowlist for local access.
    let permissions = Permissions {
        full_access: false,
        read: vec![String::from("example-bucket")],
        write: vec![String::from("example-bucket")],
    };

    let token = client
        .create_token_with_options(
            "new-token",
            TokenCreateOptions {
                permissions,
                ttl: Some(3600),
                ip_allowlist: vec![String::from("127.0.0.1"), String::from("::1")],
                ..Default::default()
            },
        )
        .await?;

    println!("Generated token: {}", token.value);
    Ok(())
}
