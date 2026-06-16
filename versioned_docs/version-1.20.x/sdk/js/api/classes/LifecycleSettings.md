---
title: "LifecycleSettings"
description: "API reference for LifecycleSettings in the ReductStore Client SDK for JavaScript."
---

<head>
  <link rel="canonical" href="https://www.reduct.store/docs/sdk/js/api/classes/LifecycleSettings" />
</head>

# LifecycleSettings

Defined in: [messages/LifecycleSettings.ts:25](https://github.com/reductstore/reduct-js/blob/main/src/messages/LifecycleSettings.ts#L25)

Lifecycle settings.

## Constructors

### Constructor

&gt; **new LifecycleSettings**(): `LifecycleSettings`

#### Returns

`LifecycleSettings`

## Properties

### bucket

&gt; `readonly` **bucket**: `string` = `""`

Defined in: [messages/LifecycleSettings.ts:34](https://github.com/reductstore/reduct-js/blob/main/src/messages/LifecycleSettings.ts#L34)

Bucket to apply lifecycle policy.

---

### entries

&gt; `readonly` **entries**: `string`[] = `[]`

Defined in: [messages/LifecycleSettings.ts:39](https://github.com/reductstore/reduct-js/blob/main/src/messages/LifecycleSettings.ts#L39)

List of entries to process. If empty, all matching entries are processed.

---

### interval?

&gt; `readonly` `optional` **interval**: `string`

Defined in: [messages/LifecycleSettings.ts:49](https://github.com/reductstore/reduct-js/blob/main/src/messages/LifecycleSettings.ts#L49)

Interval between lifecycle runs, e.g. "10m", "1h", or "3600s".

---

### lifecycleType?

&gt; `readonly` `optional` **lifecycleType**: [`LifecycleType`](../type-aliases/LifecycleType.md)

Defined in: [messages/LifecycleSettings.ts:29](https://github.com/reductstore/reduct-js/blob/main/src/messages/LifecycleSettings.ts#L29)

Lifecycle action type.

---

### mode?

&gt; `readonly` `optional` **mode**: [`LifecycleMode`](../type-aliases/LifecycleMode.md)

Defined in: [messages/LifecycleSettings.ts:59](https://github.com/reductstore/reduct-js/blob/main/src/messages/LifecycleSettings.ts#L59)

Lifecycle mode.

---

### olderThan

&gt; `readonly` **olderThan**: `string` = `""`

Defined in: [messages/LifecycleSettings.ts:44](https://github.com/reductstore/reduct-js/blob/main/src/messages/LifecycleSettings.ts#L44)

Maximum record age, e.g. "30d", "24h", or "3600s".

---

### when?

&gt; `readonly` `optional` **when**: `any`

Defined in: [messages/LifecycleSettings.ts:54](https://github.com/reductstore/reduct-js/blob/main/src/messages/LifecycleSettings.ts#L54)

Conditional query.

## Methods

### parse()

&gt; `static` **parse**(`data`): `LifecycleSettings`

Defined in: [messages/LifecycleSettings.ts:61](https://github.com/reductstore/reduct-js/blob/main/src/messages/LifecycleSettings.ts#L61)

#### Parameters

##### data

`OriginalLifecycleSettings`

#### Returns

`LifecycleSettings`

---

### serialize()

&gt; `static` **serialize**(`data`): `OriginalLifecycleSettings`

Defined in: [messages/LifecycleSettings.ts:73](https://github.com/reductstore/reduct-js/blob/main/src/messages/LifecycleSettings.ts#L73)

#### Parameters

##### data

`LifecycleSettings`

#### Returns

`OriginalLifecycleSettings`
