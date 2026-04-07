---
title: "Client"
description: "API reference for Client in the ReductStore Client SDK for JavaScript."
---

<head>
  <link rel="canonical" href="https://www.reduct.store/docs/sdk/js/api/classes/Client" />
</head>

# Client

Defined in: [Client.ts:43](https://github.com/reductstore/reduct-js/blob/6af4865c74b7835a84d71904de4c1e108e52ea01/src/Client.ts#L43)

## Constructors

### Constructor

&gt; **new Client**(`url`, `options`): `Client`

Defined in: [Client.ts:51](https://github.com/reductstore/reduct-js/blob/6af4865c74b7835a84d71904de4c1e108e52ea01/src/Client.ts#L51)

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

Defined in: [Client.ts:68](https://github.com/reductstore/reduct-js/blob/6af4865c74b7835a84d71904de4c1e108e52ea01/src/Client.ts#L68)

Close underlying HTTP resources (Node.js only).

#### Returns

`Promise`\&lt;`void`\&gt;

***

### createBucket()

&gt; **createBucket**(`name`, `settings?`): `Promise`\&lt;[`Bucket`](Bucket.md)\&gt;

Defined in: [Client.ts:91](https://github.com/reductstore/reduct-js/blob/6af4865c74b7835a84d71904de4c1e108e52ea01/src/Client.ts#L91)

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

***

### createReplication()

&gt; **createReplication**(`name`, `settings`): `Promise`\&lt;`void`\&gt;

Defined in: [Client.ts:246](https://github.com/reductstore/reduct-js/blob/6af4865c74b7835a84d71904de4c1e108e52ea01/src/Client.ts#L246)

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

***

### createToken()

&gt; **createToken**(`name`, `permissionsOrRequest`): `Promise`\&lt;`string`\&gt;

Defined in: [Client.ts:141](https://github.com/reductstore/reduct-js/blob/6af4865c74b7835a84d71904de4c1e108e52ea01/src/Client.ts#L141)

Create a new access token

#### Parameters

##### name

`string`

name of the token

##### permissionsOrRequest

permissions or token create request

[`TokenPermissions`](TokenPermissions.md) | [`TokenCreateRequest`](TokenCreateRequest.md)

#### Returns

`Promise`\&lt;`string`\&gt;

the token

#### Example

```ts
const token = await client.createToken("my-token", {fullAccess: true});
const client = new Client("https://play.storage-reduct.dev", {apiToken: token});
```

***

### deleteReplication()

&gt; **deleteReplication**(`name`): `Promise`\&lt;`void`\&gt;

Defined in: [Client.ts:287](https://github.com/reductstore/reduct-js/blob/6af4865c74b7835a84d71904de4c1e108e52ea01/src/Client.ts#L287)

Delete a replication

#### Parameters

##### name

`string`

name of the replication

#### Returns

`Promise`\&lt;`void`\&gt;

***

### deleteToken()

&gt; **deleteToken**(`name`): `Promise`\&lt;`void`\&gt;

Defined in: [Client.ts:202](https://github.com/reductstore/reduct-js/blob/6af4865c74b7835a84d71904de4c1e108e52ea01/src/Client.ts#L202)

Delete a token by name

#### Parameters

##### name

`string`

name of the token

#### Returns

`Promise`\&lt;`void`\&gt;

***

### getBucket()

&gt; **getBucket**(`name`): `Promise`\&lt;[`Bucket`](Bucket.md)\&gt;

Defined in: [Client.ts:104](https://github.com/reductstore/reduct-js/blob/6af4865c74b7835a84d71904de4c1e108e52ea01/src/Client.ts#L104)

Get a bucket by name

#### Parameters

##### name

`string`

name of the bucket

#### Returns

`Promise`\&lt;[`Bucket`](Bucket.md)\&gt;

***

### getBucketList()

&gt; **getBucketList**(): `Promise`\&lt;[`BucketInfo`](BucketInfo.md)[]\&gt;

Defined in: [Client.ts:78](https://github.com/reductstore/reduct-js/blob/6af4865c74b7835a84d71904de4c1e108e52ea01/src/Client.ts#L78)

Get list of buckets

#### Returns

`Promise`\&lt;[`BucketInfo`](BucketInfo.md)[]\&gt;

#### Async

#### See

BucketInfo

***

### getInfo()

&gt; **getInfo**(): `Promise`\&lt;[`ServerInfo`](ServerInfo.md)\&gt;

Defined in: [Client.ts:60](https://github.com/reductstore/reduct-js/blob/6af4865c74b7835a84d71904de4c1e108e52ea01/src/Client.ts#L60)

Get server information

#### Returns

`Promise`\&lt;[`ServerInfo`](ServerInfo.md)\&gt;

the data about the server

#### Async

***

### getOrCreateBucket()

&gt; **getOrCreateBucket**(`name`, `settings?`): `Promise`\&lt;[`Bucket`](Bucket.md)\&gt;

Defined in: [Client.ts:115](https://github.com/reductstore/reduct-js/blob/6af4865c74b7835a84d71904de4c1e108e52ea01/src/Client.ts#L115)

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

***

### getReplication()

&gt; **getReplication**(`name`): `Promise`\&lt;[`FullReplicationInfo`](FullReplicationInfo.md)\&gt;

Defined in: [Client.ts:233](https://github.com/reductstore/reduct-js/blob/6af4865c74b7835a84d71904de4c1e108e52ea01/src/Client.ts#L233)

Get full information about a replication

#### Parameters

##### name

`string`

name of the replication

#### Returns

`Promise`\&lt;[`FullReplicationInfo`](FullReplicationInfo.md)\&gt;

the replication

***

### getReplicationList()

&gt; **getReplicationList**(): `Promise`\&lt;[`ReplicationInfo`](ReplicationInfo.md)[]\&gt;

Defined in: [Client.ts:219](https://github.com/reductstore/reduct-js/blob/6af4865c74b7835a84d71904de4c1e108e52ea01/src/Client.ts#L219)

Get the list of replications

#### Returns

`Promise`\&lt;[`ReplicationInfo`](ReplicationInfo.md)[]\&gt;

the list of replications

***

### getToken()

&gt; **getToken**(`name`): `Promise`\&lt;[`Token`](Token.md)\&gt;

Defined in: [Client.ts:180](https://github.com/reductstore/reduct-js/blob/6af4865c74b7835a84d71904de4c1e108e52ea01/src/Client.ts#L180)

Get a token by name

#### Parameters

##### name

`string`

name of the token

#### Returns

`Promise`\&lt;[`Token`](Token.md)\&gt;

the token

***

### getTokenList()

&gt; **getTokenList**(): `Promise`\&lt;[`Token`](Token.md)[]\&gt;

Defined in: [Client.ts:191](https://github.com/reductstore/reduct-js/blob/6af4865c74b7835a84d71904de4c1e108e52ea01/src/Client.ts#L191)

List all tokens

#### Returns

`Promise`\&lt;[`Token`](Token.md)[]\&gt;

the list of tokens

***

### me()

&gt; **me**(): `Promise`\&lt;[`Token`](Token.md)\&gt;

Defined in: [Client.ts:210](https://github.com/reductstore/reduct-js/blob/6af4865c74b7835a84d71904de4c1e108e52ea01/src/Client.ts#L210)

Get current API token and its permissions

#### Returns

`Promise`\&lt;[`Token`](Token.md)\&gt;

the token

***

### rotateToken()

&gt; **rotateToken**(`name`): `Promise`\&lt;`string`\&gt;

Defined in: [Client.ts:167](https://github.com/reductstore/reduct-js/blob/6af4865c74b7835a84d71904de4c1e108e52ea01/src/Client.ts#L167)

Rotate a token by name

#### Parameters

##### name

`string`

name of the token

#### Returns

`Promise`\&lt;`string`\&gt;

new token value

***

### setReplicationMode()

&gt; **setReplicationMode**(`name`, `mode`): `Promise`\&lt;`void`\&gt;

Defined in: [Client.ts:278](https://github.com/reductstore/reduct-js/blob/6af4865c74b7835a84d71904de4c1e108e52ea01/src/Client.ts#L278)

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

***

### updateReplication()

&gt; **updateReplication**(`name`, `settings`): `Promise`\&lt;`void`\&gt;

Defined in: [Client.ts:262](https://github.com/reductstore/reduct-js/blob/6af4865c74b7835a84d71904de4c1e108e52ea01/src/Client.ts#L262)

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
