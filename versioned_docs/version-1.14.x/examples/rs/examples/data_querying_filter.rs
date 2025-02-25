use futures::StreamExt;
use reduct_rs::{condition, ReductClient, ReductError};
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

    // Query 10 photos from "imdb" entry which taken after 2006 with the face score less than 4
    let query = bucket
        .query("imdb")
        .when(condition!({
            "&photo_taken": {"$gt": 2006},
            "&face_score": {"$gt": 4}
        }))
        .limit(10)
        .send()
        .await?;

    tokio::pin!(query);
    while let Some(record) = query.next().await {
        let record = record?;
        println!("Name: {:?}", record.labels().get("name"));
        println!("Photo Taken: {:?}", record.labels().get("photo_taken"));
        println!("Face Score: {:?}", record.labels().get("face_score"));

        _ = record.bytes().await?;
    }

    Ok(())
}
