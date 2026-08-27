---
title: "ReplicationSettings"
description: "API reference for ReplicationSettings in the ReductStore Client SDK for JavaScript."
---

<head>
  <link rel="canonical" href="https://www.reduct.store/docs/sdk/js/api/classes/ReplicationSettings" />
</head>

# ReplicationSettings

Defined in: [messages/ReplicationSettings.ts:31](https://github.com/reductstore/reduct-js/blob/main/src/messages/ReplicationSettings.ts#L31)

Replication settings

## Constructors

### Constructor

&gt; **new ReplicationSettings**(): `ReplicationSettings`

#### Returns

`ReplicationSettings`

## Properties

### compression?

&gt; `readonly` `optional` **compression**: [`ReplicationCompression`](../type-aliases/ReplicationCompression.md)

Defined in: [messages/ReplicationSettings.ts:75](https://github.com/reductstore/reduct-js/blob/main/src/messages/ReplicationSettings.ts#L75)

Wire compression for replication batch payload transfer.

***

### dstBucket

&gt; `readonly` **dstBucket**: `string` = `""`

Defined in: [messages/ReplicationSettings.ts:40](https://github.com/reductstore/reduct-js/blob/main/src/messages/ReplicationSettings.ts#L40)

Destination bucket. Must exist.

***

### dstHost

&gt; `readonly` **dstHost**: `string` = `""`

Defined in: [messages/ReplicationSettings.ts:45](https://github.com/reductstore/reduct-js/blob/main/src/messages/ReplicationSettings.ts#L45)

Destination host. Must exist.

***

### dstPrefix?

&gt; `readonly` `optional` **dstPrefix**: `string`

Defined in: [messages/ReplicationSettings.ts:60](https://github.com/reductstore/reduct-js/blob/main/src/messages/ReplicationSettings.ts#L60)

Prefix to add to destination entry names.

***

### dstToken?

&gt; `readonly` `optional` **dstToken**: `string`

Defined in: [messages/ReplicationSettings.ts:50](https://github.com/reductstore/reduct-js/blob/main/src/messages/ReplicationSettings.ts#L50)

Destination token. Must have write access to the destination bucket.

***

### entries

&gt; `readonly` **entries**: `string`[] = `[]`

Defined in: [messages/ReplicationSettings.ts:55](https://github.com/reductstore/reduct-js/blob/main/src/messages/ReplicationSettings.ts#L55)

List of entries to replicate. If empty, all entries are replicated. Wildcards are supported.

***

### mode?

&gt; `readonly` `optional` **mode**: [`ReplicationMode`](../type-aliases/ReplicationMode.md)

Defined in: [messages/ReplicationSettings.ts:70](https://github.com/reductstore/reduct-js/blob/main/src/messages/ReplicationSettings.ts#L70)

Replication mode

***

### srcBucket

&gt; `readonly` **srcBucket**: `string` = `""`

Defined in: [messages/ReplicationSettings.ts:35](https://github.com/reductstore/reduct-js/blob/main/src/messages/ReplicationSettings.ts#L35)

Source bucket. Must exist.

***

### when?

&gt; `readonly` `optional` **when**: `any`

Defined in: [messages/ReplicationSettings.ts:65](https://github.com/reductstore/reduct-js/blob/main/src/messages/ReplicationSettings.ts#L65)

Conditional query

## Methods

### parse()

&gt; `static` **parse**(`data`): `ReplicationSettings`

Defined in: [messages/ReplicationSettings.ts:77](https://github.com/reductstore/reduct-js/blob/main/src/messages/ReplicationSettings.ts#L77)

#### Parameters

##### data

`OriginalReplicationSettings`

#### Returns

`ReplicationSettings`

***

### serialize()

&gt; `static` **serialize**(`data`): `OriginalReplicationSettings`

Defined in: [messages/ReplicationSettings.ts:91](https://github.com/reductstore/reduct-js/blob/main/src/messages/ReplicationSettings.ts#L91)

#### Parameters

##### data

`ReplicationSettings`

#### Returns

`OriginalReplicationSettings`
