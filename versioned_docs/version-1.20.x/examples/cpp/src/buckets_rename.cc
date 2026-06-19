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

    // Rename the bucket with the name "bucket-to-rename" to "bucket-renamed"
    auto [bucket, get_err] = client->GetBucket("bucket-to-rename");
    assert(get_err == Error::kOk);
    auto rename_err = bucket->Rename("bucket-renamed");
    assert(rename_err == Error::kOk);

    // Check that the old name no longer exists
    auto [_, get_err2] = client->GetBucket("bucket-to-rename");
    assert(get_err2.code == 404);

    // Check that the new name exists
    auto [_, get_err3] = client->GetBucket("bucket-renamed");
    assert(get_err3 == Error::kOk);
}