---
title: "APIError"
description: "API reference for APIError in the ReductStore Client SDK for JavaScript."
---

<head>
  <link rel="canonical" href="https://www.reduct.store/docs/sdk/js/api/classes/APIError" />
</head>

# APIError

Defined in: [APIError.ts:4](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/APIError.ts#L4)

Represents HTTP Error

## Constructors

### Constructor

&gt; **new APIError**(`message`, `status?`, `original?`): `APIError`

Defined in: [APIError.ts:23](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/APIError.ts#L23)

Create an error from HTTP status and message

#### Parameters

##### message

`string`

##### status?

`number`

##### original?

`unknown`

#### Returns

`APIError`

## Properties

### message?

&gt; `optional` **message**: `string`

Defined in: [APIError.ts:13](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/APIError.ts#L13)

Parsed message from the storage engine

***

### original?

&gt; `optional` **original**: `unknown`

Defined in: [APIError.ts:18](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/APIError.ts#L18)

Original error from HTTP client with the full information

***

### status?

&gt; `optional` **status**: `number`

Defined in: [APIError.ts:8](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/APIError.ts#L8)

HTTP status of error. If it is empty, it means communication problem
