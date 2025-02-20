---
title: Introduction
description: Welcome to the SpaceJam Network documentation. Learn how to build and deploy on the unlimited rust implementation of the JAM protocol.
---

# Introduction

SpaceJam Network is the unlimited rust implementation of the JAM protocol.

hello, world

## What is SpaceJam?

SpaceJam is a decentralized network protocol implemented in Rust, designed to provide unlimited scalability and interoperability for blockchain applications.

### Open Source

Built with transparency and community collaboration in mind.

### Rust-Powered

Leveraging Rust's performance and safety guarantees.

### Unlimited Scalability

Designed to handle massive network growth without compromising speed.

## Key Features

- High-performance Rust implementation
- Cross-chain compatibility
- Advanced security features
- Developer-friendly APIs
- Comprehensive documentation

## Quick Start

```bash
# Install SpaceJam CLI
cargo install spacejam-cli

# Create a new project
spacejam new my-project
cd my-project

# Start the development node
spacejam node
```

## Features

### High Performance

Built with Rust, SpaceJam offers exceptional performance and safety guarantees:

- Zero-cost abstractions
- Memory safety without garbage collection
- Fearless concurrency
- Minimal runtime

### Cross-chain Compatibility

SpaceJam supports multiple blockchain networks out of the box:

- Ethereum
- Polkadot
- Cosmos
- And more...

### Developer Tools

We provide comprehensive tools for development:

- CLI tools for project management
- SDK for multiple languages
- Testing framework
- Documentation and examples

## Architecture

SpaceJam follows a modular architecture:

```rust
pub struct Network {
    // Core network components
    consensus: Box<dyn Consensus>,
    transport: Box<dyn Transport>,
    storage: Box<dyn Storage>,
}

impl Network {
    pub fn new() -> Self {
        // Initialize network components
        Self {
            consensus: Box::new(DefaultConsensus::new()),
            transport: Box::new(LibP2PTransport::new()),
            storage: Box::new(RocksDB::new()),
        }
    }
}
```

## Next Steps

- [Installation Guide](/docs/installation)
- [Architecture Overview](/docs/architecture)
- [API Reference](/docs/api)
- [Examples](/docs/examples)
