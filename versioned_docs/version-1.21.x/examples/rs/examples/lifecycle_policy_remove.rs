use reduct_rs::{ReductClient, ReductError};

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();

    client.delete_lifecycle("lifecycle-to-remove").await?;
    Ok(())
}
