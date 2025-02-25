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

    // Get an existing bucket
    auto [bucket, get_err] = client->GetBucket("example-bucket");
    assert(get_err == Error::kOk);

    // Change the quota size of the bucket to 5GB
    IBucket::Settings new_settings;
    new_settings.quota_size = 5'000'000'000;
    auto change_err = bucket->UpdateSettings(new_settings);

    assert(change_err == Error::kOk);
    assert(bucket->GetSettings().result.quota_size == 5'000'000'000);
}
