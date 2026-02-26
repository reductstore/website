---
title: "Bucket"
description: "API reference for Bucket in the ReductStore Client SDK for JavaScript."
---

<head>
  <link rel="canonical" href="https://www.reduct.store/docs/sdk/js/api/classes/Bucket" />
</head>

# Bucket

Defined in: [Bucket.ts:27](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L27)

Represents a bucket in ReductStore

## Constructors

### Constructor

&gt; **new Bucket**(`name`, `httpClient`): `Bucket`

Defined in: [Bucket.ts:38](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L38)

Create a bucket. Use Client.creatBucket or Client.getBucket instead it

#### Parameters

##### name

`string`

##### httpClient

`HttpClient`

#### Returns

`Bucket`

#### See

## Methods

### beginRead()

&gt; **beginRead**(`entry`, `ts?`, `head?`): `Promise`\&lt;`ReadableRecord`\&gt;

Defined in: [Bucket.ts:233](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L233)

Start reading a record from an entry

#### Parameters

##### entry

`string`

name of the entry

##### ts?

`bigint`

&#123;BigInt&#125; timestamp of record in microseconds. Get the latest one, if undefined

##### head?

`boolean`

&#123;boolean&#125; return only head of the record

#### Returns

`Promise`\&lt;`ReadableRecord`\&gt;

Promise&lt;ReadableRecord&gt;

***

### beginRemoveBatch()

&gt; **beginRemoveBatch**(`entry`): `Promise`\&lt;[`Batch`](Batch.md)\&gt;

Defined in: [Bucket.ts:121](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L121)

Remove a batch of records

#### Parameters

##### entry

`string`

&#123;string&#125; name of the entry

#### Returns

`Promise`\&lt;[`Batch`](Batch.md)\&gt;

***

### beginRemoveRecordBatch()

&gt; **beginRemoveRecordBatch**(): [`RecordBatch`](RecordBatch.md)

Defined in: [Bucket.ts:478](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L478)

Create a new batch for removing records across multiple entries.

#### Returns

[`RecordBatch`](RecordBatch.md)

***

### beginUpdateBatch()

&gt; **beginUpdateBatch**(`entry`): `Promise`\&lt;[`Batch`](Batch.md)\&gt;

Defined in: [Bucket.ts:459](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L459)

Create a new batch for updating records in the database.

#### Parameters

##### entry

`string`

#### Returns

`Promise`\&lt;[`Batch`](Batch.md)\&gt;

***

### beginUpdateRecordBatch()

&gt; **beginUpdateRecordBatch**(): [`RecordBatch`](RecordBatch.md)

Defined in: [Bucket.ts:471](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L471)

Create a new batch for updating records across multiple entries.

#### Returns

[`RecordBatch`](RecordBatch.md)

#### Example

```ts
const batch = bucket.beginUpdateRecordBatch();
batch.addOnlyLabels("entry-1", 1000n, { label1: "value1", label2: "" });
batch.addOnlyLabels("entry-2", 2000n, { label1: "value2" });
await batch.send();
```

***

### beginWrite()

&gt; **beginWrite**(`entry`, `options?`): `Promise`\&lt;`WritableRecord`\&gt;

Defined in: [Bucket.ts:184](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L184)

Start writing a record into an entry

#### Parameters

##### entry

`string`

name of the entry

##### options?

&#123;BigInt | WriteOptions&#125; timestamp in microseconds for the record or options. It is current time if undefined.

`bigint` | [`WriteOptions`](../interfaces/WriteOptions.md)

#### Returns

`Promise`\&lt;`WritableRecord`\&gt;

Promise&lt;WritableRecord&gt;

#### Example

```ts
const record = await bucket.beginWrite("entry", {
 ts: 12345667n
 labels: {label1: "value1", label2: "value2"}
 contentType: "text/plain"
);
await record.write("Hello!");
```

***

### beginWriteBatch()

&gt; **beginWriteBatch**(`entry`): `Promise`\&lt;[`Batch`](Batch.md)\&gt;

Defined in: [Bucket.ts:439](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L439)

Create a new batch for writing records to the database.

#### Parameters

##### entry

`string`

#### Returns

`Promise`\&lt;[`Batch`](Batch.md)\&gt;

***

### beginWriteRecordBatch()

&gt; **beginWriteRecordBatch**(): [`RecordBatch`](RecordBatch.md)

