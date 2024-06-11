import {Client} from "reduct-js";

// Create a new client with the server URL and an API token
const client = new Client("http://127.0.0.1:8383", {apiToken: "my-token"});

// Create a token with read/write access to the bucket "example-bucket"
const token = await client.createToken("new-token", {
    fullAccess: false,
    read: ["example-bucket"],
    write: ["example-bucket"],
})

console.log(`Generated token: ${token}`);