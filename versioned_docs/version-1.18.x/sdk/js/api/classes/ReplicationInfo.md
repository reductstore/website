---
title: "ReplicationInfo"
description: "API reference for the ReplicationInfo class in the ReductStore Client SDK for JavaScript."
---

<head>
  <link rel="canonical" href="https://www.reduct.store/docs/sdk/js/api/classes/ReplicationInfo" />
</head>

# ReplicationInfo

Defined in: [messages/ReplicationInfo.ts:26](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ReplicationInfo.ts#L26)

Replication info

## Constructors

### Constructor

&gt; **new ReplicationInfo**(): `ReplicationInfo`

#### Returns

`ReplicationInfo`

## Properties

### isActive

&gt; `readonly` **isActive**: `boolean` = `false`

Defined in: [messages/ReplicationInfo.ts:35](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ReplicationInfo.ts#L35)

Remote instance is available and replication is active

---

### isProvisioned

&gt; `readonly` **isProvisioned**: `boolean` = `false`

Defined in: [messages/ReplicationInfo.ts:45](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ReplicationInfo.ts#L45)

Replication is provisioned

---

### mode

&gt; `readonly` **mode**: [`ReplicationMode`](../type-aliases/ReplicationMode.md) = `DEFAULT_REPLICATION_MODE`

Defined in: [messages/ReplicationInfo.ts:40](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ReplicationInfo.ts#L40)

Replication mode

---

### name

&gt; `readonly` **name**: `string` = `""`

Defined in: [messages/ReplicationInfo.ts:30](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ReplicationInfo.ts#L30)

Replication name

---

### pendingRecords

&gt; `readonly` **pendingRecords**: `bigint` = `0n`

Defined in: [messages/ReplicationInfo.ts:50](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ReplicationInfo.ts#L50)

Number of records pending replication

## Methods

### parse()

&gt; `static` **parse**(`data`): `ReplicationInfo`

Defined in: [messages/ReplicationInfo.ts:52](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ReplicationInfo.ts#L52)

#### Parameters

##### data

`OriginalReplicationInfo`

#### Returns

`ReplicationInfo`
