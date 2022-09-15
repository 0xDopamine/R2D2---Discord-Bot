require("dotenv").config();
require("./deploy-commands.js");

const axios = require("axios");
const mongoose = require("mongoose");
const keepOnline = require("./server.js");

const { Client, 
	GatewayIntentBits, 
	ConnectionService, 
	ContextMenuCommandAssertions,
	messageLink,
	ClientUser,
	Message,
	MessageAttachement,
	MessageEmbed,
	GuildMember,
	applications
} = require('discord.js');
const { token } = require('./config.json');
const adminRole = process.env.ADMIN_ROLE;
const Database = require("@replit/database");

const db = new Database();
const client = new Client({intents :[
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMessages,
]});

client.once('ready', async () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {

	if (!interaction.isChatInputCommand()) return ;

	const { commandName } = interaction;

	if (commandName == 'ping') {
		await interaction.reply('pong!');
	}
	else if (commandName == 'malreda') {
		await interaction.reply('raso sghir');
	}
	else if (commandName == 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\n
		Members: ${interaction.guild.memberCount}.`);
	}
	else if (commandName == 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}`);
	}
	else if (commandName == 'giphy') {
		const gifSearchText = interaction.options.getString('search');
		if (!gifSearchText)
			await interaction.reply("Enter a valid option!");
		else {
			console.log(gifSearchText);
			const url = `http://api.giphy.com/v1/gifs/search?q=${gifSearchText}
			&api_key=${process.env.GIPHY_API_KEY}&limit=100`;
			const res = await fetch(url);
			const json = await res.json();
			const randomIndex = Math.floor(Math.random() * json.data.length);

			await interaction.reply(json.data[randomIndex].url);
		}
	}
	else if (commandName == 'nickname') {
		const nickname = interaction.options.getString('nick');
		// await GuildMember.setNickname(nickname, "NULL");
		await interaction.reply(`Behold the almighty ${nickname}!`);
	}
	else if (commandName == 'qrcode') {
		const type = interaction.options.getString('type');
		const data = interaction.options.getString('data');
		const size = interaction.options.getNumber('size');
		const color = interaction.options.getString('color');

		axios
		.get(`https://chart.googleapis.com/chart?cht=qr&chs=${size}x${size}&chl=${data}&chco=${color}`)
		.then(reply => {
			console.log(`statusCode: ${reply.status}`);
			if (reply.config.url) {
				interaction.reply(reply.config.url);
			}
		})
		.catch(error => {
			console.log(error);
		});
	}
});

keepOnline();
client.login(token);