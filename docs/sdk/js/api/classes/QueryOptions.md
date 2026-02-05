---
title: "Class: QueryOptions"
---

[**reduct-js**](../index.md)

***

[reduct-js](../index.md) / QueryOptions

# Class: QueryOptions

Defined in: [messages/QueryEntry.ts:38](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/QueryEntry.ts#L38)

Options for querying records

## Constructors

### Constructor

&gt; **new QueryOptions**(): `QueryOptions`

#### Returns

`QueryOptions`

## Properties

### continuous?

&gt; `optional` **continuous**: `boolean`

Defined in: [messages/QueryEntry.ts:55](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/QueryEntry.ts#L55)

Don't stop query until TTL is reached

***

### eachN?

&gt; `optional` **eachN**: `number`

Defined in: [messages/QueryEntry.ts:48](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/QueryEntry.ts#L48)

Return only one record per N records
 @deprecated: use $each_n operator in when instead. Will be remove in v1.18.0

***

### eachS?

&gt; `optional` **eachS**: `number`

Defined in: [messages/QueryEntry.ts:44](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/QueryEntry.ts#L44)

Return only one record per S second
@deprecated: use $each_t operator in when instead. Will be remove in v1.18.0

***

### ext?

&gt; `optional` **ext**: `Record`\&lt;`string`, `any`\&gt;

Defined in: [messages/QueryEntry.ts:65](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/QueryEntry.ts#L65)

Additional parameters for extensions

***

### head?

&gt; `optional` **head**: `boolean`

Defined in: [messages/QueryEntry.ts:59](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/QueryEntry.ts#L59)

Return only metadata

***

### limit?

&gt; `optional` **limit**: `number`

Defined in: [messages/QueryEntry.ts:52](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/QueryEntry.ts#L52)

Limit number of records
 @deprecated: use $limit operator in when instead. Will be remove in v1.18.0

***

### pollInterval?

&gt; `optional` **pollInterval**: `number`

Defined in: [messages/QueryEntry.ts:57](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/QueryEntry.ts#L57)

Poll interval for new records only for continue=true

***

### strict?

&gt; `optional` **strict**: `boolean`

Defined in: [messages/QueryEntry.ts:63](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/QueryEntry.ts#L63)

strict conditional query

***

### ttl?

&gt; `optional` **ttl**: `number`

Defined in: [messages/QueryEntry.ts:40](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/QueryEntry.ts#L40)

Time to live in seconds

***

### when?

&gt; `optional` **when**: `Record`\&lt;`string`, `any`\&gt;

Defined in: [messages/QueryEntry.ts:61](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/QueryEntry.ts#L61)

Conditional query

## Methods

### serialize()

&gt; `static` **serialize**(`queryType`, `data`, `start?`, `stop?`, `entries?`): `QueryEntry`

Defined in: [messages/QueryEntry.ts:67](https://github.com/reductstore/reduct-js/blob/d0e71ee69ec952f8d0fc267548c514034a367605/src/messages/QueryEntry.ts#L67)

#### Parameters

##### queryType

`QueryType`

##### data

`QueryOptions`

##### start?

`bigint`

##### stop?

`bigint`

##### entries?

`string`[]

#### Returns

`QueryEntry`
