---
title: "BucketInfo"
description: "API reference for BucketInfo in the ReductStore Client SDK for JavaScript."
---

<head>
  <link rel="canonical" href="https://www.reduct.store/docs/sdk/js/api/classes/BucketInfo" />
</head>

# BucketInfo

Defined in: [messages/BucketInfo.ts:6](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/BucketInfo.ts#L6)

Represents information about a bucket

## Constructors

### Constructor

&gt; **new BucketInfo**(): `BucketInfo`

#### Returns

`BucketInfo`

## Properties

### entryCount

&gt; `readonly` **entryCount**: `bigint` = `0n`

Defined in: [messages/BucketInfo.ts:15](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/BucketInfo.ts#L15)

Number of entries in the bucket

***

### isProvisioned?

&gt; `readonly` `optional` **isProvisioned**: `boolean` = `false`

Defined in: [messages/BucketInfo.ts:35](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/BucketInfo.ts#L35)

Is the bucket provisioned, and you can't remove it or change its settings

***

### latestRecord

&gt; `readonly` **latestRecord**: `bigint` = `0n`

Defined in: [messages/BucketInfo.ts:30](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/BucketInfo.ts#L30)

Unix timestamp of the latest record in microseconds

***

### name

&gt; `readonly` **name**: `string` = `""`

Defined in: [messages/BucketInfo.ts:10](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/BucketInfo.ts#L10)

Name of the bucket

***

### oldestRecord

&gt; `readonly` **oldestRecord**: `bigint` = `0n`

Defined in: [messages/BucketInfo.ts:25](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/BucketInfo.ts#L25)

Unix timestamp of the oldest record in microseconds

***

### size

&gt; `readonly` **size**: `bigint` = `0n`

Defined in: [messages/BucketInfo.ts:20](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/BucketInfo.ts#L20)

Size of stored data in the bucket in bytes

***

### status

&gt; `readonly` **status**: [`Status`](../enumerations/Status.md) = `Status.READY`

Defined in: [messages/BucketInfo.ts:40](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/BucketInfo.ts#L40)

Current status of the bucket (READY or DELETING)

## Methods

### parse()

&gt; `static` **parse**(`bucket`): `BucketInfo`

Defined in: [messages/BucketInfo.ts:42](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/BucketInfo.ts#L42)

#### Parameters

##### bucket

`OriginalBucketInfo`

#### Returns

`BucketInfo`
