const { SlashCommandBuilder, Routes, Client, Application } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { clientId, guildId, token} = require("./config.json");


const commands = [
	new SlashCommandBuilder().setName("malreda").setDescription("replies with raso sghir"),
	new SlashCommandBuilder().setName('ping').setDescription("replies with pong"),
	new SlashCommandBuilder().setName('user').setDescription("shows the user of the command"),
	new SlashCommandBuilder().setName('server').setDescription("shows server information"),
	new SlashCommandBuilder().setName('nickname').setDescription("Changes nicknames")
		.addStringOption(option => option.setName("nick")
		.setDescription('Enter your nickname').setRequired(true)),
	new SlashCommandBuilder().setName('giphy').setDescription("shows a gif that you search for")
		.addStringOption(option => option.setName("search")
		.setDescription('The gif category').setRequired(true)),
	new SlashCommandBuilder().setName('qrcode').setDescription("Replies with QR Code")
		.addStringOption(option => option.setName("type")
			.setDescription('specify the type of the QR code').setRequired(true))
		.addNumberOption(option => option.setName("size")
			.setDescription('specify the size of the QR Code (<width>x<height>)').setRequired(true))
		.addStringOption(option => option.setName("data")
			.setDescription('the data you want converted').setRequired(true))
		.addStringOption(option => option.setName("color")
			.setDescription('Set the color of the QR Code').setRequired(true))
	

] .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: commands})
	.then((data) => console.log(`Successfully registered ${data.length} commands.`))
	.catch(console.error);
