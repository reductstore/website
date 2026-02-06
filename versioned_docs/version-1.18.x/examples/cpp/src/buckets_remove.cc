#include <reduct/client.h>
#include <iostream>
#include <cassert>
#include <thread>
#include <chrono>

using reduct::IBucket;
using reduct::IClient;
using reduct::Error;

int main() {
    // Create a client with the server URL
    auto client = IClient::Build("http://127.0.0.1:8383", {
            .api_token = "my-token"
    });

    // Remove the bucket with the name "bucket-to-remove"
    auto [bucket, get_err] = client->GetBucket("bucket-to-remove");
    assert(get_err == Error::kOk);
    auto remove_err = bucket->Remove();
    assert(remove_err == Error::kOk);

    // Check that the bucket no longer exists or is in the process of being removed
    auto [_, get_err2] = client->GetBucket("bucket-to-remove");
    assert(get_err2.code == 404 || get_err2.code == 409);
}
