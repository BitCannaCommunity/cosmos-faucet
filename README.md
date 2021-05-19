# Cosmos-faucet


cosmos-faucet is a simple alternative to the tendermint/faucet script 

## Prerequisites

node version >=14.0.0

## Installation

```sh
git clone https://github.com/atmoner/cosmos-faucet.git
cd cosmos-faucet
npm install
```
## Config
```sh
nano config.json
```
Edit this part with your value:
```
{
        "mnemonic":"one flight badge two kiwi adapt snap arrest make blast three wet..."
        "chainId":"bitcanna-testnet-1", 
        "lcdUrl":"https://cosmos-testnet.bitcanna.io",
        "denom":"ubcna",
        "prefix":"bcna",
        "feeAmount":5000,
        "AmountSend":1000000,
        "memo":"Sent using Cosmostation-CosmoJS ;-)"
        "lport":8000,
        "gasLimit":200000

}
```
## Run it
```
node app.js
```
