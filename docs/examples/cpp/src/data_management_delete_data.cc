#include <reduct/client.h>
#include <iostream>
#include <cassert>

using reduct::IBucket;
using reduct::IClient;
using reduct::Error;

int main() {
    // Create a client with the server URL
    auto client = IClient::Build("http://127.0.0.1:8383", {
            .api_token = "my-token"
    });

    // Get bucket to remove
    auto [bucket, get_err] = client->GetBucket("example-bucket");
    assert(get_err == Error::kOk);

    // Delete only entry with name "example-entry"
    auto remove_entry_err = bucket->RemoveEntry("example-entry");
    assert(remove_entry_err == Error::kOk);

    // Remove entire bucket
    auto remove_err = bucket->Remove();
    assert(remove_err == Error::kOk);
}