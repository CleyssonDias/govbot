import { createResponder, ResponderType } from "#base";
import { icon, instance, res } from "#functions";

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
        const verify = await instance.get(`roblox/verify/status/${interaction.user.id}`);
        if (!verify.data.verified) {
            await interaction.reply(res.error(
                `### ${icon.error} Você não está verificado! **Use** o comando </verificar:1442597497313951766> para iniciar o processo de **verificação.**`
            ));
            return;
        }
        const user: UserData | any = await instance.get(`user/${verify.data.data.username}`)

        if (user.data.name) {
            const role = user.data.roles.split("]")[0] + ']'
            var DiplayName = `${role} ${user.data.name}`;
            type RoleKey = keyof typeof constants.roles;
            interaction.member.roles.set([])
            Object.keys(constants.roles).map((roles) => {
                if (roles == role) {
                    const roleKey = role as RoleKey;
                    const cargos = constants.roles[roleKey];
                    cargos.map(cargo => {
                        interaction.member.roles.add(cargo);
                    })
                }
            })
            await interaction.member.setNickname(DiplayName);
            await interaction.reply(res.default(
                `### ${icon.cheack} **Verificação concluída!** Seu nome no roblox é **${DiplayName}** e você recebeu seus **cargos**.`
            ));
            return;
        }

        await instance.post('user', {

            "name": verify.data.data.username,
            "roles": "[CV] Civil",
            "color": "#00ff55",
            "badges": "[✅]",
            "coins": 0,
            "rebirths": 0
        })
        interaction.member.roles.set([])
        const cargos = constants.roles['[CV]'];
        cargos.map(cargo => {
            interaction.member.roles.add(cargo);
        })
        await interaction.member.setNickname(`[CV] ${verify.data.data.username}`);
        await interaction.reply(res.default(
            `### ${icon.cheack} **Verificação concluída!** Seu nome no roblox é **${verify.data.data.username}** e você recebeu seus **cargos**.`
        ));
    },
});