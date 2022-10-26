const { ContextMenuCommandBuilder, EmbedBuilder, ApplicationCommandType } = require('discord.js');
//Data
const { TOKENS } = require('../../../config/server.config')
//Axios
const axios = require('axios');

//URLBannerData
const { Banner } = require('../globalFunctions/URLBanners')

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('banner')
        .setType(ApplicationCommandType.User),
    async execute(client, interaction) {

        const { tag } = interaction.user;

        const EmbedMessage = new EmbedBuilder()
            .setTitle(`Avatar de ${tag}`)
            .setImage(await Banner.Context(interaction))
            .setFooter({ text: `Solicitado por ${tag}`, iconURL: interaction.user.avatarURL() })
            .setTimestamp();

        interaction.reply({ embeds: [EmbedMessage] })
    },
};