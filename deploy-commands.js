const { SlashCommandBuilder, Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { clientId, guildId, token} = require("./config.json");

const commands = [
	new SlashCommandBuilder().setName("malreda").setDescription("replies with raso sghir"),
	new SlashCommandBuilder().setName('ping').setDescription("replies with pong"),
	new SlashCommandBuilder().setName('user').setDescription("shows the user of the command"),
	new SlashCommandBuilder().setName('server').setDescription("shows server information"),

] .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: commands})
	.then((data) => console.log(`Successfully registered ${data.length} commands.`))
	.catch(console.error);