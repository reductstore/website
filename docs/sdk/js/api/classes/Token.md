---
title: "Token"
description: "API reference for Token in the ReductStore Client SDK for JavaScript."
---

<head>
  <link rel="canonical" href="https://www.reduct.store/docs/sdk/js/api/classes/Token" />
</head>

# Token

Defined in: [messages/Token.ts:114](https://github.com/reductstore/reduct-js/blob/e2b7a718b68db625d48f717e9082216ff8a962ad/src/messages/Token.ts#L114)

Information about an access token

## Constructors

### Constructor

&gt; **new Token**(): `Token`

#### Returns

`Token`

## Properties

### createdAt

&gt; `readonly` **createdAt**: `number` = `0`

Defined in: [messages/Token.ts:123](https://github.com/reductstore/reduct-js/blob/e2b7a718b68db625d48f717e9082216ff8a962ad/src/messages/Token.ts#L123)

Creation time of the token as unix timestamp in milliseconds

***

### expiresAt?

&gt; `readonly` `optional` **expiresAt**: `number`

Defined in: [messages/Token.ts:143](https://github.com/reductstore/reduct-js/blob/e2b7a718b68db625d48f717e9082216ff8a962ad/src/messages/Token.ts#L143)

Expiration time as unix timestamp in milliseconds

***

### ipAllowlist?

&gt; `readonly` `optional` **ipAllowlist**: `string`[]

Defined in: [messages/Token.ts:148](https://github.com/reductstore/reduct-js/blob/e2b7a718b68db625d48f717e9082216ff8a962ad/src/messages/Token.ts#L148)

List of IP addresses and CIDR ranges allowed to use the token

***

### isExpired?

&gt; `readonly` `optional` **isExpired**: `boolean`

Defined in: [messages/Token.ts:138](https://github.com/reductstore/reduct-js/blob/e2b7a718b68db625d48f717e9082216ff8a962ad/src/messages/Token.ts#L138)

True if the token is expired

***

### isProvisioned?

&gt; `readonly` `optional` **isProvisioned**: `boolean` = `false`

Defined in: [messages/Token.ts:153](https://github.com/reductstore/reduct-js/blob/e2b7a718b68db625d48f717e9082216ff8a962ad/src/messages/Token.ts#L153)

Is the token provisioned, and you can't remove it or change it

***

### lastAccess?

&gt; `readonly` `optional` **lastAccess**: `number`

Defined in: [messages/Token.ts:128](https://github.com/reductstore/reduct-js/blob/e2b7a718b68db625d48f717e9082216ff8a962ad/src/messages/Token.ts#L128)

Last access time of the token as unix timestamp in milliseconds

***

### name

&gt; `readonly` **name**: `string` = `""`

Defined in: [messages/Token.ts:118](https://github.com/reductstore/reduct-js/blob/e2b7a718b68db625d48f717e9082216ff8a962ad/src/messages/Token.ts#L118)

Name of the token

***

### permissions?

&gt; `readonly` `optional` **permissions**: [`TokenPermissions`](TokenPermissions.md)

Defined in: [messages/Token.ts:158](https://github.com/reductstore/reduct-js/blob/e2b7a718b68db625d48f717e9082216ff8a962ad/src/messages/Token.ts#L158)

Permissions of the token

***

### ttl?

&gt; `readonly` `optional` **ttl**: `number`

Defined in: [messages/Token.ts:133](https://github.com/reductstore/reduct-js/blob/e2b7a718b68db625d48f717e9082216ff8a962ad/src/messages/Token.ts#L133)

Time to live in seconds

## Methods

### parse()

&gt; `static` **parse**(`data`): `Token`

Defined in: [messages/Token.ts:160](https://github.com/reductstore/reduct-js/blob/e2b7a718b68db625d48f717e9082216ff8a962ad/src/messages/Token.ts#L160)

#### Parameters

##### data

`OriginalTokenInfo`

#### Returns

`Token`
