const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Mira tu avatar en grande'),
    async execute(client, interaction) {
        const { tag } = interaction.user

        const EmbedMessage = new EmbedBuilder()
            .setTitle(`Avatar de ${tag}`)
            .setImage(interaction.user.avatarURL())
            .setFooter({ text: `Solicitado por ${tag}`, iconURL: interaction.user.avatarURL({ size: 512, dynamic: true }) });

        interaction.reply({ embeds: [EmbedMessage] })
    },
};