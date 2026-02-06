---
title: "Batch"
description: "API reference for Batch in the ReductStore Client SDK for JavaScript."
---

<head>
  <link rel="canonical" href="https://www.reduct.store/docs/sdk/js/api/classes/Batch" />
</head>

# Batch

Defined in: [Batch.ts:15](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Batch.ts#L15)

## Constructors

### Constructor

&gt; **new Batch**(`bucketName`, `entryName`, `httpClient`, `type`): `Batch`

Defined in: [Batch.ts:33](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Batch.ts#L33)

#### Parameters

##### bucketName

`string`

##### entryName

`string`

##### httpClient

`HttpClient`

##### type

`BatchType`

#### Returns

`Batch`

## Methods

### add()

&gt; **add**(`ts`, `data`, `contentType?`, `labels?`): `void`

Defined in: [Batch.ts:55](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Batch.ts#L55)

Add record to batch

#### Parameters

##### ts

`bigint`

timestamp of record as a UNIX timestamp in microseconds

##### data

`any`

&#123;Buffer | string&#125; data to write

##### contentType?

`string`

default: application/octet-stream

##### labels?

`LabelMap`

default: &#123;&#125;

#### Returns

`void`

***

### addOnlyLabels()

&gt; **addOnlyLabels**(`ts`, `labels`): `void`

Defined in: [Batch.ts:82](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Batch.ts#L82)

Add only labels to batch
Use for updating labels

#### Parameters

##### ts

`bigint`

timestamp of record as a UNIX timestamp in microseconds

##### labels

`LabelMap`

#### Returns

`void`

***

### addOnlyTimestamp()

&gt; **addOnlyTimestamp**(`ts`): `void`

Defined in: [Batch.ts:95](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Batch.ts#L95)

Add only timestamp to batch
Use for removing records

#### Parameters

##### ts

`bigint`

timestamp of record as a UNIX timestamp in microseconds

#### Returns

`void`

***

### clear()

&gt; **clear**(): `void`

Defined in: [Batch.ts:218](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Batch.ts#L218)

Clear batch

#### Returns

`void`

***

### items()

&gt; **items**(): `IterableIterator`\&lt;\[`bigint`, \&#123; `contentType`: `string`; `data`: `Buffer`; `labels`: `LabelMap`; \&#125;\]\&gt;

Defined in: [Batch.ts:184](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Batch.ts#L184)

Get records in batch sorted by timestamp

#### Returns

`IterableIterator`\&lt;\[`bigint`, \&#123; `contentType`: `string`; `data`: `Buffer`; `labels`: `LabelMap`; \&#125;\]\&gt;

***

### lastAccessTime()

&gt; **lastAccessTime**(): `number`

Defined in: [Batch.ts:204](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Batch.ts#L204)

Get last access time of batch

#### Returns

`number`

***

### recordCount()

&gt; **recordCount**(): `number`

Defined in: [Batch.ts:211](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Batch.ts#L211)

Get number of records in batch

#### Returns

`number`

***

### size()

&gt; **size**(): `bigint`

Defined in: [Batch.ts:197](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Batch.ts#L197)

Get total size of batch

#### Returns

`bigint`

***

### write()

&gt; **write**(): `Promise`\&lt;`Map`\&lt;`bigint`, [`APIError`](APIError.md)\&gt;\&gt;

Defined in: [Batch.ts:107](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/Batch.ts#L107)

Write batch to entry

#### Returns

`Promise`\&lt;`Map`\&lt;`bigint`, [`APIError`](APIError.md)\&gt;\&gt;
