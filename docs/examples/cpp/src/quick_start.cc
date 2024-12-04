#include <reduct/client.h>

#include <iostream>
#include <cassert>

using reduct::IBucket;
using reduct::IClient;
using reduct::Error;
using sec = std::chrono::seconds;

int main() {
    // 1. Create a ReductStore client
    auto client = IClient::Build("http://127.0.0.1:8383",{
        .api_token = "my-token"
    });

    // 2. Get or create a bucket with 1Gb quota
    auto [bucket, create_err] = client->GetOrCreateBucket("my-bucket", {
        .quota_type = IBucket::QuotaType::kFifo,
        .quota_size = 1'000'000'000
    });

    if (create_err) {
        std::cerr << "Error: " << create_err;
        return -1;
    }

    // 3.  Write some data with timestamps and labels to the 'entry-1' entry
    IBucket::Time start = IBucket::Time::clock::now();
    auto write_err =
            bucket->Write("sensor-1", {
                .timestamp = start,
                .labels = {{"score", "10"}}
                }, [](auto rec) { rec->WriteAll("<Blob data>"); });
    assert(write_err == Error::kOk);

    write_err = bucket->Write("sensor-1", {
        .timestamp = start + sec(1),
        .labels = {{"score", "20"}}
    }, [](auto rec) { rec->WriteAll("<Blob data>"); });
    assert(write_err == Error::kOk);

    // 4. Query the data by time range and condition
    auto err = bucket->Query("sensor-1", start,  start + sec(2), {
            .when = R"({"&score": {"$gt": 10}})"

        }, [](auto&& record) {
        std::cout << "Timestamp: " << record.timestamp.time_since_epoch().count() << std::endl;
        std::cout << "Content Length: " << record.size << std::endl;

        auto [blob, read_err] = record.ReadAll();
        if (!read_err) {
            std::cout << "Read blob: " << blob << std::endl;
        }

        return true;
    });

    if (err) {
        std::cerr << "Error: " << err;
        return -1;
    }

    // 5. End
    return 0;
}
