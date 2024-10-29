package store.reduct;

import store.reduct.client.ReductClient;
import store.reduct.client.config.ServerProperties;
import store.reduct.model.bucket.Bucket;
import store.reduct.model.bucket.BucketSettings;
import store.reduct.model.bucket.QuotaType;
import store.reduct.model.record.Record;

import java.net.http.HttpClient;
import java.util.Iterator;

public class QuickStart {
    public static void main(String[] args) {
         // 1. Create a ReductStore client
        ServerProperties properties = ServerProperties
                .builder()
                .url("http://localhost:8383")
                .apiToken("my-token")
                .build();

        HttpClient httpClient = HttpClient.newHttpClient();
        ReductClient client = new ReductClient(properties, httpClient);

        // 2. Get or create a bucket with 1Gb quota
        BucketSettings settings = BucketSettings.builder()
                .quotaType(QuotaType.FIFO)
                .quotaSize(1_000_000_000)
                .exists(true)
                .build();
        Bucket bucket = client.createBucket("my-bucket1", settings);

        // 3. Write some data with timestamps in the 'sensor-1' entry
        long timestamp = System.currentTimeMillis() * 1000; // in microseconds
        Record record = Record.builder()
                .timestamp(timestamp)
                .type("application/octet-stream")
                .body("Record #1".getBytes())
                .build();

        bucket.writeRecord("sensor-1", record);
        record = Record.builder()
                .timestamp(timestamp + 1000_000)
                .type("application/json")
                .length(9)
                .body("Record #2".getBytes())
                .build();
        bucket.writeRecord("sensor-1", record);

        // 4. Read the data back
        for (Iterator<Record> it = bucket.query("sensor-1", timestamp, timestamp + 2000_000, 60L); it.hasNext(); ) {
            Record rec = it.next();

            System.out.println("Record timestamp: " + rec.getTimestamp());
            System.out.println("Record size: " + rec.getBody().length);
        }

    }
}