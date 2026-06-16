---
title: "LifecycleInfo"
description: "API reference for LifecycleInfo in the ReductStore Client SDK for JavaScript."
---

<head>
  <link rel="canonical" href="https://www.reduct.store/docs/sdk/js/api/classes/LifecycleInfo" />
</head>

# LifecycleInfo

Defined in: [messages/LifecycleInfo.ts:24](https://github.com/reductstore/reduct-js/blob/main/src/messages/LifecycleInfo.ts#L24)

Lifecycle info.

## Constructors

### Constructor

&gt; **new LifecycleInfo**(): `LifecycleInfo`

#### Returns

`LifecycleInfo`

## Properties

### isProvisioned

&gt; `readonly` **isProvisioned**: `boolean` = `false`

Defined in: [messages/LifecycleInfo.ts:38](https://github.com/reductstore/reduct-js/blob/main/src/messages/LifecycleInfo.ts#L38)

Lifecycle policy is provisioned.

***

### isRunning

&gt; `readonly` **isRunning**: `boolean` = `false`

Defined in: [messages/LifecycleInfo.ts:43](https://github.com/reductstore/reduct-js/blob/main/src/messages/LifecycleInfo.ts#L43)

Lifecycle worker is running.

***

### mode

&gt; `readonly` **mode**: [`LifecycleMode`](../type-aliases/LifecycleMode.md) = `DEFAULT_LIFECYCLE_MODE`

Defined in: [messages/LifecycleInfo.ts:33](https://github.com/reductstore/reduct-js/blob/main/src/messages/LifecycleInfo.ts#L33)

Lifecycle mode.

***

### name

&gt; `readonly` **name**: `string` = `""`

Defined in: [messages/LifecycleInfo.ts:28](https://github.com/reductstore/reduct-js/blob/main/src/messages/LifecycleInfo.ts#L28)

Lifecycle policy name.

## Methods

### parse()

&gt; `static` **parse**(`data`): `LifecycleInfo`

Defined in: [messages/LifecycleInfo.ts:45](https://github.com/reductstore/reduct-js/blob/main/src/messages/LifecycleInfo.ts#L45)

#### Parameters

##### data

`OriginalLifecycleInfo`

#### Returns

`LifecycleInfo`
