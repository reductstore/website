#include <reduct/client.h>
#include <iostream>

using reduct::IBucket;
using reduct::IClient;

int main() {
    // Create a client instance, then get or create a bucket
    auto client = IClient::Build("http://127.0.0.1:8383", {.api_token="my=token"});
    auto [bucket, create_err] = client->GetOrCreateBucket("my-bucket");

    // Send a record to the "entry-1" entry with the current timestamp
    IBucket::Time ts = IBucket::Time::clock::now();
    [[maybe_unused]] auto err = bucket->Write("entry-1", ts, [](auto rec) {
        rec->WriteAll("Some binary data");
    });

    return 0;
}