Defined in: [Bucket.ts:451](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L451)

Create a new batch for writing records to multiple entries.

#### Returns

[`RecordBatch`](RecordBatch.md)

#### Example

```ts
const batch = await bucket.beginWriteRecordBatch();
batch.add("entry-1", 1000n, "data");
batch.add("entry-2", 2000n, "data");
await batch.send();
```

***

### createQueryLink()

&gt; **createQueryLink**(`entry`, `start?`, `stop?`, `query?`, `recordIndex?`, `expireAt?`, `fileName?`, `baseUrl?`): `Promise`\&lt;`string`\&gt;

Defined in: [Bucket.ts:493](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L493)

Create a query link for downloading records

#### Parameters

##### entry

name of the entry or entries

`string` | `string`[]

##### start?

`bigint`

start point of the time period for the query

##### stop?

`bigint`

stop point of the time period for the query

##### query?

[`QueryOptions`](QueryOptions.md)

options for the query

##### recordIndex?

`number`

index of the record to download (0 for the first record, 1 for the second, etc.)

##### expireAt?

`Date`

expiration time of the link. Default is 24 hours from now

##### fileName?

`string`

name of the file to download. Default is `$&#123;entry&#125;_$&#123;recordIndex&#125;.bin` or `$&#123;bucket&#125;_$&#123;recordIndex&#125;.bin` for multi-entry

##### baseUrl?

`string`

base url for link generation. If not set, the server's base url will be used

#### Returns

`Promise`\&lt;`string`\&gt;

***

### getEntryList()

&gt; **getEntryList**(): `Promise`\&lt;[`EntryInfo`](EntryInfo.md)[]\&gt;

Defined in: [Bucket.ts:82](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L82)

Get entry list

#### Returns

`Promise`\&lt;[`EntryInfo`](EntryInfo.md)[]\&gt;

#### Async

***

### getInfo()

&gt; **getInfo**(): `Promise`\&lt;[`BucketInfo`](BucketInfo.md)\&gt;

Defined in: [Bucket.ts:72](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L72)

Get information about a bucket

#### Returns

`Promise`\&lt;[`BucketInfo`](BucketInfo.md)\&gt;

#### Async

***

### getName()

&gt; **getName**(): `string`

Defined in: [Bucket.ts:350](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L350)

#### Returns

`string`

***

### getSettings()

&gt; **getSettings**(): `Promise`\&lt;[`BucketSettings`](BucketSettings.md)\&gt;

Defined in: [Bucket.ts:50](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L50)

Get bucket settings

#### Returns

`Promise`\&lt;[`BucketSettings`](BucketSettings.md)\&gt;

#### Async

***

### query()

&gt; **query**(`entry`, `start?`, `stop?`, `options?`): `AsyncGenerator`\&lt;`ReadableRecord`\&gt;

Defined in: [Bucket.ts:295](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L295)

Query records for a time interval as generator

#### Parameters

##### entry

&#123;string | string[]&#125; name of the entry or entries

`string` | `string`[]

##### start?

`bigint`

&#123;BigInt&#125; start point of the time period

##### stop?

`bigint`

&#123;BigInt&#125; stop point of the time period

##### options?

[`QueryOptions`](QueryOptions.md)

&#123;QueryOptions&#125; options options for query

#### Returns

`AsyncGenerator`\&lt;`ReadableRecord`\&gt;

#### Example

```ts
for await (const record in bucket.query("entry-1", start, stop)) {
  console.log(record.ts, record.size);
  console.log(record.labels);
  const content = await record.read();
  // or use pipe
  const fileStream = fs.createWriteStream(`ts_${record.size}.txt`);
  record.pipe(fileStream);
}
```

***

### readAttachments()

&gt; **readAttachments**(`entry`): `Promise`\&lt;`Record`\&lt;`string`, `unknown`\&gt;\&gt;

Defined in: [Bucket.ts:580](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L580)

Read attachments from an entry.

#### Parameters

##### entry

`string`

name of the source entry

#### Returns

`Promise`\&lt;`Record`\&lt;`string`, `unknown`\&gt;\&gt;

map of attachment key to decoded JSON value

***

### remove()

&gt; **remove**(): `Promise`\&lt;`void`\&gt;

Defined in: [Bucket.ts:94](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L94)

Remove bucket

#### Returns

`Promise`\&lt;`void`\&gt;

#### Async

