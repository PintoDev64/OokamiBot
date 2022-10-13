const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('probabilidad')
        .setDescription('te dire que posibilidades tienes de cualquier cosa que me propongas')
        .addStringOption(option =>
            option.setName('pregunta')
                .setDescription('escribe tu pregunta, prediccion, etc.')
                .setRequired(true)),
    async execute(client, interaction) {
        const { tag } = interaction.user;
        const Pregunta = await interaction.options.getString('pregunta');
        const respuestas = ["10%", "20%", "30%", "50%", "70%", "80%", "90%", "100%",];

        let random = respuestas[Math.floor(Math.random() * respuestas.length)];
        let counter;
        
        if (random === "10%") counter = "[█---------]";
        if (random === "20%") counter = "[██--------]";
        if (random === "30%") counter = "[███-------]";
        if (random === "50%") counter = "[█████-----]";
        if (random === "70%") counter = "[███████---]";
        if (random === "80%") counter = "[████████--]";
        if (random === "90%") counter = "[█████████-]";
        if (random === "100%") counter = "[██████████]";

        const ReplyEmbedProb = (question, probability, probabilityPorcentage, tag, interact) => {
            const EmbedMessage = new EmbedBuilder()
            .setTitle(`Avatar de ${tag}`)
            .setThumbnail(interact.user.avatarURL({ size: 512 }))
            .setFields(
                { name: "**Tu pregunta / Question**", value: `${question}` },
                { name: "**La probabilidad es:**", value: '..................................', inline: true },
                { name: `${probability} : ${probabilityPorcentage}`, value: '..................................', inline: true }
            )
            .setFooter({ text: `Solicitado por ${tag}`, iconURL: interact.user.avatarURL() })
            .setFooter({ text: `Solicitado por ${tag}`, iconURL: interaction.user.avatarURL() })
            .setTimestamp();
            return EmbedMessage
        }

        await interaction.reply({ embeds: [ReplyEmbedProb(Pregunta, counter, random, tag, interaction)] })

    },
};