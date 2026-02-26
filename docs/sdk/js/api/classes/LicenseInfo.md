---
title: "LicenseInfo"
description: "API reference for LicenseInfo in the ReductStore Client SDK for JavaScript."
---

<head>
  <link rel="canonical" href="https://www.reduct.store/docs/sdk/js/api/classes/LicenseInfo" />
</head>

# LicenseInfo

Defined in: [messages/ServerInfo.ts:7](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/messages/ServerInfo.ts#L7)

## Constructors

### Constructor

&gt; **new LicenseInfo**(): `LicenseInfo`

#### Returns

`LicenseInfo`

## Properties

### deviceNumber

&gt; `readonly` **deviceNumber**: `number` = `0`

Defined in: [messages/ServerInfo.ts:17](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/messages/ServerInfo.ts#L17)

***

### diskQuota

&gt; `readonly` **diskQuota**: `number` = `0`

Defined in: [messages/ServerInfo.ts:19](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/messages/ServerInfo.ts#L19)

***

### expiryDate

&gt; `readonly` **expiryDate**: `number` = `0`

Defined in: [messages/ServerInfo.ts:13](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/messages/ServerInfo.ts#L13)

***

### fingerprint

&gt; `readonly` **fingerprint**: `string` = `"UNKNOWN"`

Defined in: [messages/ServerInfo.ts:21](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/messages/ServerInfo.ts#L21)

***

### invoice

&gt; `readonly` **invoice**: `string` = `"UNKNOWN"`

Defined in: [messages/ServerInfo.ts:11](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/messages/ServerInfo.ts#L11)

***

### licensee

&gt; `readonly` **licensee**: `string` = `"UNKNOWN"`

Defined in: [messages/ServerInfo.ts:9](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/messages/ServerInfo.ts#L9)

***

### plan

&gt; `readonly` **plan**: `string` = `"UNKNOWN"`

Defined in: [messages/ServerInfo.ts:15](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/messages/ServerInfo.ts#L15)

## Methods

### parse()

&gt; `static` **parse**(`data`): `LicenseInfo`

Defined in: [messages/ServerInfo.ts:23](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/messages/ServerInfo.ts#L23)

#### Parameters

##### data

`OriginalLicenseInfo`

#### Returns

`LicenseInfo`