***

### removeAttachments()

&gt; **removeAttachments**(`entry`, `attachmentKeys?`): `Promise`\&lt;`void`\&gt;

Defined in: [Bucket.ts:604](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L604)

Remove attachments from an entry.

If `attachmentKeys` is omitted, remove all attachments.

#### Parameters

##### entry

`string`

name of the source entry

##### attachmentKeys?

`string`[]

list of keys to remove

#### Returns

`Promise`\&lt;`void`\&gt;

***

### removeEntry()

&gt; **removeEntry**(`entry`): `Promise`\&lt;`void`\&gt;

Defined in: [Bucket.ts:104](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L104)

Remove an entry

#### Parameters

##### entry

`string`

&#123;string&#125; name of the entry

#### Returns

`Promise`\&lt;`void`\&gt;

#### Async

***

### removeQuery()

&gt; **removeQuery**(`entry`, `start?`, `stop?`, `options?`): `Promise`\&lt;`number`\&gt;

Defined in: [Bucket.ts:132](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L132)

Remove records by query

#### Parameters

##### entry

&#123;string | string[]&#125; name of the entry or entries

`string` | `string`[]

##### start?

`bigint`

&#123;BigInt&#125; start point of the time period, if undefined, the query starts from the first record

##### stop?

`bigint`

&#123;BigInt&#125; stop point of the time period. If undefined, the query stops at the last record

##### options?

[`QueryOptions`](QueryOptions.md)

&#123;QueryOptions&#125; options for query. You can use only include, exclude, eachS, eachN other options are ignored

#### Returns

`Promise`\&lt;`number`\&gt;

***

### removeRecord()

&gt; **removeRecord**(`entry`, `ts`): `Promise`\&lt;`void`\&gt;

Defined in: [Bucket.ts:113](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L113)

Remove a record

#### Parameters

##### entry

`string`

&#123;string&#125; name of the entry

##### ts

`bigint`

&#123;BigInt&#125; timestamp of record in microseconds

#### Returns

`Promise`\&lt;`void`\&gt;

***

### rename()

&gt; **rename**(`newName`): `Promise`\&lt;`void`\&gt;

Defined in: [Bucket.ts:266](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L266)

Rename a bucket

#### Parameters

##### newName

`string`

new name of the bucket

#### Returns

`Promise`\&lt;`void`\&gt;

***

### renameEntry()

&gt; **renameEntry**(`entry`, `newEntry`): `Promise`\&lt;`void`\&gt;

Defined in: [Bucket.ts:250](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L250)

Rename an entry

#### Parameters

##### entry

`string`

entry name to rename

##### newEntry

`string`

new entry name

#### Returns

`Promise`\&lt;`void`\&gt;

***

### setSettings()

&gt; **setSettings**(`settings`): `Promise`\&lt;`void`\&gt;

Defined in: [Bucket.ts:60](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L60)

Set bucket settings

#### Parameters

##### settings

[`BucketSettings`](BucketSettings.md)

&#123;BucketSettings&#125; new settings (you can set a part of settings)

#### Returns

`Promise`\&lt;`void`\&gt;

#### Async

***

### update()

&gt; **update**(`entry`, `ts`, `labels`): `Promise`\&lt;`void`\&gt;

Defined in: [Bucket.ts:212](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L212)

Update labels of an existing record

If a label has empty string value, it will be removed.

#### Parameters

##### entry

`string`

&#123;string&#125; name of the entry

##### ts

`bigint`

&#123;BigInt&#125; timestamp of record in microseconds

##### labels

`LabelMap`

&#123;LabelMap&#125; labels to update

#### Returns

`Promise`\&lt;`void`\&gt;

***

### writeAttachments()

&gt; **writeAttachments**(`entry`, `attachments`): `Promise`\&lt;`void`\&gt;

Defined in: [Bucket.ts:551](https://github.com/reductstore/reduct-js/blob/e3e6d0d3a0abf3caca43ef46bff4c0dbbc5384d9/src/Bucket.ts#L551)

Write attachments to an entry.

Attachments are stored as JSON records in `$&#123;entry&#125;/$meta` with `key` label.

#### Parameters

##### entry

`string`

name of the source entry

##### attachments

`Record`\&lt;`string`, `unknown`\&gt;

map of attachment key to JSON-serializable content

#### Returns

`Promise`\&lt;`void`\&gt;
