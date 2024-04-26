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

    // Send a record  with labels and content type
    IBucket::Time ts = IBucket::Time::clock::now();
    auto err = bucket->Write("entry-1", ts,[](auto rec) {
        rec->WriteAll("Some binary data");
    });
    assert(err == Error::kOk);

    // Query records in a time range
    err = bucket->Query("entry-1", ts , ts+1s, {}, [](auto rec) {
        // Print metadata
        std::cout << "Timestamp: " <<  rec.timestamp.time_since_epoch().count() << std::endl;
        std::cout << "Content Length: " << rec.size << std::endl;
        std::cout << "Content Type: " << rec.content_type << std::endl;
        std::cout << "Labels: " ;
        for (auto& [key, value] : rec.labels) {
            std::cout << key << ": " << value << ", ";
        }

        // Read the content
        auto [content, read_err] = rec.ReadAll();
        assert(read_err == Error::kOk);
        assert(content == "Some binary data");

        return true;    // if false, the query will stop
    });

    assert(err == Error::kOk);

    return 0;
}