//Express
const express = require('express');
const app = express();
//NodeJs
const fs = require('node:fs');
const path = require('node:path');
// DiscordJs
const { Client, IntentsBitField, Collection, REST, Routes, ActivityType, ClientPresence } = require('discord.js');
//Tokens
const { TOKENS } = require('../config/server.config');
// Create a new client instance with their intents
const myIntents = new IntentsBitField().add(
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.Guilds,
);
const client = new Client({ intents: myIntents });
const { Player } = require('discord-music-player');


//Music Player in the client
const reproductor = new Player(client, {
    leaveOnEmpty: true,
    quality: 'high',
})
client.player = reproductor;

//CommandContext Collection
const commandsContext = [];
client.commandsContext = new Collection();
//Search Commands
const commandsPathContext = path.join(__dirname, 'commands/Context');
const commandFilesContext = fs.readdirSync(commandsPathContext).filter(file => file.endsWith('.js'));
//Loop for search and set commands
for (const file of commandFilesContext) {
    const filePath = path.join(commandsPathContext, file);
    let command = require(filePath);
    client.commandsContext.set(command.data.name, command);
    commandsContext.push(command.data.toJSON());
}

//CommandsChat Collection
const commandsChat = [];
client.commandsChat = new Collection();
//Search Commands
const commandsPathChat = path.join(__dirname, 'commands/Chat');
const commandFilesChat = fs.readdirSync(commandsPathChat).filter(file => file.endsWith('.js'));
//Loop for search and set commands
for (const file of commandFilesChat) {
    const filePath = path.join(commandsPathChat, file);
    let command = require(filePath);
    client.commandsChat.set(command.data.name, command);
    commandsChat.push(command.data.toJSON());
}


//All Commands
const commandsBody = [
    ...commandsChat,
    ...commandsContext
]


//Use REST
const rest = new REST({ version: '10' }).setToken(TOKENS.OokamiToken);
//Function for rister slash commands
(async () => {
    try {
        console.log(`Started refreshing ${commandsBody.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationCommands(TOKENS.OokamiClientId),
            { body: commandsBody },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();


//Express server & basic route
const expressServer = (server) => {
    server.get('/', (req, res) => {
        res.send('Ookami Bot is ON');
    })
    server.listen(3000, () => {
        console.log('Server state ON');
    })
}


// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
    client.user.setPresence({
        activities: [{
            name: 'New Commands [/help]',
            type: ActivityType.Watching
        }],
        status: 'online',
    });
    expressServer(app);
});


//Interacion Create
client.on('interactionCreate', async interaction => {
    //If not interaction, not action
    if (interaction.isChatInputCommand()) {
        //getCommand
        const command = interaction.client.commandsChat.get(interaction.commandName);
        //If not commands, not action
        if (!command) return;
        try {
            console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
            //Execute function in the other files with this function with their parameters
            await command.execute(client, interaction);
        } catch (err) {
            console.error(err);
            await interaction.reply({ content: '**❌ Hubo un error ejecutando el comando **`[ ' + interaction.commandName + ' ]`** ❌**, Espera mientras busco la solucion al problema!', ephemeral: true });
        }
    } else if (interaction.isUserContextMenuCommand()) {
        //getCommand
        const command = interaction.client.commandsContext.get(interaction.commandName);
        //If not commands, not action
        if (!command) return;
        try {
            console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
            //Execute function in the other files with this function with their parameters
            await command.execute(client, interaction);
        } catch (err) {
            console.error(err);
            await interaction.reply({ content: '**❌ Hubo un error ejecutando el comando **`[ ' + interaction.commandName + ' ]`** ❌**, Espera mientras busco la solucion al problema!', ephemeral: true });
        }
    }
});


// Login to Discord with your client's token
client.login(TOKENS.OokamiToken)
    .then(console.log('Login Complete'))
    .catch(console.error);


