#include <reduct/client.h>
#include <cassert>
#include <chrono>
#include <iostream>
#include <thread>

using reduct::IBucket;
using reduct::IClient;
using reduct::Error;

int main() {
    // Create a client with the server URL
    auto client = IClient::Build("http://127.0.0.1:8383", {
            .api_token = "my-token"
    });

    // Get bucket to remove
    auto [bucket, get_err] = client->GetBucket("bucket-to-remove");
    assert(get_err == Error::kOk);

    // Delete only entry with name "example-entry"
    auto remove_entry_err = bucket->RemoveEntry("example-entry");
    assert(remove_entry_err == Error::kOk);

    // Wait for the storage to finish removing blocks
    std::this_thread::sleep_for(std::chrono::seconds(1));

    // Remove entire bucket
    auto remove_err = bucket->Remove();
    assert(remove_err == Error::kOk);
}
