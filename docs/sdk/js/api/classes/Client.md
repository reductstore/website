---
title: "Client"
description: "API reference for Client in the ReductStore Client SDK for JavaScript."
---

<head>
  <link rel="canonical" href="https://www.reduct.store/docs/sdk/js/api/classes/Client" />
</head>

# Client

Defined in: [Client.ts:51](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L51)

## Constructors

### Constructor

&gt; **new Client**(`url`, `options`): `Client`

Defined in: [Client.ts:59](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L59)

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

Defined in: [Client.ts:76](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L76)

Close underlying HTTP resources (Node.js only).

#### Returns

`Promise`\&lt;`void`\&gt;

***

### createBucket()

&gt; **createBucket**(`name`, `settings?`): `Promise`\&lt;[`Bucket`](Bucket.md)\&gt;

Defined in: [Client.ts:99](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L99)

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

### createLifecycle()

&gt; **createLifecycle**(`name`, `settings`): `Promise`\&lt;`void`\&gt;

Defined in: [Client.ts:328](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L328)

Create a new lifecycle policy

#### Parameters

##### name

`string`

name of the lifecycle policy

##### settings

[`LifecycleSettings`](LifecycleSettings.md)

settings of the lifecycle policy

#### Returns

`Promise`\&lt;`void`\&gt;

***

### createReplication()

&gt; **createReplication**(`name`, `settings`): `Promise`\&lt;`void`\&gt;

Defined in: [Client.ts:254](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L254)

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

Defined in: [Client.ts:149](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L149)

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

### deleteLifecycle()

&gt; **deleteLifecycle**(`name`): `Promise`\&lt;`void`\&gt;

Defined in: [Client.ts:369](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L369)

Delete a lifecycle policy

#### Parameters

##### name

`string`

name of the lifecycle policy

#### Returns

`Promise`\&lt;`void`\&gt;

***

### deleteReplication()

&gt; **deleteReplication**(`name`): `Promise`\&lt;`void`\&gt;

Defined in: [Client.ts:295](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L295)

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

Defined in: [Client.ts:210](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L210)

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

Defined in: [Client.ts:112](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L112)

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

Defined in: [Client.ts:86](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L86)

Get list of buckets

#### Returns

`Promise`\&lt;[`BucketInfo`](BucketInfo.md)[]\&gt;

#### Async

#### See

BucketInfo

***

### getInfo()

&gt; **getInfo**(): `Promise`\&lt;[`ServerInfo`](ServerInfo.md)\&gt;

Defined in: [Client.ts:68](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L68)

Get server information

#### Returns

`Promise`\&lt;[`ServerInfo`](ServerInfo.md)\&gt;

the data about the server

#### Async

***

### getLifecycle()

&gt; **getLifecycle**(`name`): `Promise`\&lt;[`FullLifecycleInfo`](FullLifecycleInfo.md)\&gt;

Defined in: [Client.ts:315](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L315)

Get full information about a lifecycle policy

#### Parameters

##### name

`string`

name of the lifecycle policy

#### Returns

`Promise`\&lt;[`FullLifecycleInfo`](FullLifecycleInfo.md)\&gt;

the lifecycle policy

***

### getLifecycleList()

&gt; **getLifecycleList**(): `Promise`\&lt;[`LifecycleInfo`](LifecycleInfo.md)[]\&gt;

Defined in: [Client.ts:303](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L303)

Get the list of lifecycle policies

#### Returns

`Promise`\&lt;[`LifecycleInfo`](LifecycleInfo.md)[]\&gt;

the list of lifecycle policies

***

### getOrCreateBucket()

&gt; **getOrCreateBucket**(`name`, `settings?`): `Promise`\&lt;[`Bucket`](Bucket.md)\&gt;

Defined in: [Client.ts:123](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L123)

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

Defined in: [Client.ts:241](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L241)

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

Defined in: [Client.ts:227](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L227)

Get the list of replications

#### Returns

`Promise`\&lt;[`ReplicationInfo`](ReplicationInfo.md)[]\&gt;

the list of replications

***

### getToken()

&gt; **getToken**(`name`): `Promise`\&lt;[`Token`](Token.md)\&gt;

Defined in: [Client.ts:188](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L188)

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

Defined in: [Client.ts:199](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L199)

List all tokens

#### Returns

`Promise`\&lt;[`Token`](Token.md)[]\&gt;

the list of tokens

***

### me()

&gt; **me**(): `Promise`\&lt;[`Token`](Token.md)\&gt;

Defined in: [Client.ts:218](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L218)

Get current API token and its permissions

#### Returns

`Promise`\&lt;[`Token`](Token.md)\&gt;

the token

***

### rotateToken()

&gt; **rotateToken**(`name`): `Promise`\&lt;`string`\&gt;

Defined in: [Client.ts:175](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L175)

Rotate a token by name

#### Parameters

##### name

`string`

name of the token

#### Returns

`Promise`\&lt;`string`\&gt;

new token value

***

### setLifecycleMode()

&gt; **setLifecycleMode**(`name`, `mode`): `Promise`\&lt;`void`\&gt;

Defined in: [Client.ts:360](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L360)

Update lifecycle mode without changing settings

#### Parameters

##### name

`string`

name of the lifecycle policy

##### mode

[`LifecycleMode`](../type-aliases/LifecycleMode.md)

new mode: enabled, disabled, or dry_run

#### Returns

`Promise`\&lt;`void`\&gt;

***

### setReplicationMode()

&gt; **setReplicationMode**(`name`, `mode`): `Promise`\&lt;`void`\&gt;

Defined in: [Client.ts:286](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L286)

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

### updateLifecycle()

&gt; **updateLifecycle**(`name`, `settings`): `Promise`\&lt;`void`\&gt;

Defined in: [Client.ts:344](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L344)

Update a lifecycle policy

#### Parameters

##### name

`string`

name of the lifecycle policy

##### settings

[`LifecycleSettings`](LifecycleSettings.md)

settings of the lifecycle policy

#### Returns

`Promise`\&lt;`void`\&gt;

***

### updateReplication()

&gt; **updateReplication**(`name`, `settings`): `Promise`\&lt;`void`\&gt;

Defined in: [Client.ts:270](https://github.com/reductstore/reduct-js/blob/main/src/Client.ts#L270)

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
