require('dotenv').config({ path: '../Front/.env' });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const CryptoJS = require('crypto-js');
const { read } = require('fs');
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

const app = express();
let paused = false
let info = ""

let whitelist = [process.env.VITE_SERVER_IP]
const check_whitelist = async (req, res, next) => {
	const XFF = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
	let response = undefined;

	if (!whitelist.includes(XFF)) {
		console.log("New connection from IP: " + XFF)
		readline.question("Do you want to whitelist this IP? (Y/N)\n", (answer) => {
			response = answer;
			if (answer === "Y" || answer === "y") {
				whitelist.push(XFF)
				console.log("IP whitelisted")
			}
		});
		while (response === undefined) {
			await new Promise(resolve => setTimeout(resolve, 100));
		}
	}
	next();
}


let past_connections_reset = Date.now();
let past_connections = {}
let past_connections_count = 0;

const anti_DoS = (req, res, next) => {
	if (Date.now() - past_connections_reset > 60000) {
		past_connections_reset = Date.now();
		past_connections = {}
		past_connections_count = 0;
	}
	if (req.headers['x-forwarded-for'] || req.socket.remoteAddress === process.env.VITE_SERVER_IP) {
		next();
	}
	else {
		const XFF = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
		if (past_connections[XFF] == undefined) {
			past_connections[XFF] = 1;
			past_connections_count += 1;
			next();
		}
		else {
			past_connections[XFF] += 1;
			if (past_connections[XFF] > 10) {
				if (past_connections[XFF] < 12)
					console.log("Connection from " + XFF + " was blocked due to anti DoS")
			}
			else {
				past_connections_count += 1;
				if (past_connections_count > 5) {
					if (past_connections_count < 7)
						console.log("Too many connections, anti DDoS activated")
				} else
					next();
			}
		}
	}
}


app.use(cors());
app.use(bodyParser.json());

const key = process.env.VITE_KEY;
const decryptMessage = (encryptedMessage, secretKey) => {
	const decrypted = CryptoJS.AES.decrypt(encryptedMessage, secretKey).toString(CryptoJS.enc.Utf8);
	return decrypted;
};

app.post('/', [anti_DoS, check_whitelist], (req, res) => {
	const { message } = req.body;
	const decrypted = decryptMessage(message, key)
	const latency = Date.now() - parseInt(decrypted.split("\n")[0]);

	const XFF = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

	if (whitelist.includes(XFF)) {
		info = decrypted.split("\n")[1];

		console.log("\n\nReceived new data:\n=========================================================")
		console.log(decrypted.split("\n")[2])
		console.log("=========================================================\n");
		console.log("Latency: " + latency + "ms")
		console.log("Source: " + XFF)
		console.log("Time: " + decrypted.split("\n")[1] + "\n\n\n")
	}
	else {
		console.log("Connection from non-whitelisted IP: " + XFF + " was blocked\n\n\n\n\n")
	}
});

readline.on('line', (input) => {
	if (input === "PAUSE") {
		if (paused)
			console.log("Server already paused");
		else {

			console.log('Server Paused')
			paused = true;
			server.close();
		}
	}
	else if (input === "START") {
		if (paused) {
			paused = false
			app.listen(process.env.VITE_SERVER_PORT, process.env.VITE_SERVER_IP, () => console.log('Server Running on http://' + process.env.VITE_SERVER_IP + ":" + process.env.VITE_SERVER_PORT));
		}
		else {
			console.log("Server already running")
		}
	}
	else if (input === "INFO") {
		console.log(info)
	}
	else if (input === "WHITELIST") {
		console.log("Current whitelist:\n=========================================================")
		for (let i = 0; i < whitelist.length; i++) {
			console.log(i + ": " + whitelist[i])
		}
		console.log("=========================================================\n")
		readline.question("Do you want to clear an element from the whitelist? (Y/N)\n", (answer) => {
			if (answer === "Y" || answer === "y") {
				readline.question("Which element do you want to clear? (index)\n", (answer) => {
					if (isNaN(answer) || answer >= whitelist.length)
						console.log("Invalid index")
					else if (answer == 0)
						console.log("Cannot clear server IP")
					else {
						whitelist.splice(answer, 1)
						console.log("Element cleared")
					}
				})
			}
		})
	}
	else if (input === "rs") {
		console.log("Restarting server...")
	}
	else {
		console.log("Invalid command")
	}
});


var server = app.listen(process.env.VITE_SERVER_PORT, process.env.VITE_SERVER_IP, () => console.log('Server Running on http://' + process.env.VITE_SERVER_IP + ":" + process.env.VITE_SERVER_PORT));