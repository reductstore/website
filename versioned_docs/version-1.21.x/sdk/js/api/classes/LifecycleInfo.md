---
title: "LifecycleInfo"
description: "API reference for LifecycleInfo in the ReductStore Client SDK for JavaScript."
---

<head>
  <link rel="canonical" href="https://www.reduct.store/docs/sdk/js/api/classes/LifecycleInfo" />
</head>

# LifecycleInfo

Defined in: [messages/LifecycleInfo.ts:31](https://github.com/reductstore/reduct-js/blob/main/src/messages/LifecycleInfo.ts#L31)

Lifecycle info.

## Constructors

### Constructor

&gt; **new LifecycleInfo**(): `LifecycleInfo`

#### Returns

`LifecycleInfo`

## Properties

### isProvisioned

&gt; `readonly` **isProvisioned**: `boolean` = `false`

Defined in: [messages/LifecycleInfo.ts:55](https://github.com/reductstore/reduct-js/blob/main/src/messages/LifecycleInfo.ts#L55)

Lifecycle policy is provisioned.

---

### isRunning

&gt; `readonly` **isRunning**: `boolean` = `false`

Defined in: [messages/LifecycleInfo.ts:60](https://github.com/reductstore/reduct-js/blob/main/src/messages/LifecycleInfo.ts#L60)

Lifecycle worker is running.

---

### lastRun?

&gt; `readonly` `optional` **lastRun**: `Date`

Defined in: [messages/LifecycleInfo.ts:50](https://github.com/reductstore/reduct-js/blob/main/src/messages/LifecycleInfo.ts#L50)

Last lifecycle run time.

---

### mode

&gt; `readonly` **mode**: [`LifecycleMode`](../type-aliases/LifecycleMode.md) = `DEFAULT_LIFECYCLE_MODE`

Defined in: [messages/LifecycleInfo.ts:40](https://github.com/reductstore/reduct-js/blob/main/src/messages/LifecycleInfo.ts#L40)

Lifecycle mode.

---

### name

&gt; `readonly` **name**: `string` = `""`

Defined in: [messages/LifecycleInfo.ts:35](https://github.com/reductstore/reduct-js/blob/main/src/messages/LifecycleInfo.ts#L35)

Lifecycle policy name.

---

### type

&gt; `readonly` **type**: [`LifecycleType`](../type-aliases/LifecycleType.md) = `DEFAULT_LIFECYCLE_TYPE`

Defined in: [messages/LifecycleInfo.ts:45](https://github.com/reductstore/reduct-js/blob/main/src/messages/LifecycleInfo.ts#L45)

Lifecycle action type.

## Methods

### parse()

&gt; `static` **parse**(`data`): `LifecycleInfo`

Defined in: [messages/LifecycleInfo.ts:62](https://github.com/reductstore/reduct-js/blob/main/src/messages/LifecycleInfo.ts#L62)

#### Parameters

##### data

`OriginalLifecycleInfo`

#### Returns

`LifecycleInfo`
