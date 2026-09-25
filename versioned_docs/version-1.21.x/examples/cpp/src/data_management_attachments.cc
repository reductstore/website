#include <cassert>
#include <reduct/client.h>
#include <set>

using reduct::Error;
using reduct::IBucket;
using reduct::IClient;

int main() {
    // Create a client instance, then get or create a bucket
    auto client = IClient::Build("http://127.0.0.1:8383", {.api_token = "my-token"});
    auto [bucket, create_err] = client->GetOrCreateBucket("my-bucket");
    assert(create_err == Error::kOk);

    // Write attachments for an entry
    IBucket::AttachmentMap attachments = {
        {"schema", R"({"type":"object","version":"1.0"})"},
        {"calibration", R"({"fx":1260.1,"fy":1261.2})"},
    };
    auto err = bucket->WriteAttachments("camera/front", attachments);
    assert(err == Error::kOk);

    // Read attachments
    auto [stored, read_err] = bucket->ReadAttachments("camera/front");
    assert(read_err == Error::kOk);
    assert(stored.contains("schema"));

    // Remove one attachment by key
    err = bucket->RemoveAttachments("camera/front", std::set<std::string>{"calibration"});
    assert(err == Error::kOk);
    auto [stored_after_remove, read_err_after_remove] = bucket->ReadAttachments("camera/front");
    assert(read_err_after_remove == Error::kOk);
    assert(!stored_after_remove.contains("calibration"));

    // Remove all attachments
    err = bucket->RemoveAttachments("camera/front", {});
    assert(err == Error::kOk);
    auto [empty, read_err_empty] = bucket->ReadAttachments("camera/front");
    assert(read_err_empty == Error::kOk);
    assert(empty.empty());

    return 0;
}
