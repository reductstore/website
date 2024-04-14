use reduct_rs::{Bucket, ReductClient, ReductError};

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    // Create a new client with the API URL and API token
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();

    // Browse all buckets and print their information
    let buckets = client.bucket_list().await?.buckets;
    for info in buckets {
        println!("Bucket: {}", info.name);
        println!("Size: {}", info.size);
        println!("Entry count: {}", info.entry_count);
        println!("Oldest Record: {:?}", info.oldest_record);
        println!("Latest Record: {:?}", info.latest_record);
    }

    // Get information about a specific bucket
    let bucket: Bucket = client.get_bucket("example-bucket").await?;
    let settings = bucket.settings().await?;
    println!("Settings: {:?}", settings);

    for entry in bucket.entries().await? {
        println!("Entry: {:?}", entry.name);
        println!("Size: {:?}", entry.size);
        println!("Oldest Record: {:?}", entry.oldest_record);
        println!("Latest Record: {:?}", entry.latest_record);
    }

    Ok(())
}