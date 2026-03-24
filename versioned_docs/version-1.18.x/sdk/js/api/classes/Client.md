---
title: "Client"
description: "API reference for the Client class in the ReductStore Client SDK for JavaScript."
---

<head>
  <link rel="canonical" href="https://www.reduct.store/docs/sdk/js/api/classes/Client" />
</head>

# Client

Defined in: [Client.ts:31](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Client.ts#L31)

## Constructors

### Constructor

&gt; **new Client**(`url`, `options`): `Client`

Defined in: [Client.ts:39](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Client.ts#L39)

HTTP Client for ReductStore

#### Parameters

##### url

`string`

URL to the storage

##### options

`ClientOptions` = `&#123;&#125;`

#### Returns

`Client`

## Methods

### close()

&gt; **close**(): `Promise`\&lt;`void`\&gt;

Defined in: [Client.ts:56](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Client.ts#L56)

Close underlying HTTP resources (Node.js only).

#### Returns

`Promise`\&lt;`void`\&gt;

---

### createBucket()

&gt; **createBucket**(`name`, `settings?`): `Promise`\&lt;[`Bucket`](Bucket.md)\&gt;

Defined in: [Client.ts:79](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Client.ts#L79)

Create a new bucket

#### Parameters

##### name

`string`

name of the bucket

##### settings?

[`BucketSettings`](BucketSettings.md)

optional settings

#### Returns

`Promise`\&lt;[`Bucket`](Bucket.md)\&gt;

---

### createReplication()

&gt; **createReplication**(`name`, `settings`): `Promise`\&lt;`void`\&gt;

Defined in: [Client.ts:211](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Client.ts#L211)

Create a new replication

#### Parameters

##### name

`string`

name of the replication

##### settings

[`ReplicationSettings`](ReplicationSettings.md)

settings of the replication

#### Returns

`Promise`\&lt;`void`\&gt;

---

### createToken()

&gt; **createToken**(`name`, `permissions`): `Promise`\&lt;`string`\&gt;

Defined in: [Client.ts:129](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Client.ts#L129)

Create a new access token

#### Parameters

##### name

`string`

name of the token

##### permissions

[`TokenPermissions`](TokenPermissions.md)

permissions for the token

#### Returns

`Promise`\&lt;`string`\&gt;

the token

#### Example

```ts
const token = await client.createToken("my-token", { fullAccess: true });
const client = new Client("https://play.storage-reduct.dev", {
  apiToken: token,
});
```

---

### deleteReplication()

&gt; **deleteReplication**(`name`): `Promise`\&lt;`void`\&gt;

Defined in: [Client.ts:252](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Client.ts#L252)

Delete a replication

#### Parameters

##### name

`string`

name of the replication

#### Returns

`Promise`\&lt;`void`\&gt;

---

### deleteToken()

&gt; **deleteToken**(`name`): `Promise`\&lt;`void`\&gt;

Defined in: [Client.ts:167](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Client.ts#L167)

Delete a token by name

#### Parameters

##### name

`string`

name of the token

#### Returns

`Promise`\&lt;`void`\&gt;

---

### getBucket()

&gt; **getBucket**(`name`): `Promise`\&lt;[`Bucket`](Bucket.md)\&gt;

Defined in: [Client.ts:92](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Client.ts#L92)

Get a bucket by name

#### Parameters

##### name

`string`

name of the bucket

#### Returns

`Promise`\&lt;[`Bucket`](Bucket.md)\&gt;

---

### getBucketList()

&gt; **getBucketList**(): `Promise`\&lt;[`BucketInfo`](BucketInfo.md)[]\&gt;

Defined in: [Client.ts:66](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Client.ts#L66)

Get list of buckets

#### Returns

`Promise`\&lt;[`BucketInfo`](BucketInfo.md)[]\&gt;

#### Async

#### See

BucketInfo

---

### getInfo()

&gt; **getInfo**(): `Promise`\&lt;[`ServerInfo`](ServerInfo.md)\&gt;

Defined in: [Client.ts:48](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Client.ts#L48)

Get server information

#### Returns

`Promise`\&lt;[`ServerInfo`](ServerInfo.md)\&gt;

the data about the server

#### Async

---

### getOrCreateBucket()

&gt; **getOrCreateBucket**(`name`, `settings?`): `Promise`\&lt;[`Bucket`](Bucket.md)\&gt;

Defined in: [Client.ts:103](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Client.ts#L103)

Try to create a bucket and get it if it already exists

#### Parameters

##### name

`string`

name of the bucket

##### settings?

[`BucketSettings`](BucketSettings.md)

optional settings

#### Returns

`Promise`\&lt;[`Bucket`](Bucket.md)\&gt;

---

### getReplication()

&gt; **getReplication**(`name`): `Promise`\&lt;[`FullReplicationInfo`](FullReplicationInfo.md)\&gt;

Defined in: [Client.ts:198](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Client.ts#L198)

Get full information about a replication

#### Parameters

##### name

`string`

name of the replication

#### Returns

`Promise`\&lt;[`FullReplicationInfo`](FullReplicationInfo.md)\&gt;

the replication

---

### getReplicationList()

&gt; **getReplicationList**(): `Promise`\&lt;[`ReplicationInfo`](ReplicationInfo.md)[]\&gt;

Defined in: [Client.ts:184](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Client.ts#L184)

Get the list of replications

#### Returns

`Promise`\&lt;[`ReplicationInfo`](ReplicationInfo.md)[]\&gt;

the list of replications

---

### getToken()

&gt; **getToken**(`name`): `Promise`\&lt;[`Token`](Token.md)\&gt;

Defined in: [Client.ts:145](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Client.ts#L145)

Get a token by name

#### Parameters

##### name

`string`

name of the token

#### Returns

`Promise`\&lt;[`Token`](Token.md)\&gt;

the token

---

### getTokenList()

&gt; **getTokenList**(): `Promise`\&lt;[`Token`](Token.md)[]\&gt;

Defined in: [Client.ts:156](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Client.ts#L156)

List all tokens

#### Returns

`Promise`\&lt;[`Token`](Token.md)[]\&gt;

the list of tokens

---

### me()

&gt; **me**(): `Promise`\&lt;[`Token`](Token.md)\&gt;

Defined in: [Client.ts:175](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Client.ts#L175)

Get current API token and its permissions

#### Returns

`Promise`\&lt;[`Token`](Token.md)\&gt;

the token

---

### setReplicationMode()

&gt; **setReplicationMode**(`name`, `mode`): `Promise`\&lt;`void`\&gt;

Defined in: [Client.ts:243](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Client.ts#L243)

Update replication mode without changing settings

#### Parameters

##### name

`string`

name of the replication

##### mode

[`ReplicationMode`](../type-aliases/ReplicationMode.md)

new mode: enabled, paused, or disabled

#### Returns

`Promise`\&lt;`void`\&gt;

---

### updateReplication()

&gt; **updateReplication**(`name`, `settings`): `Promise`\&lt;`void`\&gt;

Defined in: [Client.ts:227](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Client.ts#L227)

Update a replication

#### Parameters

##### name

`string`

name of the replication

##### settings

[`ReplicationSettings`](ReplicationSettings.md)

settings of the replication

#### Returns

`Promise`\&lt;`void`\&gt;
