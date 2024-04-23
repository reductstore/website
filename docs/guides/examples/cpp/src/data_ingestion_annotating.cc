#include <reduct/client.h>
#include <iostream>
#include <cassert>

using reduct::IBucket;
using reduct::IClient;
using reduct::Error;

int main() {
    // Create a client instance, then get or create a bucket
    auto client = IClient::Build("http://127.0.0.1:8383", {.api_token="my-token"});
    auto [bucket, create_err] = client->GetOrCreateBucket("my-bucket");
    assert(create_err == Error::kOk);

    // Send a record  with labels and content type
    IBucket::Time ts = IBucket::Time::clock::now();
    auto err = bucket->Write("entry-1", {
            .timestamp = ts,
            .labels = {{"name", "example"},
                       {"type", "simple"}},
            .content_type = "text/plain",
    }, [](auto rec) {
        rec->WriteAll("Some binary data");
    });
    assert(err == Error::kOk);

    return 0;
}