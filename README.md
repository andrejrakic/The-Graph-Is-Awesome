# The Graph Is Awesome - Step by Step guide

[According to official documentation:](https://thegraph.com/docs/)

>The Graph is a decentralized protocol for indexing and querying data from blockchains, starting with Ethereum. It makes it possible to query data that is difficult to query directly.

## Ethereum dApps before The Graph
In order to query data or listen to events from Ethereum blockchain one need to setup similar server side code using some web3 library, which can get messy.

![Image](https://miro.medium.com/max/1400/1*_XflwfrUAzVqpkvCIlSzeA.png)

Also, with this approach one need to setup and use REST APIs which have shown to be too inflexible. With a REST API, you would typically gather the data by accessing multiple endpoints, while on the other hand you can simply send a single query to the GraphQL server that includes the concrete data requirements.

![Image](https://miro.medium.com/max/1400/1*34h3D92XL_TZj_y-Pjr5yw.jpeg)

## The Graph

The Graph gives us opportunity to write completely decentralized, truly serverless dApps which can query Ethereum blockchain using GraphQL.

In order to learn how to use The Graph I come up with a simple step by step guide

### Step 1: Write and Deploy Smart Contract
Let’s create a simple smart contract which will serve us to validate is using The Graph is useful or not. There’s a Solidity function `theGraphIsAwesome` which takes two arguments: Username and User’s comment about The Graph. This function emits event for every new supporter of the idea.

![Image](https://miro.medium.com/max/1400/1*hkCdsyP6WTF-sUBf07lYfg.png)

Rinkeby address: **0x96a19be3abd88799c5fe30b52f7ad5c950316c29**

[Events dispatched](https://rinkeby.etherscan.io/address/0x96a19be3abd88799c5fe30b52f7ad5c950316c29#events) (events on smart contracts are triggers for subgraphs)

### Step 2: Use The Graph Explorer to create a Subgraph

Go to [The Graph Explorer](https://thegraph.com/explorer/), log in via GitHub, navigate to Dashboard and click **Add Subgraph** button. Provide some data like Title, Description, Logo and save everything. Your subgraph is now publicly available via The Graph Explorer to be used by current and future blockchain apps.

### Step 3: Init Subgraph Project
First, setup global the graph cli
```
yarn global add @graphprotocol/graph-cli
```
Then init subgraph
```
graph init \
  --from-contract <CONTRACT_ADDRESS> \
  [--network <ETHEREUM_NETWORK>] \
  [--abi <FILE>] \
  <GITHUB_USER>/<SUBGRAPH_NAME> [<DIRECTORY>]
```

![Image](https://miro.medium.com/max/1400/1*t8QUJWlkQsHw8rdUbu7Duw.png)

Install dependencies
```
yarn
```

And generate mappings
```
yarn codegen
```

Each Subgraph consists of three main parts:
1. Manifest (subgraph.yaml)
2. Schema (schema.graphql)
3. Mapping (mapping.ts)

### Step 4: Develop Manifest

The manifest is configuration file and defines which smart contracts to index (address, network, ABI…) and which events to listen to. One can define multiple contracts and handlers in manifest file.

![Image](https://miro.medium.com/max/1400/1*CzYLx6zj_b0gQDEcCYKiSA.png)

### Step 5: Define GraphQL Schema

The schema.graphql file is the GraphQL data definition. Here one defines which entities exist and their types. One can also use entities as type to define relationships. For more info check official GraphQL docs.

![Image](https://miro.medium.com/max/1400/1*P18Javz-jvzDLrMaN8qeCw.png)

Every time you change this schema file, you must run again
```
yarn codegen
```

### Step 6: Write Mappings

The mapping file consists of functions that transform incoming events into GraphQL entities. It is written in AssemblyScript, a subset of Typescript. This means it can be compiled into WASM (WebAssembly).

![Image](https://miro.medium.com/max/1400/1*e2DoeiUjxFD0Hggm3zxrew.png)

### Step 7: Deploy Subgraph
In order to deploy this subgraph execute (only once) next command:
```
graph auth https://api.thegraph.com/deploy/ <ACCESS_TOKEN>
```

And for each deployment:
```
yarn deploy

# general syntax
graph deploy \     
      --debug \     
      --node https://api.thegraph.com/deploy/ \     
      --ipfs https://api.thegraph.com/ipfs/ \     
      <SUBGRAPH_NAME>
```

### Step 8: Use Subgraph in a front-end dApp

Here is some boilerplate code for basic setup with React and Apollo

![Image](https://miro.medium.com/max/1400/1*tL9btl9UKc46j5PyvuWUDg.png)

![Image](https://miro.medium.com/max/1400/1*ZK5t3Z98SXln9pU9jYqhKg.png)
