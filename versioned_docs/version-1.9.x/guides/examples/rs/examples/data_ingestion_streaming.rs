use bytes::Bytes;
use futures::Stream;
use reduct_rs::{ReductClient, ReductError};
use std::pin::Pin;
use std::task::{Context, Poll};
use std::time::SystemTime;
use tokio;

// A custom stream that will stream items of a vector of bytes
struct CustomStream {
    data_to_stream: Vec<Bytes>,
    data_len: u64,
}

impl Stream for CustomStream {

    // Pay attention to a result with the ReductError type
    type Item = Result<Bytes, ReductError>;

    fn poll_next(self: Pin<&mut Self>, _cx: &mut Context) -> Poll<Option<Self::Item>> {
        let this = self.get_mut();
        if this.data_to_stream.is_empty() {
            Poll::Ready(None)
        } else {
            let data = this.data_to_stream.remove(0);
            Poll::Ready(Some(Ok(data)))
        }
    }
}

impl CustomStream {
    // Move the data to stream and calculate the total length
    fn new(data: Vec<&'static str>) -> Self {
        let data_len = data.iter().map(|s| s.len()).sum::<usize>() as u64;
        CustomStream {
            data_to_stream: data.iter().map(|s| Bytes::from(*s)).collect::<Vec<Bytes>>(),
            data_len,
        }
    }
}

#[tokio::main]
async fn main() -> Result<(), ReductError> {
    let stream = CustomStream::new(vec!["Some", "let's", "say", "huge", "binary", "data"]);
    let data_len = stream.data_len;

    // Create a client instance, then get or create a bucket
    let client = ReductClient::builder()
        .url("http://127.0.0.1:8383")
        .api_token("my-token")
        .build();
    let bucket = client.create_bucket("test").exist_ok(true).send().await?;

    // Send a record to the "rs-example" entry with the current timestamp
    let timestamp = SystemTime::now();
    bucket
        .write_record("rs-example")
        .timestamp(timestamp)
        .stream(stream)
        .content_length(data_len)
        .send()
        .await?;

    Ok(())
}
