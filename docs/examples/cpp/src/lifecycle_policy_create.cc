#include <cassert>
#include <reduct/client.h>

using reduct::Error;
using reduct::IClient;

int main() {
  auto client = IClient::Build("http://127.0.0.1:8383", {.api_token = "my-token"});

  auto [bucket, bucket_err] = client->GetOrCreateBucket("my-bucket");
  assert(bucket_err == Error::kOk);

  auto err = client->CreateLifecycle("my-lifecycle", IClient::LifecycleSettings{
      .type = IClient::LifecycleType::kDelete,
      .bucket = "my-bucket",
      .entries = {"cpp-example"},
      .max_age = "30d",
      .interval = "1h",
      .when = R"({"&anomaly":{"$eq":1}})",
  });
  assert(err == Error::kOk);
}
