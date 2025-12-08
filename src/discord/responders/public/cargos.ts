import { createResponder, ResponderType } from "#base";
import { icon, api, res } from "#functions";

type UserData = {
    data: {
        discordId: String,
        robloxId: String,
        username: String,
    }
}

createResponder({
    customId: "verify_robloxname",
    types: [ResponderType.Button], cache: "cached",
    async run(interaction) {
        const verify = await api.get(`roblox/verify/status/${interaction.user.id}`);
        if (!verify.data.verified) {
            await interaction.reply(res.error(
                `### ${icon.error} Você não está conectado! **Use** o comando </conectar:1447663941999267860> para iniciar o processo de **verificação.**`
            ));
            return;
        }

        const user = await api.get(`user/${verify.data.username}`)

        if (user.data.error) {
            await api.post('user', {
                
            })
        }

        console.log(user.data)


    },
});