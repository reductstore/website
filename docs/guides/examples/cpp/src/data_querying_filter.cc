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
    auto [bucket, create_err] = client->GetOrCreateBucket("datasets");
    assert(create_err == Error::kOk);

    // Query 10 photos from "imdb" entry which taken in 2006 but don't contain "Rowan Atkinson"
    auto err = bucket->Query("imdb", std::nullopt, std::nullopt, {
            .include = {{"photo_taken", "2006"}},
            .exclude = {{"name", "b'Rowan Atkinson'"}},
            .limit = 10,
    }, [](auto rec) {
        std::cout << "Name: " << rec.labels["name"] << std::endl;
        std::cout << "Photo Taken: " << rec.labels["photo_taken"] << std::endl;
        std::cout << "Gender: " << rec.labels["gender"] << std::endl;

        auto [_, read_err] = rec.ReadAll();
        assert(read_err == Error::kOk);
        return true;    // if false, the query will stop
    });

    assert(err == Error::kOk);
    return 0;
}