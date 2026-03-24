---
title: "ReplicationSettings"
description: "API reference for the ReplicationSettings class in the ReductStore Client SDK for JavaScript."
---

<head>
  <link rel="canonical" href="https://www.reduct.store/docs/sdk/js/api/classes/ReplicationSettings" />
</head>

# ReplicationSettings

Defined in: [messages/ReplicationSettings.ts:24](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ReplicationSettings.ts#L24)

Replication settings

## Constructors

### Constructor

&gt; **new ReplicationSettings**(): `ReplicationSettings`

#### Returns

`ReplicationSettings`

## Properties

### dstBucket

&gt; `readonly` **dstBucket**: `string` = `""`

Defined in: [messages/ReplicationSettings.ts:33](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ReplicationSettings.ts#L33)

Destination bucket. Must exist.

---

### dstHost

&gt; `readonly` **dstHost**: `string` = `""`

Defined in: [messages/ReplicationSettings.ts:38](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ReplicationSettings.ts#L38)

Destination host. Must exist.

---

### dstToken?

&gt; `readonly` `optional` **dstToken**: `string`

Defined in: [messages/ReplicationSettings.ts:43](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ReplicationSettings.ts#L43)

Destination token. Must have write access to the destination bucket.

---

### entries

&gt; `readonly` **entries**: `string`[] = `[]`

Defined in: [messages/ReplicationSettings.ts:48](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ReplicationSettings.ts#L48)

List of entries to replicate. If empty, all entries are replicated. Wildcards are supported.

---

### mode?

&gt; `readonly` `optional` **mode**: [`ReplicationMode`](../type-aliases/ReplicationMode.md)

Defined in: [messages/ReplicationSettings.ts:58](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ReplicationSettings.ts#L58)

Replication mode

---

### srcBucket

&gt; `readonly` **srcBucket**: `string` = `""`

Defined in: [messages/ReplicationSettings.ts:28](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ReplicationSettings.ts#L28)

Source bucket. Must exist.

---

### when?

&gt; `readonly` `optional` **when**: `any`

Defined in: [messages/ReplicationSettings.ts:53](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ReplicationSettings.ts#L53)

Conditional query

## Methods

### parse()

&gt; `static` **parse**(`data`): `ReplicationSettings`

Defined in: [messages/ReplicationSettings.ts:60](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ReplicationSettings.ts#L60)

#### Parameters

##### data

`OriginalReplicationSettings`

#### Returns

`ReplicationSettings`

---

### serialize()

&gt; `static` **serialize**(`data`): `OriginalReplicationSettings`

Defined in: [messages/ReplicationSettings.ts:72](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ReplicationSettings.ts#L72)

#### Parameters

##### data

`ReplicationSettings`

#### Returns

`OriginalReplicationSettings`
