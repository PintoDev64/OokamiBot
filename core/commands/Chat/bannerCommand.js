const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { TOKENS } = require('../../../config/server.config')
//Axios
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banner')
        .setDescription('Mira tu banner de perfil en grande'),
    async execute(client, interaction) {
        const { tag } = interaction.user

        const data = await axios.get(`https://discord.com/api/users/${interaction.user.id}`, {
            headers: {
                authorization: `Bot ${TOKENS.OokamiToken}`
            }
        }).then(res => res.data)

        const { id, banner } = data;

        const extension = banner.startsWith("a_") ? '.gif' : '.png';

        const url = `https://cdn.discordapp.com/banners/${id}/${banner}${extension}?size=4096`

        const EmbedMessage = new EmbedBuilder()
            .setTitle(`Avatar de ${tag}`)
            .setImage(url)
            .setFooter({ text: `Solicitado por ${tag}`, iconURL: interaction.user.avatarURL() })
            .setTimestamp();

        interaction.reply({ embeds: [EmbedMessage] })
    },
};