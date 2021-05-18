# cosmos-faucet


cosmos-faucet is a simple alternative to the tendermint/faucet script 


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
	"mnemonic":"", 
	"chainId":"bitcanna-1", 
	"lcdUrl":"https://cosmos-testnet.bitcanna.io"
}
```
## Run it
```
node app.js
```
