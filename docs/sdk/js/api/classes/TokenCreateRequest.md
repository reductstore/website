---
title: "TokenCreateRequest"
description: "API reference for TokenCreateRequest in the ReductStore Client SDK for JavaScript."
---

<head>
  <link rel="canonical" href="https://www.reduct.store/docs/sdk/js/api/classes/TokenCreateRequest" />
</head>

# TokenCreateRequest

Defined in: [messages/Token.ts:23](https://github.com/reductstore/reduct-js/blob/0ba222cb009ec7ac1d05ad403b39b66dc3bc7227/src/messages/Token.ts#L23)

Token create request

## Constructors

### Constructor

&gt; **new TokenCreateRequest**(): `TokenCreateRequest`

#### Returns

`TokenCreateRequest`

## Properties

### expiresAt?

&gt; `readonly` `optional` **expiresAt**: `number`

Defined in: [messages/Token.ts:32](https://github.com/reductstore/reduct-js/blob/0ba222cb009ec7ac1d05ad403b39b66dc3bc7227/src/messages/Token.ts#L32)

Expiration time as unix timestamp in milliseconds

***

### ipAllowlist?

&gt; `readonly` `optional` **ipAllowlist**: `string`[]

Defined in: [messages/Token.ts:42](https://github.com/reductstore/reduct-js/blob/0ba222cb009ec7ac1d05ad403b39b66dc3bc7227/src/messages/Token.ts#L42)

List of IP addresses and CIDR ranges allowed to use the token

***

### permissions

&gt; `readonly` **permissions**: [`TokenPermissions`](TokenPermissions.md)

Defined in: [messages/Token.ts:27](https://github.com/reductstore/reduct-js/blob/0ba222cb009ec7ac1d05ad403b39b66dc3bc7227/src/messages/Token.ts#L27)

Permissions for the token

***

### ttl?

&gt; `readonly` `optional` **ttl**: `number`

Defined in: [messages/Token.ts:37](https://github.com/reductstore/reduct-js/blob/0ba222cb009ec7ac1d05ad403b39b66dc3bc7227/src/messages/Token.ts#L37)

Time to live in seconds

## Methods

### serialize()

&gt; `static` **serialize**(`data`): `OriginalTokenCreateRequest`

Defined in: [messages/Token.ts:44](https://github.com/reductstore/reduct-js/blob/0ba222cb009ec7ac1d05ad403b39b66dc3bc7227/src/messages/Token.ts#L44)

#### Parameters

##### data

`TokenCreateRequest`

#### Returns

`OriginalTokenCreateRequest`
