---
title: "TokenPermissions"
description: "API reference for TokenPermissions in the ReductStore Client SDK for JavaScript."
---

<head>
  <link rel="canonical" href="https://www.reduct.store/docs/sdk/js/api/classes/TokenPermissions" />
</head>

# TokenPermissions

Defined in: [messages/Token.ts:60](https://github.com/reductstore/reduct-js/blob/0ba222cb009ec7ac1d05ad403b39b66dc3bc7227/src/messages/Token.ts#L60)

Token Permissions

## Constructors

### Constructor

&gt; **new TokenPermissions**(): `TokenPermissions`

#### Returns

`TokenPermissions`

## Properties

### fullAccess

&gt; `readonly` **fullAccess**: `boolean` = `false`

Defined in: [messages/Token.ts:65](https://github.com/reductstore/reduct-js/blob/0ba222cb009ec7ac1d05ad403b39b66dc3bc7227/src/messages/Token.ts#L65)

Full access
The token allows to create, remove and update settings of buckets, manage tokens and read and write data.

***

### read?

&gt; `readonly` `optional` **read**: `string`[] = `[]`

Defined in: [messages/Token.ts:71](https://github.com/reductstore/reduct-js/blob/0ba222cb009ec7ac1d05ad403b39b66dc3bc7227/src/messages/Token.ts#L71)

Read access
List of buckets allowed to read

***

### write?

&gt; `readonly` `optional` **write**: `string`[] = `[]`

Defined in: [messages/Token.ts:77](https://github.com/reductstore/reduct-js/blob/0ba222cb009ec7ac1d05ad403b39b66dc3bc7227/src/messages/Token.ts#L77)

Write access
List of buckets allowed to write

## Methods

### parse()

&gt; `static` **parse**(`data`): `TokenPermissions`

Defined in: [messages/Token.ts:79](https://github.com/reductstore/reduct-js/blob/0ba222cb009ec7ac1d05ad403b39b66dc3bc7227/src/messages/Token.ts#L79)

#### Parameters

##### data

`OriginalTokenPermission`

#### Returns

`TokenPermissions`

***

### serialize()

&gt; `static` **serialize**(`data`): `OriginalTokenPermission`

Defined in: [messages/Token.ts:87](https://github.com/reductstore/reduct-js/blob/0ba222cb009ec7ac1d05ad403b39b66dc3bc7227/src/messages/Token.ts#L87)

#### Parameters

##### data

`TokenPermissions`

#### Returns

`OriginalTokenPermission`
