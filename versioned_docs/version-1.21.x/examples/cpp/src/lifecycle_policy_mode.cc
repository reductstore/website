#include <cassert>
#include <reduct/client.h>

using reduct::Error;
using reduct::IClient;

int main() {
  auto client = IClient::Build("http://127.0.0.1:8383", {.api_token = "my-token"});

  auto err = client->SetLifecycleMode("my-lifecycle", IClient::LifecycleMode::kDryRun);
  assert(err == Error::kOk);

  err = client->SetLifecycleMode("my-lifecycle", IClient::LifecycleMode::kDisabled);
  assert(err == Error::kOk);

  err = client->SetLifecycleMode("my-lifecycle", IClient::LifecycleMode::kEnabled);
  assert(err == Error::kOk);
}
