const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banner')
        .setDescription('Mira tu banner de perfil en grande'),
    async execute(client, interaction) {
        const { tag } = interaction.user

        console.log(interaction.user.banner);

        const EmbedMessage = new EmbedBuilder()
            .setTitle(`Avatar de ${tag}`)
            .setImage(interaction.user.bannerURL({ size: 1024 }))
            .setFooter({ text: `Solicitado por ${tag}`, iconURL: interaction.user.avatarURL() })
            .setTimestamp();

        interaction.reply({ embeds: [EmbedMessage] })
    },
};