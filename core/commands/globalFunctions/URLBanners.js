//Data
const { TOKENS } = require('../../../config/server.config')
//Axios
const axios = require('axios');

const Banner = {
    Context: async (interac) => {
        const data = await axios.get(`https://discord.com/api/users/${interac.targetUser.id}`, {
            headers: {
                authorization: `Bot ${TOKENS.OokamiToken}`
            }
        }).then(res => res.data)
    
        const { id, banner } = data;
    
        const extension = banner.startsWith("a_") ? '.gif' : '.png';
    
        return `https://cdn.discordapp.com/banners/${id}/${banner}${extension}?size=4096`;
    },
    Command: async (interac) => {
        const data = await axios.get(`https://discord.com/api/users/${interac.user.id}`, {
            headers: {
                authorization: `Bot ${TOKENS.OokamiToken}`
            }
        }).then(res => res.data)
    
        const { id, banner } = data;
    
        const extension = banner.startsWith("a_") ? '.gif' : '.png';
    
        const url = `https://cdn.discordapp.com/banners/${id}/${banner}${extension}?size=4096`;

        return url
    }
}

module.exports = { Banner }