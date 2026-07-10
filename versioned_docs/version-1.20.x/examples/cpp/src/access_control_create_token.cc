#include <reduct/client.h>
#include <cassert>
#include <chrono>
#include <iostream>

using reduct::IClient;
using reduct::Error;

int main() {
    // Create a client with the server URL
    auto client = IClient::Build("http://127.0.0.1:8383", {
            .api_token = "my-token"
    });

    // Create a token with read/write access, a 1 hour inactivity TTL,
    // an absolute expiration time, and an IP allowlist for local access.
    auto [token, create_err] = client->CreateToken("new-token", IClient::TokenCreateRequest{
            .permissions = {
                .full_access = false,
                .read = {"example-bucket"},
                .write = {"example-bucket"},
            },
            .expires_at = std::chrono::system_clock::now() + std::chrono::hours(24),
            .ttl = 3600,
            .ip_allowlist = {"127.0.0.1", "::1"},
    });

    assert(create_err == Error::kOk);
    std::cout << "Generated token: " << token << std::endl;
    return 0;
}
