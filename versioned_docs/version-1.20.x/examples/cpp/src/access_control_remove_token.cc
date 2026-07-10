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

    // Create a token with read/write access to the bucket "example-bucket"
    auto [token, create_err] = client->CreateToken("new-token", {
            .full_access = true,
            .read = {"example-bucket"},
            .write = {"example-bucket"},
    });
    return 0;
}