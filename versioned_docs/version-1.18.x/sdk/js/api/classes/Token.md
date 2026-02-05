---
title: "Token"
description: "API reference for the Token class in the ReductStore Client SDK for JavaScript."
---
<head>
  <link rel="canonical" href="https://www.reduct.store/docs/sdk/js/api/classes/Token" />
</head>


# Token

Defined in: [messages/Token.ts:62](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/Token.ts#L62)

Information about an access token

## Constructors

### Constructor

&gt; **new Token**(): `Token`

#### Returns

`Token`

## Properties

### createdAt

&gt; `readonly` **createdAt**: `number` = `0`

Defined in: [messages/Token.ts:71](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/Token.ts#L71)

Creation time of the token as unix timestamp in milliseconds

***

### isProvisioned?

&gt; `readonly` `optional` **isProvisioned**: `boolean` = `false`

Defined in: [messages/Token.ts:76](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/Token.ts#L76)

Is the token provisioned, and you can't remove it or change it

***

### name

&gt; `readonly` **name**: `string` = `""`

Defined in: [messages/Token.ts:66](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/Token.ts#L66)

Name of the token

***

### permissions?

&gt; `readonly` `optional` **permissions**: [`TokenPermissions`](TokenPermissions.md)

Defined in: [messages/Token.ts:81](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/Token.ts#L81)

Permissions of the token

## Methods

### parse()

&gt; `static` **parse**(`data`): `Token`

Defined in: [messages/Token.ts:83](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/Token.ts#L83)

#### Parameters

##### data

`OriginalTokenInfo`

#### Returns

`Token`
