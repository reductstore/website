#include <reduct/client.h>
#include <iostream>
#include <cassert>

using reduct::IBucket;
using reduct::IClient;
using reduct::Error;

int main() {
  // Create a client with the server URL
  auto client = IClient::Build("http://127.0.0.1:8383", {
    .api_token = "my-api-token"
  });

  // Create a bucket with the name "my-bucket" and a FIFO quota of 1GB
  IBucket::Settings settings;
  settings.quota_type = IBucket::QuotaType::kFifo;
   settings.quota_size = 1'000'000'000;
  auto [bucket, create_err] = client->GetOrCreateBucket("my-bucket", settings);

  assert(create_err == Error::kOk);
  assert(bucket->GetInfo().result.name == "my-bucket2");
}