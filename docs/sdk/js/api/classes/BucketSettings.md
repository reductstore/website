---
title: "BucketSettings"
description: "API reference for the BucketSettings class in the ReductStore Client SDK for JavaScript."
---
<head>
  <link rel="canonical" href="https://www.reduct.store/docs/sdk/js/api/classes/BucketSettings" />
</head>


# BucketSettings

Defined in: [messages/BucketSettings.ts:10](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/BucketSettings.ts#L10)

Represents bucket settings

## Constructors

### Constructor

&gt; **new BucketSettings**(): `BucketSettings`

#### Returns

`BucketSettings`

## Properties

### maxBlockRecords?

&gt; `readonly` `optional` **maxBlockRecords**: `bigint`

Defined in: [messages/BucketSettings.ts:19](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/BucketSettings.ts#L19)

Maximum number of records in a block

***

### maxBlockSize?

&gt; `readonly` `optional` **maxBlockSize**: `bigint`

Defined in: [messages/BucketSettings.ts:14](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/BucketSettings.ts#L14)

Maximal block size in a block

***

### quotaSize?

&gt; `readonly` `optional` **quotaSize**: `bigint`

Defined in: [messages/BucketSettings.ts:31](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/BucketSettings.ts#L31)

Quota size in bytes

***

### quotaType?

&gt; `readonly` `optional` **quotaType**: [`QuotaType`](../enumerations/QuotaType.md)

Defined in: [messages/BucketSettings.ts:26](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/BucketSettings.ts#L26)

Quota type. The storage supports two types:
  NONE: A bucket will consume the whole free disk space.
  FIFO: A bucket removes the oldest block of some entry, when it reaches the quota limit.

## Methods

### parse()

&gt; `static` **parse**(`data`): `BucketSettings`

Defined in: [messages/BucketSettings.ts:33](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/BucketSettings.ts#L33)

#### Parameters

##### data

`OriginalBucketSettings`

#### Returns

`BucketSettings`

***

### serialize()

&gt; `static` **serialize**(`settings`): `OriginalBucketSettings`

Defined in: [messages/BucketSettings.ts:46](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/BucketSettings.ts#L46)

#### Parameters

##### settings

`BucketSettings`

#### Returns

`OriginalBucketSettings`
