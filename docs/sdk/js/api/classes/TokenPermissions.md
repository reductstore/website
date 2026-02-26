---
title: "TokenPermissions"
description: "API reference for TokenPermissions in the ReductStore Client SDK for JavaScript."
---

<head>
  <link rel="canonical" href="https://www.reduct.store/docs/sdk/js/api/classes/TokenPermissions" />
</head>

# TokenPermissions

Defined in: [messages/Token.ts:13](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/messages/Token.ts#L13)

Token Permissions

## Constructors

### Constructor

&gt; **new TokenPermissions**(): `TokenPermissions`

#### Returns

`TokenPermissions`

## Properties

### fullAccess

&gt; `readonly` **fullAccess**: `boolean` = `false`

Defined in: [messages/Token.ts:18](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/messages/Token.ts#L18)

Full access
The token allows to create, remove and update settings of buckets, manage tokens and read and write data.

***

### read?

&gt; `readonly` `optional` **read**: `string`[] = `[]`

Defined in: [messages/Token.ts:24](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/messages/Token.ts#L24)

Read access
List of buckets allowed to read

***

### write?

&gt; `readonly` `optional` **write**: `string`[] = `[]`

Defined in: [messages/Token.ts:30](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/messages/Token.ts#L30)

Write access
List of buckets allowed to write

## Methods

### parse()

&gt; `static` **parse**(`data`): `TokenPermissions`

Defined in: [messages/Token.ts:32](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/messages/Token.ts#L32)

#### Parameters

##### data

`OriginalTokenPermission`

#### Returns

`TokenPermissions`

***

### serialize()

&gt; `static` **serialize**(`data`): `OriginalTokenPermission`

Defined in: [messages/Token.ts:40](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/messages/Token.ts#L40)

#### Parameters

##### data

`TokenPermissions`

#### Returns

`OriginalTokenPermission`
