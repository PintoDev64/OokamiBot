const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emociones')
        .setDescription('Agrega un gif de como te sientes')
        .addStringOption(option =>
            option.setName('emocion')
                .setDescription('Que sepan que sientes en este momento')
                .setRequired(true)
                .addChoices(
                    { name: 'Feliz', value: 'Happy' },
                    { name: 'Triste', value: 'Sad' },
                    { name: 'Molest@', value: 'Angry' },
                    { name: 'Confundid@', value: 'Confused' },
                    { name: 'Asustad@', value: 'Fear' }
                )
        ),
    async execute(interaction) {
        const Emocion = await interaction.options.getString('emocion');
        const { tag, id } = interaction.user;

        const ImageData = {
            Happy: [
                'https://pa1.narvii.com/6560/e5a561e223e637b91447246f76165f71810dd0b9_hq.gif',
                'https://i.waifu.pics/7UFAxs2.gif',
                'https://pa1.narvii.com/6394/16f50836442aa7de8c397239e49c737455b79318_hq.gif'
            ],
            Sad: [
                'https://media.tenor.com/iIb-lCnwNyoAAAAC/sad-anime.gif',
                'https://pa1.narvii.com/6502/4de0dfe80216004772227fe1c81fb162e838cb7a_hq.gif',
                'https://pa1.narvii.com/6454/fc4a88045a8e5abf38720254bc3c2a1f684364c3_hq.gif'
            ],
            Angry: [
                'https://media.tenor.com/cYRAeQqpaUMAAAAC/anime-angry-slow-loop.gif',
                'https://c.tenor.com/ZqZtPdSlUC8AAAAC/angry-anime.gif',
                'https://c.tenor.com/1xiMFy-EPn4AAAAC/anime-angry.gif',
                'https://c.tenor.com/MvKZZ7JCkUMAAAAC/anime-angry.gif'
            ],
            Confused: [
                'https://c.tenor.com/zw6xPc2NxcQAAAAC/confusedanime.gif',
                'https://i.pinimg.com/originals/74/78/25/747825f64867b7e4bc1a3771d3f5975f.gif',
                'https://64.media.tumblr.com/41d76da4a010e3108fa148939d3be696/tumblr_o5tijzhS8P1tydz8to1_540.gifv'
            ],
            Fear: [
                'https://c.tenor.com/pqT3ybJvFb4AAAAC/anime-fear.gif',
                'https://media.tenor.com/r1G0K33FM8IAAAAC/anime-scared.gif',
                'https://i.gifer.com/E61N.gif'
            ]
        };

        const Reply = (array, InteractionTagUser, interactionUser, interact) => {
            const Image = array[Math.floor(Math.random() * array.length)]
            const EmbedMessage = new EmbedBuilder()
                .setTitle(`${InteractionTagUser} se siente ${Emocion}`)
                .setDescription(`Emocion actual de <@${interactionUser}>`)
                .setImage(`${Image}`)
                .setFooter({ text: `Solicitado por ${InteractionTagUser}`, iconURL: interact.user.avatarURL() });
            return EmbedMessage
        };

        switch (Emocion) {
            case 'Sad':
                interaction.reply({
                    embeds: [
                        Reply(ImageData.Sad, tag, id, interaction)
                    ]
                }); break;
            case 'Angry':
                interaction.reply({
                    embeds: [
                        Reply(ImageData.Angry, tag, id, interaction)
                    ]
                }); break;
            case 'Confused':
                interaction.reply({
                    embeds: [
                        Reply(ImageData.Confused, tag, id, interaction)
                    ]
                }); break;
            case 'Fear':
                interaction.reply({
                    embeds: [
                        Reply(ImageData.Fear, tag, id, interaction)
                    ]
                }); break;
            default:
                interaction.reply({
                    embeds: [
                        Reply(ImageData.Happy, tag, id, interaction)
                    ]
                }); break;
        }

    },
};