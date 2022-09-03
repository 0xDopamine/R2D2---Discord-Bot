require("dotenv").config();
const { Client, GatewayIntentBits, ConnectionService } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({intents :[GatewayIntentBits.Guilds]});

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return ;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('pong!');
	}
	else if (commandName === 'malreda') {
		await interaction.reply('raso sghir');
	}
	else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\n Members: ${interaction.guild.memberCount}.`);
	}
	else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}`);
	}
	else if (commandName == 'giphy') {
		const gifSearchText = interaction.options.getString('search');
		if (!gifSearchText)
			await interaction.reply("Enter a valid option!");
		else {
			const url = `http://api.giphy.com/v1/gifs/search?q=${gifSearchText}&api_key=${process.env.GIPHY_API_KEY}&limit=100`;
			const res = await fetch(url);
			const json = await res.json();
			const randomIndex = Math.floor(Math.random() * json.data.length);
			const reply = json.data[randomIndex].url

			await interaction.reply(reply);
		}
	}
});

client.login(token);