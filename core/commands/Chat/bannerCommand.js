const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { TOKENS } = require('../../../config/server.config')
//Axios
const axios = require('axios');

//URLBannerData
const { Banner } = require('../globalFunctions/URLBanners')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banner')
        .setDescription('Mira tu banner de perfil en grande'),
    async execute(client, interaction) {

        const { tag } = interaction.user;

        const EmbedMessage = new EmbedBuilder()
            .setTitle(`Avatar de ${tag}`)
            .setImage(await Banner.Command(interaction))
            .setFooter({ text: `Solicitado por ${tag}`, iconURL: interaction.user.avatarURL() })
            .setTimestamp();

        interaction.reply({ embeds: [EmbedMessage] })
    },
};