const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cuestionario')
        .setDescription('Replies with Pong!')
        .addStringOption(option =>
            option.setName('texto')
                .setDescription('coloca aqui la pregunta que le quieres hacer a todos')
                .setRequired(true)),
    async execute(client, interaction) {

        const { tag } = interaction.user;
        const question = interaction.options.getString('texto');

        const QuizEmbedMessage = ( InteractionTagUser, interact, pregunta) => {
            const MessageEmbed = new EmbedBuilder()
                .setTitle(`El usuario ${InteractionTagUser} hizo la encuesta`)
                .setDescription(`**Cuestion:** ${pregunta}`)
                .setFields(
                    { name: 'Cuestionario en Curso', value: '.................................................................................................................................' },
                    {name: 'Voto a No', value: '🔴', inline: true },
                    {name: 'Voto a Si', value: '🟢', inline: true },
                    {name: 'Voto en Blanco', value: '⬜', inline: true }
                )
                .setImage('https://www.aad-andalucia.org/wp-content/uploads/2019/03/Cuestionario-comenzar-1.gif')
                .setFooter({ text: `Solicitado por ${InteractionTagUser}`, iconURL: interact.user.avatarURL() })
                .setTimestamp();

            return MessageEmbed;
        }

        interaction.reply({ embeds: [QuizEmbedMessage( tag, interaction, question)] });
        const message = await interaction.fetchReply();
		message.react('🔴');
		message.react('🟢');
		message.react('⬜');
    },
};