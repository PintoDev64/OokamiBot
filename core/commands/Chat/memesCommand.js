const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { meme } = require('hispamemes')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('memes')
        .setDescription('obten un meme aleatorio (videos, imagenes, etc.)'),
    async execute(client, interaction) {
        interaction.reply(meme())
    },
};