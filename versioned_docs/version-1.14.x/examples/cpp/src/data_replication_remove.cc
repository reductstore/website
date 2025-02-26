#include <reduct/client.h>
#include <iostream>
#include <cassert>

using reduct::IBucket;
using reduct::IClient;
using reduct::Error;

int main() {
    // Create a client instance
    auto client = IClient::Build("http://127.0.0.1:8383", {
            .api_token = "my-token"
    });

    // Remove the `repl-to-remove` replication
    auto err = client->RemoveReplication("repl-to-remove");
    assert(err == Error::kOk);
}
