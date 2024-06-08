#include <reduct/client.h>

#include <iostream>

using reduct::IBucket;
using reduct::IClient;
using sec = std::chrono::seconds;

int main() {
    // 1. Create a ReductStore client
    auto client = IClient::Build("http://127.0.0.1:8383");

    // 2. Get or create a bucket with 1Gb quota
    auto [bucket, create_err] = client->GetOrCreateBucket("my-bucket", {
        .quota_type = IBucket::QuotaType::kFifo,
        .quota_size = 1'000'000'000
    });

    if (create_err) {
        std::cerr << "Error: " << create_err;
        return -1;
    }

    // 3. Write some data with timestamps in the 'sensor-1' entry
    IBucket::Time start = IBucket::Time::clock::now();
    [[maybe_unused]] auto write_err =
            bucket->Write("sensor-1", start, [](auto rec) { rec->WriteAll("Record #1"); });
    write_err = bucket->Write("sensor-1", start + sec(1), [](auto rec) { rec->WriteAll("Record #2"); });

    // 4. Query the data by time range
    auto err = bucket->Query("sensor-1", start,  start + sec(2), {}, [](auto&& record) {
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