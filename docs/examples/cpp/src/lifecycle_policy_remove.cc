#include <cassert>
#include <reduct/client.h>

using reduct::Error;
using reduct::IClient;

int main() {
  auto client = IClient::Build("http://127.0.0.1:8383", {.api_token = "my-token"});

  auto err = client->DeleteLifecycle("lifecycle-to-remove");
  assert(err == Error::kOk);
}
