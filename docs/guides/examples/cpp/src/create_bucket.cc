#include <reduct/client.h>
#include <iostream>

using reduct::IBucket;
using reduct::IClient;

int main() {
  // Create a client with the server URL
  auto client = IClient::Build("http://127.0.0.1:8383", IClient::Options{
    .api_token = "my-api-token"
  });

  // Create a bucket with the name "my-bucket" and a FIFO quota of 1GB
  IBucket::Settings settings;
  settings.quota_type = IBucket::QuotaType::FIFO;
   settings.quota_size = 1_000_000_000;
  auto [bucket, create_err] = client->GetOrCreateBucket("my-bucket", settings);

  assert(create_err == Error::kOk);
  assert(bucket.name == "my-bucket");
}