const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, Attachment } = require('discord.js');
const Canvas = require('@napi-rs/canvas');

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

        //Get the Colors for the Actions
        const Red = interaction.options.getNumber('rojo');
        const Green = interaction.options.getNumber('verde');
        const Blue = interaction.options.getNumber('azul');

        //Color Variable Initial Value = undefined
        let color;

        //Color Generator
        const ColorToHex = (color) => {
            var hexadecimal = color.toString(16);
            return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
        }
        color = "#" + ColorToHex(Red) + ColorToHex(Green) + ColorToHex(Blue)

        //Create the Attachment
        console.log(color);

        const canvas = Canvas.createCanvas(500, 500);
        const context = canvas.getContext('2d');

        context.fillStyle = color;
        context.fillRect(0, 0, 500, 500)

        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png', description: 'Hola como estan' })

        await interaction.reply({ content: `este es tu color = **${color}**`, files: [attachment] })

    },
};