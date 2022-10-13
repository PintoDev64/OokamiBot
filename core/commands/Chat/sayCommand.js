const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('decir')
        .setDescription('Dire lo que coloques aqui 👀')
        .addStringOption(option =>
            option.setName('texto')
                .setDescription('agrega el texto que quieres que diga')
                .setRequired(true)),
    async execute(client, interaction) {
        const TextToSay = await interaction.options.getString('texto');
        await interaction.reply(TextToSay);
    },
};