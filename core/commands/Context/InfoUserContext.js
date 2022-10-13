const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('informacion')
        .setType(ApplicationCommandType.User),
    async execute(client, interaction) {

        const { username, discriminator, id } = interaction.targetUser;

        const ReplyEmbedInformationUser = (id, username, discriminator, interact) => {
            const EmbedMessageInfo = new EmbedBuilder()
                .setTitle(`Informacion de ${interaction.targetUser.username}#${interaction.targetUser.discriminator}`)
                .setThumbnail(interact.targetUser.avatarURL())
                .setFields(
                    { name: 'Identificador', value: id },
                    { name: 'URL del Avatar', value: interact.targetUser.avatarURL() },
                )
            return EmbedMessageInfo
        }

        interaction.reply({ embeds: [ReplyEmbedInformationUser(id, username, discriminator, interaction)] })
    }
}
