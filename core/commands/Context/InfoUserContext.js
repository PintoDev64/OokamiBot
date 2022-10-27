const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder } = require('discord.js');

//URLBannerData
const { Banner } = require('../globalFunctions/URLBanners')

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('informacion')
        .setType(ApplicationCommandType.User),
    async execute(client, interaction) {

        const { tag, username, discriminator, id } = interaction.targetUser;
        const displayRoles = [];

        interaction.member.roles.cache.map( role => displayRoles = [...displayRoles,`<@&${role.id}>\n`])

        const EmbedMessageInfo = new EmbedBuilder()
            .setTitle(`Informacion de ${tag}`)
            .setImage(interaction.targetUser.avatarURL({ size: 1024 }))
            .addFields(
                { name: 'Roles', value: displayRoles.toString() },
                { name: 'Nombre de Usuario', value: `${username}` },
                { name: '#Codigo', value: `${discriminator}` },
                { name: 'Identificador', value: `${id}` },
                { name: 'URL del Avatar', value: interaction.targetUser.avatarURL({ size: 1024 }) },
            )

        interaction.reply({ embeds: [EmbedMessageInfo] })
    }
}
