---
title: "FullReplicationInfo"
description: "API reference for the FullReplicationInfo class in the ReductStore Client SDK for JavaScript."
---
<head>
  <link rel="canonical" href="https://www.reduct.store/docs/sdk/js/api/classes/FullReplicationInfo" />
</head>


# FullReplicationInfo

Defined in: [messages/ReplicationInfo.ts:66](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ReplicationInfo.ts#L66)

Replication full info

## Constructors

### Constructor

&gt; **new FullReplicationInfo**(): `FullReplicationInfo`

#### Returns

`FullReplicationInfo`

## Properties

### diagnostics

&gt; `readonly` **diagnostics**: `Diagnostics`

Defined in: [messages/ReplicationInfo.ts:80](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ReplicationInfo.ts#L80)

Replication statistics

***

### info

&gt; `readonly` **info**: [`ReplicationInfo`](ReplicationInfo.md)

Defined in: [messages/ReplicationInfo.ts:70](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ReplicationInfo.ts#L70)

Replication info

***

### settings

&gt; `readonly` **settings**: [`ReplicationSettings`](ReplicationSettings.md)

Defined in: [messages/ReplicationInfo.ts:75](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ReplicationInfo.ts#L75)

Replication settings

## Methods

### parse()

&gt; `static` **parse**(`data`): `FullReplicationInfo`

Defined in: [messages/ReplicationInfo.ts:82](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ReplicationInfo.ts#L82)

#### Parameters

##### data

`FullReplicationInfoResponse`

#### Returns

`FullReplicationInfo`
