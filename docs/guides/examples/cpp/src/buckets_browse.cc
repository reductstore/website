#include <reduct/client.h>
#include <iostream>
#include <cassert>

using reduct::IBucket;
using reduct::IClient;
using reduct::Error;

std::string PrintTime(std::chrono::system_clock::time_point time) {
    auto now_time_t = std::chrono::system_clock::to_time_t(time);
    auto now_tm = std::localtime(&now_time_t);
    char buf[32];
    std::strftime(buf, sizeof(buf), "%Y-%m-%d %H:%M:%S", now_tm);
    return buf;
}

int main() {
    // Create a client with the server URL
    auto client = IClient::Build("http://127.0.0.1:8383", {
            .api_token = "my-token"
    });

    //  Browse all buckets and print their information
    auto [list, list_err] = client->GetBucketList();
    if (list_err) {
        std::cerr << "Error: " << list_err << std::endl;
        return 1;
    }

    for (const auto &bucket: list) {
        std::cout << "Bucket: " << bucket.name << std::endl;
        std::cout << "Size: " << bucket.size << std::endl;
        std::cout << "Entry count: " << bucket.entry_count << std::endl;
        std::cout << "Latest Record: " << PrintTime(bucket.latest_record) << std::endl;
        std::cout << "Oldest Record: " << PrintTime(bucket.oldest_record) << std::endl;
    }

    // Get information about a specific bucket
    auto [bucket, get_err] = client->GetBucket("example-bucket");
    if (get_err) {
        std::cerr << "Error: " << get_err << std::endl;
        return 1;
    }

    std::cout << "Bucket Settings: " << bucket->GetSettings().result << std::endl;
    for (const auto &entry: bucket->GetEntryList().result) {
        std::cout << "Entry: " << entry.name << std::endl;
        std::cout << "Size: " << entry.size << std::endl;
        std::cout << "Latest Record: " << PrintTime(entry.latest_record) << std::endl;
        std::cout << "Oldest Record: " << PrintTime(entry.oldest_record) << std::endl;
    }

    return 0;
}