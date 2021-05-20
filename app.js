/************************************/
/* Dev by atmon3r for Bitcanna Team */ 
/* Run: node --experimental-modules --es-module-specifier-resolution=node app.js */
/************************************/

import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import { Cosmos } from "@cosmostation/cosmosjs";
import message from "@cosmostation/cosmosjs/src/messages/proto.js";

let rawdata = fs.readFileSync('config.json');
let config = JSON.parse(rawdata);

// Cosmos config
const mnemonic = config.mnemonic;
const chainId = config.chainId;
const lcdUrl = config.lcdUrl;
const denom = config.denom;
const cosmos = new Cosmos(lcdUrl, chainId);
cosmos.setBech32MainPrefix(config.prefix);
cosmos.setPath("m/44'/118'/0'/0/0");
const address = cosmos.getAddress(mnemonic);
const privKey = cosmos.getECPairPriv(mnemonic);
const pubKeyAny = cosmos.getPubKeyAny(privKey);

// Express config
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));

function sendTx(addressTo,res) {
	cosmos.getAccounts(address).then(data => {
		// signDoc = (1)txBody + (2)authInfo
		// ---------------------------------- (1)txBody ----------------------------------
		const msgSend = new message.cosmos.bank.v1beta1.MsgSend({
			from_address: address,
			to_address: addressTo,
			amount: [{ denom: denom, amount: String(config.AmountSend) }]		// 7 decimal places (1000000 ubcna = 1 BCNA)
		});
		
		const msgSendAny = new message.google.protobuf.Any({
			type_url: "/cosmos.bank.v1beta1.MsgSend",
			value: message.cosmos.bank.v1beta1.MsgSend.encode(msgSend).finish()
		});
		
		//console.log("msgSendAny: ", msgSendAny);
		
		const txBody = new message.cosmos.tx.v1beta1.TxBody({ messages: [msgSendAny], memo: config.memo });
		
		//console.log("txBody: ", txBody);
		//return;
		
		// --------------------------------- (2)authInfo ---------------------------------
		const signerInfo = new message.cosmos.tx.v1beta1.SignerInfo({
			public_key: pubKeyAny,
				mode_info: { single: { mode: message.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT } },
				sequence: data.account.sequence
		});
		
		const feeValue = new message.cosmos.tx.v1beta1.Fee({
			amount: [{ denom: denom, amount: String(config.feeAmount) }],
			gas_limit: config.gasLimit
		});
		
		const authInfo = new message.cosmos.tx.v1beta1.AuthInfo({ signer_infos: [signerInfo], fee: feeValue });
		
		// -------------------------------- sign --------------------------------
		const signedTxBytes = cosmos.sign(txBody, authInfo, data.account.account_number, privKey);
 
		return cosmos.broadcast(signedTxBytes).then(
			function(response) {res.send({response}); console.log(response) }
		);
 
	});
	
}

// Routing
app.get('/', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	if (req.query.address === '') {
		console.log(false)
		res.send({error:'Already funded'});
	} else {
		var rtnTx = sendTx(req.query.address,res)
		
		console.log(req.query.address)		
	}	
})

app.listen(config.lport, function () {
	console.log('***********************************************')
	console.log('* Welcome on Cosmos-faucet')	
	console.log('* Cosmos-faucet app listening on port '+config.lport)
	console.log('**********************************************')
})
