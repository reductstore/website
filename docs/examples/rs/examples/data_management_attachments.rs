use reduct_rs::{ReductClient, ReductError};
use serde_json::json;
use std::collections::HashMap;
use tokio;

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    // Create a client instance, then get or create a bucket
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();
    let bucket = client
        .create_bucket("my-bucket")
        .exist_ok(true)
        .send()
        .await?;

    // Write attachments for an entry
    bucket
        .write_attachments(
            "camera/front",
            HashMap::from([
                (
                    "schema".to_string(),
                    json!({"type":"object","version":"1.0"}),
                ),
                ("calibration".to_string(), json!({"fx":1260.1,"fy":1261.2})),
            ]),
        )
        .await?;

    // Read attachments
    let attachments = bucket.read_attachments("camera/front").await?;
    assert_eq!(
        attachments.get("schema"),
        Some(&json!({"type":"object","version":"1.0"}))
    );

    // Remove one attachment by key
    bucket
        .remove_attachments("camera/front", Some(vec!["calibration".to_string()]))
        .await?;
    let attachments = bucket.read_attachments("camera/front").await?;
    assert!(!attachments.contains_key("calibration"));

    // Remove all attachments
    bucket.remove_attachments("camera/front", None).await?;
    let attachments = bucket.read_attachments("camera/front").await?;
    assert!(attachments.is_empty());

    Ok(())
}
