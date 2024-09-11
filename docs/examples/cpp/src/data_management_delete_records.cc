#include <reduct/client.h>
#include <cassert>
#include <chrono>

using reduct::IBucket;
using reduct::IClient;
using reduct::Error;
using std::chrono_literals::operator ""s;

int main() {
    // Create a client instance, then get or create a bucket
    auto client = IClient::Build("http://127.0.0.1:8383", {.api_token="my-token"});
    auto [bucket, create_err] = client->GetOrCreateBucket("my-bucket");
    assert(create_err == Error::kOk);

    //  Send some records to the "cpp-example"
    IBucket::Time ts = IBucket::Time::clock::now();
    auto err = bucket->Write("cpp-example", ts, [](auto rec) {
        rec->WriteAll("Some binary data");
    });
    assert(err == Error::kOk);

    err = bucket->Write("cpp-example", ts + 1s, [](auto rec) {
        rec->WriteAll("Some binary data");
    });
    assert(err == Error::kOk);

    // Delete a sole record
    err = bucket->RemoveRecord("cpp-example", ts);
    assert(err == Error::kOk);

    // Delete a batch of records
    auto [record_errors, http_err] = bucket->RemoveBatch("cpp-example", [ts](auto batch) {
        batch->AddRecord(ts);   // Already deleted, so this error will be in the errors map
        batch->AddRecord(ts + 1s);
    });

    assert(http_err == Error::kOk);
    assert(record_errors.begin()->second.code == 404);
    return 0;
}