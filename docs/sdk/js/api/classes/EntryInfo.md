---
title: "EntryInfo"
description: "API reference for EntryInfo in the ReductStore Client SDK for JavaScript."
---

<head>
  <link rel="canonical" href="https://www.reduct.store/docs/sdk/js/api/classes/EntryInfo" />
</head>

# EntryInfo

Defined in: [messages/EntryInfo.ts:6](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/messages/EntryInfo.ts#L6)

Information about entry

## Constructors

### Constructor

&gt; **new EntryInfo**(): `EntryInfo`

#### Returns

`EntryInfo`

## Properties

### blockCount

&gt; `readonly` **blockCount**: `bigint` = `0n`

Defined in: [messages/EntryInfo.ts:15](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/messages/EntryInfo.ts#L15)

Number of blocks

***

### latestRecord

&gt; `readonly` **latestRecord**: `bigint` = `0n`

Defined in: [messages/EntryInfo.ts:35](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/messages/EntryInfo.ts#L35)

Unix timestamp of the latest record in microseconds

***

### name

&gt; `readonly` **name**: `string` = `""`

Defined in: [messages/EntryInfo.ts:10](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/messages/EntryInfo.ts#L10)

Name of the entry

***

### oldestRecord

&gt; `readonly` **oldestRecord**: `bigint` = `0n`

Defined in: [messages/EntryInfo.ts:30](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/messages/EntryInfo.ts#L30)

Unix timestamp of the oldest record in microseconds

***

### recordCount

&gt; `readonly` **recordCount**: `bigint` = `0n`

Defined in: [messages/EntryInfo.ts:20](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/messages/EntryInfo.ts#L20)

Number of records

***

### size

&gt; `readonly` **size**: `bigint` = `0n`

Defined in: [messages/EntryInfo.ts:25](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/messages/EntryInfo.ts#L25)

Size of stored data in the bucket in bytes

***

### status

&gt; `readonly` **status**: [`Status`](../enumerations/Status.md) = `Status.READY`

Defined in: [messages/EntryInfo.ts:40](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/messages/EntryInfo.ts#L40)

Current status of the entry (READY or DELETING)

## Methods

### parse()

&gt; `static` **parse**(`bucket`): `EntryInfo`

Defined in: [messages/EntryInfo.ts:42](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/messages/EntryInfo.ts#L42)

#### Parameters

##### bucket

`Original`

#### Returns

`EntryInfo`
