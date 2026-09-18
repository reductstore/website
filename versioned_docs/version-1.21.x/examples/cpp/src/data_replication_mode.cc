#include <cassert>
#include <reduct/client.h>

using reduct::Error;
using reduct::IClient;
using reduct::ReplicationMode;

int main() {
    // Update replication mode without changing other settings
    auto client = IClient::Build("http://127.0.0.1:8383", {
        .api_token = "my-token"
    });

    // Pause to queue transactions without sending them
    auto err = client->SetReplicationMode("my_replication", ReplicationMode::kPaused);
    assert(err == Error::kOk);

    // Disable to ignore new transactions
    err = client->SetReplicationMode("my_replication", ReplicationMode::kDisabled);
    assert(err == Error::kOk);

    // Re-enable to resume sending queued data
    err = client->SetReplicationMode("my_replication", ReplicationMode::kEnabled);
    assert(err == Error::kOk);
}
