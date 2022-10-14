const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('color')
        .setDescription('mira el color en formato hexadecimal')
        .addNumberOption(option =>
            option.setName('rojo')
                .setDescription('valor entre 0 - 255')
                .setRequired(true))
        .addNumberOption(option =>
            option.setName('verde')
                .setDescription('valor entre 0 - 255')
                .setRequired(true))
        .addNumberOption(option =>
            option.setName('azul')
                .setDescription('valor entre 0 - 255')
                .setRequired(true)),
    async execute(client, interaction) {

        const Red = interaction.options.getNumber('rojo');
        const Green = interaction.options.getNumber('verde');
        const Blue = interaction.options.getNumber('azul');

        const ConvertRGBtoHex = (red, green, blue) => {
            const ColorToHex = (color) => {
                var hexadecimal = color.toString(16);
                return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
            }
            return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
        }

        const ColorEmbed = (red, green, blue) => {
            const MessageEmbedColor = new EmbedBuilder()
                .setColor(`${ConvertRGBtoHex(red, green, blue)}`)
                .setTitle(`${ConvertRGBtoHex(red, green, blue)}`)
            return MessageEmbedColor
        }

        interaction.reply({ embeds: [ColorEmbed(Red, Green, Blue)] });
    },
};