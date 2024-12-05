#include <reduct/client.h>
#include <iostream>
#include <cassert>

using reduct::IBucket;
using reduct::IClient;
using reduct::Error;

int main() {
    // Create a client instance, then create a bucket as source bucket
    auto client = IClient::Build("http://127.0.0.1:8383", {
            .api_token = "my-token"
    });

    auto [bucket, create_err] = client->GetOrCreateBucket("my-bucket");
    assert(create_err == Error::kOk);

    // Set up a replication to a destination bucket
    // for records from the "cpp-example" entry and with labels "anomaly=1"
    auto repl_err = client->CreateReplication("my-replication", IClient::ReplicationSettings{
        .src_bucket = "my-bucket",
        .dst_bucket = "demo",
        .dst_host = "https://play.reduct.store",
        .dst_token = "reductstore",
        .entries = {"cpp-example"},
        .include = {{"anomaly", "1"}},
    });
    assert(repl_err == Error::kOk);
}
