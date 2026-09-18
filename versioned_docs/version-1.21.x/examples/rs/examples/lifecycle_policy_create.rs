use reduct_rs::{condition, LifecycleType, ReductClient, ReductError};

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();

    let _ = client
        .create_bucket("my-bucket")
        .exist_ok(true)
        .send()
        .await?;

    client
        .create_lifecycle("my-lifecycle")
        .lifecycle_type(LifecycleType::Delete)
        .bucket("my-bucket")
        .entries(vec!["rs-example".to_string()])
        .older_than("30d")
        .interval("1h")
        .when(condition!({ "&anomaly": { "$eq": 1 } }))
        .send()
        .await?;

    Ok(())
}
