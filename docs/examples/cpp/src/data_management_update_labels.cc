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

    //  Send some records to the "entry" entry with labels
    IBucket::Time ts = IBucket::Time::clock::now();
    auto err = bucket->Write("cpp-example", {
            .timestamp = ts,
            .labels = {{"key1", "value1"},
                       {"key2", "value2"}}
    }, [](auto rec) {
        rec->WriteAll("Some binary data");
    });
    assert(err == Error::kOk);

    err = bucket->Write("cpp-example", {
            .timestamp = ts + 1s,
            .labels = {{"key1", "value1"},
                       {"key2", "value2"}}
    }, [](auto rec) {
        rec->WriteAll("Some binary data");
    });
    assert(err == Error::kOk);

    // Update labels of a record: remove "key2" and update "key1"
    err = bucket->Update("cpp-example", {
            .timestamp = ts,
            .labels = {{"key1", "value3"},
                       {"key2", ""}}
    });
    assert(err == Error::kOk);

    err = bucket->Read("cpp-example", ts, [](auto rec) {
        assert(rec.labels["key1"] == "value3");
        assert(rec.labels["key2"] == "");
        return true;
    });
    assert(err == Error::kOk);

    // Update labels in a batch
    auto [record_errors, http_err] = bucket->UpdateBatch("cpp-example", [ts](auto batch) {
        batch->AddOnlyLabels(ts, {{"key1", "value4"}});
        batch->AddOnlyLabels(ts + 1s, {{"key1", "value4"}});
    });
    assert(http_err == Error::kOk);
    assert(record_errors.empty());

    return 0;
}