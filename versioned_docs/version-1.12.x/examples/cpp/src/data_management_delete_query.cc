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

    // Delete all records withing a time range
    auto [removed_records, query_err] = bucket->RemoveQuery("cpp-example", ts, ts + 2s, {});
    assert(query_err == Error::kOk);
    assert(removed_records == 2);

    // You can also delete all records with a specific label
    bucket->RemoveQuery("cpp-example", {}, {},{
        .include = {{"key1", "value1"}}
    });

    // Or each N-th record
    bucket->RemoveQuery("cpp-example", {}, {},{
        .each_n = 2
    });
}