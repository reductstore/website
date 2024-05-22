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

ostream &operator<<(ostream &os, const std::vector<std::string> &v) {
    os << "[";
    for (size_t i = 0; i < v.size(); ++i) {
        os << v[i];
        if (i != v.size() - 1) {
            os << ", ";
        }
    }
    os << "]";
    return os;
}

int main() {
    // Create a client with the server URL
    auto client = IClient::Build("http://127.0.0.1:8383", {
            .api_token = "my-token"
    });

    // Browse all tokens and print their information
    auto [list, list_err] = client->GetTokenList();
    assert(list_err == Error::kOk);

    for (const auto &token: list) {
        std::cout << "Token: " << token.name << std::endl;
        std::cout << "Created: " << PrintTime(token.created_at) << std::endl;

        // Get detailed information about a specific token
        auto [token_info, get_err] = client->GetToken(token.name);
        assert(get_err == Error::kOk);

        std::cout << "Full Access: " << token_info.permissions.full_access << std::endl;
        std::cout << "Read Access: " << token_info.permissions.read << std::endl;
        std::cout << "Write Access: " << token_info.permissions.write << std::endl;
    }
    return 0;
}