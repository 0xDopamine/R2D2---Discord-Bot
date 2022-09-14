require("dotenv").config();
require("./deploy-commands.js");

const mongoose = require("mongoose");
const keepOnline = require("./server.js");
const QRCode = require("qrcode");
// const QRCode = require ("qrcode");
// export const GoogleQRCodeURLRoot = "https://chart.googleapis.com/chart?cht=qr";
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
// const DiscordXP= require("discordjs-xp");
// const xpClient = new DiscordXP(MONGO_URL);

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


// xpClient.users.create ({ guildId: guildId, userId: userId }).then(async (user) => {
// 	await user.xp.add(10);
// 	await user.xp.subtract(10);
// 	await user.levels.add(1);
// 	await user.levels.subtract(1);
// });

// xpClient.users.fetch ({ guildId: guildId, userId: userId }).then(async (user) => {
// 	await user.xp.add(10);
// 	await user.xp.subtract(10);
// 	await user.levels.add(1);
// 	await user.levels.subtract(1);
// });


client.on('interactionCreate', async interaction => {
	// await mongoose.connect(process.env.MONGO_URL || '', {
	// 	keepAlive: true,
	// })
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
		const size = interaction.options.getInteger('size');
		const color = interaction.options.getString('color');

		const QRopts = {
			color: {
				dark: color ?? '#000',
				light: color ?? '#FFF'
			},
			size: size ?? 116,
		}

		QRCode.toDataURL(data, QRopts, async function (err, b64image) {
			if (!b64image) {
				return await interaction.reply({
					content: 'Cannot create QRCode',
					ephemeral: true
				});
			}
			
			const image = b64image.split(',')[1];
			const buf = new Buffer.from(image, 'base64');
			const file = new MessageAttachement(buf, 'qrcode.jpeg');

			const reply = new MessageEmbed()
				.setTitle('QR Code Response')
				.setImage('attachment://qrcode.jpeg')
				.setTimestamp();
			await interaction.channel.send({embeds: [reply], files: [file]});
		});

;	}
	// setTimeout(async () => {
	// 	await new testSchema ({
	// 		message: 'Hello world',
	// 	}).save()
	// }, 1000)
});

keepOnline();
client.login(token);