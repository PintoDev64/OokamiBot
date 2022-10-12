const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('decir')
        .setDescription('Dire lo que coloques aqui 👀')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The input to echo back')
                .setRequired(true)),
    async execute(interaction) {
        const getOption = interaction.options.getString('input');
        await interaction.reply(`hola <@${getOption}>`);
    },
};