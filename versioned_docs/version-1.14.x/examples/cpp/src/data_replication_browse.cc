#include <reduct/client.h>
#include <iostream>
#include <cassert>

using reduct::IBucket;
using reduct::IClient;
using reduct::Error;

int main() {
    // Create a client instance
    auto client = IClient::Build("http://127.0.0.1:8383", {
            .api_token = "my-token"
    });

    // List all replications
    auto [replications, list_err] = client->GetReplicationList();
    for (auto& replication : replications) {
        std::cout << "Replication: " << replication.name << std::endl;
        std::cout << "Active: " << replication.is_active << std::endl;
        std::cout << "Pending records: " << replication.pending_records << std::endl;
        std::cout << "Provisioned: " << replication.is_provisioned << std::endl;
    }

    // Get all details of a replication
    auto [replication, detail_err] = client->GetReplication("example-replication");
    std::cout << "Replication: " << replication.info.name << std::endl;
    std::cout << "Source Bucket: " << replication.settings.src_bucket << std::endl;
    std::cout << "Failed records (last hour): " << replication.diagnostics.hourly.errored << std::endl;
    std::cout << "Successful records (last hour): " << replication.diagnostics.hourly.ok << std::endl;
}
