#include <reduct/client.h>
#include <iostream>
#include <cassert>

using reduct::IBucket;
using reduct::IClient;
using reduct::Error;

int main() {
    // Create a client with the server URL
    auto client = IClient::Build("http://127.0.0.1:8383", {
            .api_token = "my-token"
    });

    // Get the bucket with the name "example-bucket"
    auto [bucket, get_err] = client->GetBucket("example-bucket");
    assert(get_err == Error::kOk);

    // Rename the entry with the name "entry_1" to "entry_2"
    auto rename_err = bucket->RenameEntry("entry_1", "entry_2");
    assert(rename_err == Error::kOk);

    // Check that the old entry name no longer exists
    auto [entry_list, get_err2] = bucket->GetEntryList();
    assert(get_err2 == Error::kOk);
    assert(std::find_if(entry_list.begin(), entry_list.end(), [](const IBucket::EntryInfo& entry) {
        return entry.name == "entry_1";
    }) == entry_list.end());

    // Check that the new entry name exists
    assert(std::find_if(entry_list.begin(), entry_list.end(), [](const IBucket::EntryInfo& entry) {
        return entry.name == "entry_2";
    }) != entry_list.end());
}
