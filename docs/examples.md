---
title: Examples
description: Practical examples and code samples for building on SpaceJam Network.
---

## Basic Node Setup

Create a basic SpaceJam node with custom configuration:

```rust
use spacejam_core::{Node, NodeConfig};
use spacejam_network::NetworkConfig;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Configure the node
    let config = NodeConfig {
        network: NetworkConfig {
            listen_addr: "127.0.0.1:9944".to_string(),
            bootstrap_nodes: vec![
                "node1.spacejam.network:9944".to_string(),
                "node2.spacejam.network:9944".to_string(),
            ],
            max_peers: 50,
        },
        storage_path: "./data".to_string(),
    };

    // Create and start the node
    let mut node = Node::new(config)?;
    node.start().await?;

    Ok(())
}
```

## Smart Contract Development

### 1. Basic Token Contract

A simple fungible token implementation:

```rust
use spacejam_contract::prelude::*;

#[contract]
pub struct Token {
    total_supply: u64,
    balances: HashMap<Address, u64>,
}

#[contractimpl]
impl Token {
    #[constructor]
    pub fn new(initial_supply: u64) -> Self {
        let mut balances = HashMap::new();
        balances.insert(msg::sender(), initial_supply);

        Self {
            total_supply: initial_supply,
            balances,
        }
    }

    #[message]
    pub fn transfer(&mut self, to: Address, amount: u64) -> Result<(), &'static str> {
        let from = msg::sender();
        let from_balance = self.balances.get(&from).unwrap_or(&0);

        if *from_balance < amount {
            return Err("Insufficient balance");
        }

        self.balances.insert(from, from_balance - amount);
        self.balances.insert(to, self.balances.get(&to).unwrap_or(&0) + amount);

        Ok(())
    }

    #[message(readonly)]
    pub fn balance_of(&self, account: Address) -> u64 {
        *self.balances.get(&account).unwrap_or(&0)
    }
}
```

### 2. NFT Collection

An example NFT collection with minting and trading:

```rust
use spacejam_contract::prelude::*;

#[derive(Serialize, Deserialize)]
pub struct TokenMetadata {
    name: String,
    description: String,
    image_url: String,
}

#[contract]
pub struct NFTCollection {
    name: String,
    symbol: String,
    tokens: HashMap<u64, TokenMetadata>,
    owners: HashMap<u64, Address>,
    next_token_id: u64,
}

#[contractimpl]
impl NFTCollection {
    #[constructor]
    pub fn new(name: String, symbol: String) -> Self {
        Self {
            name,
            symbol,
            tokens: HashMap::new(),
            owners: HashMap::new(),
            next_token_id: 0,
        }
    }

    #[message]
    pub fn mint(&mut self, metadata: TokenMetadata) -> Result<u64, &'static str> {
        let token_id = self.next_token_id;
        self.tokens.insert(token_id, metadata);
        self.owners.insert(token_id, msg::sender());
        self.next_token_id += 1;
        Ok(token_id)
    }

    #[message]
    pub fn transfer(&mut self, to: Address, token_id: u64) -> Result<(), &'static str> {
        let owner = self.owners.get(&token_id)
            .ok_or("Token does not exist")?;

        if *owner != msg::sender() {
            return Err("Not token owner");
        }

        self.owners.insert(token_id, to);
        Ok(())
    }
}
```

## Client Integration

### JavaScript/TypeScript SDK Usage

```typescript
import { SpaceJamClient, Wallet } from "@spacejam/sdk";

async function main() {
  // Connect to a node
  const client = new SpaceJamClient("wss://rpc.spacejam.network");

  // Create or import a wallet
  const wallet = Wallet.fromMnemonic("your twelve word mnemonic phrase here");

  // Deploy a contract
  const contractCode = await fs.readFile("token.wasm");
  const deployTx = await client.deployContract(contractCode, {
    initialSupply: 1000000n,
  });

  // Wait for deployment
  const receipt = await deployTx.wait();
  console.log(`Contract deployed at: ${receipt.contractAddress}`);

  // Interact with the contract
  const contract = client.getContract(receipt.contractAddress, tokenABI);
  const transferTx = await contract.transfer("0x1234...5678", 1000n);

  await transferTx.wait();
  console.log("Transfer complete!");
}
```

### React Integration

```tsx
import { useSpaceJam, useContract, useBalance } from "@spacejam/react";

function TokenBalance({ address }: { address: string }) {
  const { isConnected } = useSpaceJam();
  const contract = useContract("0xtoken...address", tokenABI);
  const balance = useBalance(address);

  if (!isConnected) {
    return <button onClick={connect}>Connect Wallet</button>;
  }

  return (
    <div>
      <h2>Token Balance</h2>
      <p>{balance.toString()} SPACE</p>
      <button onClick={() => contract.transfer(address, 100)}>
        Send 100 Tokens
      </button>
    </div>
  );
}
```

## Testing

### Contract Testing

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use spacejam_testing::*;

    #[test]
    fn test_token_transfer() {
        let mut env = TestEnv::new();

        // Deploy contract
        let contract = Token::new(1000);
        let contract_id = env.deploy(contract);

        // Create test accounts
        let alice = env.account(1);
        let bob = env.account(2);

        // Execute transfer
        env.execute_as(alice, contract_id, |contract: &mut Token| {
            contract.transfer(bob, 100).unwrap();
        });

        // Verify balances
        env.view(contract_id, |contract: &Token| {
            assert_eq!(contract.balance_of(alice), 900);
            assert_eq!(contract.balance_of(bob), 100);
        });
    }
}
```

### Network Testing

```rust
#[tokio::test]
async fn test_network_propagation() {
    // Create test network
    let mut network = TestNetwork::new(3).await;

    // Submit transaction to node 0
    let tx = Transaction::new(/* ... */);
    network.nodes[0].submit_transaction(tx.clone()).await;

    // Wait for propagation
    network.wait_for_propagation().await;

    // Verify all nodes received the transaction
    for node in &network.nodes {
        assert!(node.has_transaction(&tx.hash()));
    }
}
```

## Next Steps

- [API Reference](/docs/api)
- [Best Practices](/docs/best-practices)
- [Troubleshooting](/docs/troubleshooting)
