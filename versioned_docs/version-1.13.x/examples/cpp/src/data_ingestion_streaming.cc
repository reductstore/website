#include <reduct/client.h>
#include <iostream>
#include <cassert>

using reduct::IBucket;
using reduct::IClient;
using reduct::Error;

int main() {
    std::string data = "Some let's say huge binary data";

    // Create a client instance, then get or create a bucket
    auto client = IClient::Build("http://127.0.0.1:8383", {.api_token="my-token"});
    auto [bucket, create_err] = client->GetOrCreateBucket("my-bucket");
    assert(create_err == Error::kOk);

    // Stream the data to the "cpp-example" entry with the current timestamp
    IBucket::Time ts = IBucket::Time::clock::now();
    auto err = bucket->Write("cpp-example", ts, [data](auto rec) {
        rec->Write(data.size(),
                   [data](auto offset, auto size) {
                        // this lambda is called multiple times when a chunk of data is needed to be sent
                       return std::pair{true, data.substr(offset, size)};
                   });
    });
    assert(err == Error::kOk);

    return 0;
}
