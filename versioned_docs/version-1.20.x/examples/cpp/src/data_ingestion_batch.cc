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


    // Prepare a batch of records for different entries
    auto [record_errors, http_err] = bucket->WriteBatch([](auto batch) {
        IBucket::Time ts = IBucket::Time::clock::now();
        batch->AddRecord("sensor-1", ts, "Temperature: 20.5", "text/plain", {{"unit", "C"}});
        batch->AddRecord("sensor-1", ts + 1s, "Temperature: 20.6", "text/plain", {{"unit", "C"}});
        batch->AddRecord("camera-1", ts + 2s, "Frame #1", "text/plain");
    });
    assert(http_err == Error::kOk);

    // Check if all records were sent successfully
    for (auto& [entry, entry_errors] : record_errors) {
        for (auto& [ts, err] : entry_errors) {
            assert(err == Error::kOk);
        }
    }

    return 0;
}
