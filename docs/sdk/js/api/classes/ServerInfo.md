---
title: "Class: ServerInfo"
---

[**reduct-js**](../index.md)

***

[reduct-js](../index.md) / ServerInfo

# Class: ServerInfo

Defined in: [messages/ServerInfo.ts:39](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ServerInfo.ts#L39)

Represents information about storage

## Constructors

### Constructor

&gt; **new ServerInfo**(): `ServerInfo`

#### Returns

`ServerInfo`

## Properties

### bucketCount

&gt; `readonly` **bucketCount**: `bigint` = `0n`

Defined in: [messages/ServerInfo.ts:48](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ServerInfo.ts#L48)

Number of buckets

***

### defaults

&gt; `readonly` **defaults**: `ServerDefaults`

Defined in: [messages/ServerInfo.ts:78](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ServerInfo.ts#L78)

Default settings

***

### latestRecord

&gt; `readonly` **latestRecord**: `bigint` = `0n`

Defined in: [messages/ServerInfo.ts:68](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ServerInfo.ts#L68)

Unix timestamp of the latest record in microseconds

***

### license?

&gt; `readonly` `optional` **license**: [`LicenseInfo`](LicenseInfo.md)

Defined in: [messages/ServerInfo.ts:73](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ServerInfo.ts#L73)

License information

***

### oldestRecord

&gt; `readonly` **oldestRecord**: `bigint` = `0n`

Defined in: [messages/ServerInfo.ts:63](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ServerInfo.ts#L63)

Unix timestamp of the oldest record in microseconds

***

### uptime

&gt; `readonly` **uptime**: `bigint` = `0n`

Defined in: [messages/ServerInfo.ts:58](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ServerInfo.ts#L58)

Server uptime in seconds

***

### usage

&gt; `readonly` **usage**: `bigint` = `0n`

Defined in: [messages/ServerInfo.ts:53](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ServerInfo.ts#L53)

Stored data in bytes

***

### version

&gt; `readonly` **version**: `string` = `""`

Defined in: [messages/ServerInfo.ts:43](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ServerInfo.ts#L43)

Version storage server

## Methods

### parse()

&gt; `static` **parse**(`data`): `ServerInfo`

Defined in: [messages/ServerInfo.ts:80](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/ServerInfo.ts#L80)

#### Parameters

##### data

`OriginalServerInfo`

#### Returns

`ServerInfo`
