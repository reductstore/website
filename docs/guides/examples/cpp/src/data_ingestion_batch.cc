#include <reduct/client.h>
#include <iostream>
#include <cassert>

using reduct::IBucket;
using reduct::IClient;
using reduct::Error;

using std::chrono_literals::operator ""s;

int main() {
    // Create a client instance, then get or create a bucket
    auto client = IClient::Build("http://127.0.0.1:8383", {.api_token="my-token"});
    auto [bucket, create_err] = client->GetOrCreateBucket("my-bucket");
    assert(create_err == Error::kOk);


    // Send a batch of records to the "entry-1" entry
    auto [record_errors, http_err] = bucket->WriteBatch("entry-1", [](auto batch) {
        IBucket::Time ts = IBucket::Time::clock::now();
        batch->AddRecord(ts, "Records #1");
        batch->AddRecord(ts + 1s, "Records #2");
    });
    assert(http_err == Error::kOk);

    // Check if all records were sent successfully
    for (auto& [ts, err] : record_errors) {
        assert(err == Error::kOk);
    }

    return 0;
}