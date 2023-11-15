---
title: "How to keep a history of MQTT data with Node.js"
description: "A tutorial to keep a history of MQTT messages with Node.js by using the ReductStore Client SDK for JavaScript."
authors: alexey
tags: [tutorials, iot]
slug: tutorials/iot/how-to-keep-mqtt-data-node
date: 2022-12-29
---

The [MQTT protocol][4] is very popular in IoT applications. It is a simple way to connect different data sources
with your application by using a publish/subscribe model. Sometimes you may want to keep a history of your MQTT data to
use it for model training, diagnostics or metrics. If your data sources provide different formats of data that can
not be interpreted as time series of floats, ReductStore is what you need.

Let's make a simple MQTT application to see how it works.

<!--truncate-->

### Prerequisites

For this usage example we have the following requirements:

* Linux AMD64
* Docker and Docker Compose
* NodeJS >= 16

If you're an Ubuntu user, use this command to install the dependencies:

```
$ sudo apt-get update
$ sudo apt-get install docker-compose nodejs
```

### Run MQTT Broker and ReductStore with Docker Compose

The easiest way to run the broker and the storage is to use Docker Compose. So we should create a `docker-compose.yml`
file in the example's folder with the services:

```yaml
version: "3"
services:
  reduct-storage:
    image: reduct/store:latest
    volumes:
      - ./data:/data
    ports:
      - "8383:8383"

  mqtt-broker:
    image: eclipse-mosquitto:1.6
    ports:
      - "1883:1883"
```

Then run the configuration:

```
docker-compose up
```

Docker Compose downloaded the images and ran the containers. Pay attention that we published ports 1883 for MQTT
protocol and 8383 for [ReductStore HTTP API](https://docs.reduct.store/http-api).

### Write NodeJS script

Now we're ready to make hands dirty with code. Let's initialize the NPM package and
install [MQTT Client](https://www.npmjs.com/package/async-mqtt) and
[JavaScript Client SDK](https://www.npmjs.com/package/reduct-js).

```
$ npm init
$ npm install --save reduct-js async-mqtt 
```

When we have all the dependencies installed, we can write the script:

```javascript
const MQTT = require('async-mqtt');
const {Client} = require('reduct-js');

MQTT.connectAsync('tcp://localhost:1883').then(async (mqttClient) => {
    await mqttClient.subscribe('mqtt_data');

    const reductClient = new Client('http://localhost:8383');
    const bucket = await reductClient.getOrCreateBucket('mqtt');

    mqttClient.on('message', async (topic, msg) => {
        const record = await bucket.beginWrite(topic);
        await record.write(msg)
        console.log('Received message "%s" from topic "%s" is written', msg,
            topic);
    });

}).catch(error => console.error(error));

```

Let's look at the code in detail. First, we have to connect to the MQTT broker and subscribe to a topic. The topic name
just random string, which producers should know. In our case, it is `mqtt_data`:

```javascript

MQTT.connectAsync('tcp://localhost:1883').then(async (mqttClient) => {
    await mqttClient.subscribe('mqtt_data');

    // rest of code
}).catch(error => console.error(error));
```

If the MQTT connection is successful, we can start dealing with ReductStore. To start writing data there, we need a
bucket. We create a bucket with the name `mqtt` or get an existing one:

```javascript
const reductClient = new Client('http://localhost:8383');
const bucket = await reductClient.getOrCreateBucket('mqtt');
```

The last step is to write the received message to the storage. We must use a callback
for event `message`, to catch it. Then we write the message to entry `mqtt_data`:

```javascript
mqttClient.on('message', async (topic, msg) => {
    const record = await bucket.beginWrite(topic);
    await record.write(msg)
    console.log('Received message "%s" from topic "%s" was written', data,
        topic);
});
```

When we call `bucket.beginWrite` we create an entry in the bucket if it doesn't exist yet. Then we write data to the
entry with the current timestamp. Now our MQTT data is safe and sound in the storage, and we can access them by using
the same [SDK][2].

### Publish data to MQTT topic

When you launch the script, it does nothing because there is no data from MQTT. You have to publish something to topic
`mqtt_data`. I prefer to use [mosquitto_pub](https://mosquitto.org/man/mosquitto_pub-1.html). For Ubuntu users, it is a
part of the `mosquitto-clients` package:

```
$ sudo apt-get install mosquitto-clients
$ mosuitto_pub -t mqtt_data -m "Hello, world!"
```

### Getting data from ReductStore

Now you know how to get data from MQTT and write it to ReductStore, but we need a little NodejS script to read the data
from the storage:

```javascript
const {Client} = require('reduct-js');

const client = new Client('http://localhost:8383');

client.getBucket('mqtt').then(async (bucket) => {
    const record  = await bucket.beginRead('mqtt_data');
    console.log('Last record: %s', await record.readAsString());

    // Get data for lash hour
    const stopTime = BigInt(Date.now() * 1000);
    const startTime = stopTime - 3_600_000_000n;

    for await (const record of bucket.query('mqtt_data', startTime, stopTime)) {
        const data = await record.read();
        console.log('Found record "%s" with timestamp "%d"', data, record.time);
    }

}).catch(error => console.error(error));

```

To read the latest record in the entry is very easy:

```javascript
const record  = await bucket.beginRead('mqtt_data');
const data = await record.readAsString();
```

To take data for timeinterval, we can use the `query` method. It returns an async iterator, so we can use `for await`
loop to iterate over the records:

```javascript
const stopTime = BigInt(Date.now() * 1000);
const startTime = stopTime - 3_600_000_000n;

for await (const record of bucket.query('mqtt_data', startTime, stopTime)) {
    const data = await record.read();
    console.log('Found record "%s" with timestamp "%d"', data, record.time);
}
```

Pay attention, the storage uses timestamps with microsecond precision, so we can't use `Date` class and `number` type.
What is why we use `BigInt`.

### Conclusion

As you can see, the MQTT protocol and ReductStore very simple technologies that can be used together very easily in
NodeJS.
You can find the source code of the example [here][5]. If you have any questions or problems running it. Feel free to
make [an issue](https://github.com/reductstore/reduct-js/issues/new).

I hope this tutorial has been helpful. Thanks!

### Links

* [ReductStore][1]
* [JavaScript Client SDK][2]
* [Mosquitto MQTT Broker][3]
* [Full example on GitHub][5]

[1]:https://docs.reduct.store

[2]:https://js.reduct.store

[3]:https://mosquitto.org/

[4]:https://mqtt.org/

[5]:https://github.com/reductstore/reduct-mqtt-example