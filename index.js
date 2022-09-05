require("dotenv").config();
require("./deploy-commands.js");

const { Client, 
		GatewayIntentBits, 
		ConnectionService, 
		ContextMenuCommandAssertions,
		messageLink,
		ClientUser,
		Message,
		GuildMember,
		applications
	} = require('discord.js');
const { token } = require('./config.json');
const adminRole = process.env.ADMIN_ROLE;

const client = new Client({intents :[
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMessages,
]});



client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	
	const access_token = applications.commands.permissions.update;
	client.guilds.get(interaction.guildId).commands.permissions.add ({
		command: interaction.commandId,
		permissions: [{
			id: adminRole,
			type: 2,
			permission: true,
		}, ]
	})
	.then(console.log)
	.catch(console.error);

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
		await GuildMember.setNickname(nickname, "NULL");
		await interaction.reply(`Behold the almighty ${nickname}!`);
	}
});

client.login(token);