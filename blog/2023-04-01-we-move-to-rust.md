---
title: We're Moving to Rust
description: An explanation of our decision to move to Rust
authors: alexey
tags: [news]
slug: news/we-move-to-rust
date: 2023-04-01
---


Initially, I chose to use C++ for the early editions of [ReductStore](https://www.reduct.store) because of my experience with the language. This
allowed me to quickly create a functional time series database for binary data. However, as our platform expanded to
include Windows and MacOS, I found myself struggling to manage the C++ infrastructure as the codebase grew. This made it
difficult for me to focus on enhancing the product's functionality and unique features, as I had to ensure compatibility
across multiple platforms while managing numerous dependencies.

<!--truncate-->

## Benefits of using Rust for our project

After considering several options, we have decided to move our code base to Rust. Rust is a modern and efficient systems
programming language that offers many advantages over C++. Its memory safety features ensure that programs are free of
null pointer dereferences, buffer overflows, and other common security vulnerabilities. In addition, Rust's package
manager (Cargo) simplifies dependency management and facilitates cross-platform application development. With its focus
on performance and reliability, we believe that Rust will enable us to build a more stable and scalable product while
reducing the risk of runtime errors.

## Migration plan

Rather than rewrite the entire code base at once, we decided to take a module-by-module approach to our migration
process. Our strategy is to combine C++ and Rust using the efficient [cxx.rs](https://cxx.rs/) library. We will perform rigorous testing at
every step of the way to ensure a seamless transition. At this time, building for Windows and MacOS has been disabled,
as it is not practical to invest time in outdated infrastructure. Once the migration is complete, we plan to cross
compile with Rust for enhanced functionality. 