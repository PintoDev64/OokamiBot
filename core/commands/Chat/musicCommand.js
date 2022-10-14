const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('player')
        .setDescription('reproductor de musica')
        .addStringOption(option =>
            option.setName('cancion')
                .setDescription('escribe tu cancion favorita!')
                .setRequired(true)),
    async execute(client, interaction) {

        const Cancion = interaction.options.getString('cancion');
        const lista = client.player.createQueue(interaction.guild.id);
        let guildQueue = client.player.getQueue(interaction.guild.id);

        await lista.join(interaction.member.voice.channel);
        console.log(Cancion);
        /* let song = await queue.play(`${Cancion}`).catch(err => {
            console.log(err);
            if (!guildQueue)
                queue.stop();
        }); */
    },
};