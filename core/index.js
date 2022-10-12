//NodeJs
const fs = require('node:fs');
const path = require('node:path');

// DiscordJs
const { Client, IntentsBitField, Collection, REST, Routes } = require('discord.js');

//Tokens
const { TOKENS } = require('../config/server.config');

// Create a new client instance with their intents
const myIntents = new IntentsBitField();
myIntents.add(
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.Guilds
);
const client = new Client({ intents: myIntents });

//Commands Collection
const commands = [];
client.commands = new Collection();

//Search Commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}

//Usu REST
const rest = new REST({ version: '10' }).setToken(TOKENS.OokamiToken);

//Function for rister slash commands
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationCommands(TOKENS.OokamiClientId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
        await command.execute(client, interaction);
    } catch (err) {
        console.error(err);
        await interaction.reply({ content: 'Para que algo ha ocurrido :Atencion:, ya lo solucionare!', ephemeral: true });
    }
});

// Login to Discord with your client's token
client.login(TOKENS.OokamiToken);