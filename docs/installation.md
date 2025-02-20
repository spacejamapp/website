---
title: Installation
description: Get started with SpaceJam Network by installing the required tools and setting up your development environment.
---

# Installation

Follow these steps to set up your SpaceJam Network development environment.

## Prerequisites

Before you begin, ensure you have the following installed:

- Rust (latest stable version)
- Node.js (v18 or later)
- Git

## Install Rust

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Add the necessary components:

```bash
rustup default stable
rustup update nightly
rustup target add wasm32-unknown-unknown --toolchain nightly
```

## Install SpaceJam CLI

Install the SpaceJam CLI tool:

```bash
cargo install spacejam-cli
```

Verify the installation:

```bash
spacejam --version
```

## Create a New Project

Create a new SpaceJam project:

```bash
spacejam new my-project
cd my-project
```

## Project Structure

A typical SpaceJam project looks like this:

```
my-project/
├── Cargo.toml
├── src/
│   ├── lib.rs
│   ├── main.rs
│   └── runtime/
│       ├── mod.rs
│       └── types.rs
├── runtime/
│   └── Cargo.toml
└── node/
    └── Cargo.toml
```

## Next Steps

- [Architecture Overview](/docs/architecture)
- [Quick Start Guide](/docs/quick-start)
- [Examples](/docs/examples)
