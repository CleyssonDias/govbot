import { createResponder, ResponderType } from "#base";
import { instance, res } from "#functions";

type UserData = {
    data: {
        discordId:String,
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
                `### Você não está verificado! **Use** o comando \`/verificar\` para iniciar o processo de **verificação.**`
            ));
            return;
        }
        try {
            const user: UserData | any  = await instance.get(`user/${verify.data.data.username}`)

        const role = user.data.roles.split("]")[0] + ']'

        var DiplayName = `${user.data.name}`;
        
        type RoleKey = keyof typeof constants.roles;
        Object.keys(constants.roles).map((roles) => {
            if (roles == role){
                const roleKey = role as RoleKey;
                const cargos = constants.roles[roleKey];
                cargos.map(cargo => {
                    interaction.member.roles.add(cargo);
                })
            }
        }) 
        await interaction.member.setNickname(DiplayName);
        await interaction.reply(res.default(
            `### **Verificação concluída!** Seu nome no roblox é **${DiplayName}** e você recebeu seus **cargos**.`
        ));
        } catch (err) {
            await instance.post('user', {
                
	         "name": verify.data.data.username,
	        "roles": "[CV] Civil",
             "color": "#00ff55",
            "badges": "[✅]",
             "coins": 0,
	            "rebirths":0
            })


            const cargos = constants.roles['[CV]'];
            cargos.map(cargo => {
                interaction.member.roles.add(cargo);
            })
            await interaction.member.setNickname(`${verify.data.data.username}`);
             await interaction.reply(res.default(
            `### **Verificação concluída!** Seu nome no roblox é **${verify.data.data.username}** e você recebeu seus **cargos**.`
        ));
            return;
        }
        
    },
});