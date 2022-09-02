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
});

client.login(token);