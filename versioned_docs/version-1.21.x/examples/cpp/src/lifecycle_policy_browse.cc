#include <iostream>
#include <reduct/client.h>

using reduct::IClient;

int main() {
  auto client = IClient::Build("http://127.0.0.1:8383", {.api_token = "my-token"});

  auto [lifecycles, list_err] = client->GetLifecycleList();
  if (list_err != reduct::Error::kOk) {
    return 1;
  }

  for (const auto& lifecycle : lifecycles) {
    std::cout << "Lifecycle: " << lifecycle.name << std::endl;
    std::cout << "Running: " << lifecycle.is_running << std::endl;
    std::cout << "Provisioned: " << lifecycle.is_provisioned << std::endl;
  }

  auto [detail, detail_err] = client->GetLifecycle("my-lifecycle");
  if (detail_err != reduct::Error::kOk) {
    return 1;
  }

  std::cout << "Lifecycle: " << detail.info.name << std::endl;
  std::cout << "Bucket: " << detail.settings.bucket << std::endl;
}
