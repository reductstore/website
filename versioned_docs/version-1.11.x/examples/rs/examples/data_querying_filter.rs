use futures::StreamExt;
use reduct_rs::{ReductClient, ReductError};
use tokio;

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    // Create a client instance, then get or create a bucket
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();
    let bucket = client
        .create_bucket("example-bucket")
        .exist_ok(true)
        .send()
        .await?;

    // Query 10 photos from "imdb" entry which taken in 2006 but don't contain "Rowan Atkinson"
    let query = bucket
        .query("imdb")
        .add_include("photo_taken", "2006")
        .add_exclude("name", "b'Rowan Atkinson'")
        .limit(10)
        .send()
        .await?;

    tokio::pin!(query);
    while let Some(record) = query.next().await {
        let record = record?;
        println!("Name: {:?}", record.labels().get("name"));
        println!("Photo Taken: {:?}", record.labels().get("photo_taken"));
        println!("Gender: {:?}", record.labels().get("gender"));

        _ = record.bytes().await?;
    }

    Ok(())
}
