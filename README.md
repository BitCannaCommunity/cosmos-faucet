<p align="center"> 
  <a href="https://www.cosmostation.io" target="_blank" rel="noopener noreferrer"><img src="https://i.imgur.com/TBapjYI.png" alt="Cosmostation logo"></a>
</p>
<h1 align="center">
    Cosmos-faucet
</h1>
 


⭐ Cosmos-faucet is a simple alternative to the tendermint/faucet script, this is an idea adapted for ➡️ bitcanna and can be used for any project using cosmos.

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
        "mnemonic":"one flight badge two kiwi adapt snap arrest make blast three wet...",
        "chainId":"bitcanna-testnet-1", 
        "lcdUrl":"https://cosmos-testnet.bitcanna.io",
        "denom":"ubcna",
        "prefix":"bcna",
        "feeAmount":5000,
        "AmountSend":1000000,
        "memo":"Sent using Cosmostation-CosmoJS ;-)",
        "lport":8000,
        "gasLimit":200000

}
```
## Run it
```
node --experimental-modules --es-module-specifier-resolution=node app.js
```
