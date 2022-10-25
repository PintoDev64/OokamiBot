const { ContextMenuCommandBuilder, EmbedBuilder, ApplicationCommandType } = require('discord.js');
//Data
const { TOKENS } = require('../../../config/server.config')
//Axios
const axios = require('axios');
//Envioment Variables
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('banner')
        .setType(ApplicationCommandType.User),
    async execute(client, interaction) {
        const { tag } = interaction.targetUser

        const data = await axios.get(`https://discord.com/api/users/${interaction.targetUser.id}`, {
            headers: {
                authorization: `Bot ${TOKENS.OokamiToken}`
            }
        }).then(res => res.data)

        const { id, banner } = data;

        const extension = banner.startsWith("a_") ? '.gif' : '.png';

        const url = `https://cdn.discordapp.com/banners/${id}/${banner}${extension}?size=4096`

        console.log(url);

        const EmbedMessage = new EmbedBuilder()
            .setTitle(`Avatar de ${tag}`)
            .setImage(url)
            .setFooter({ text: `Solicitado por ${tag}`, iconURL: interaction.user.avatarURL() })
            .setTimestamp();

        interaction.reply({ embeds: [EmbedMessage] })
    },
};