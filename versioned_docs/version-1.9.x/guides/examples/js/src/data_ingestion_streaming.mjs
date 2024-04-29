import {Client} from "reduct-js";
import {Readable} from "stream";

const DATA = ["Some", "let's", "say", "huge", "binary", "data"];
const stream_to_send = Readable.from(DATA)

// Create a client instance, then get or create a bucket
const client = new Client("http://127.0.0.1:8383", {apiToken: "my-token"});
const bucket = await client.getOrCreateBucket("bucket");

// Stream the data to the "entry-1" entry with the current timestamp in microseconds
const timestamp = BigInt(Date.now()) * 1000n;
let record = await bucket.beginWrite("entry-1", timestamp);
await record.write(stream_to_send, DATA.join("").length);
