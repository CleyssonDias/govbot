import { createResponder, ResponderType } from "#base";
import { db } from "#database";
import { icon, res } from "#functions";
import { modalFieldsToRecord } from "@magicyan/discord";

type dataRoles = {
    role: string[];
    roles: string[];
    rolesr: string[];
}

createResponder({
    customId: "setrole",
    types: [ResponderType.Modal], cache: "cached",
    async run(interaction) {
        const data = modalFieldsToRecord<dataRoles>(interaction);
        const role = await db.rolemanager.findOne({ roleid: data.role[0] });

        let list: any = []
        let list2: any = []

        data.roles.forEach(element => {
            const role = interaction.guild?.roles.cache.get(element);
            if (!role) return;
            if (role.id == "1442626229655310366") {
                list = [];
                return;
            }
            list.push({
                roleName: role.name,
                roleid: role.id,
            })
        });

        data.rolesr.forEach(element => {
            const role = interaction.guild?.roles.cache.get(element);
            if (!role) return;
            if (role.id == "1442626229655310366") {
                list2 = [];
                return;
            }
            list2.push({
                roleName: role.name,
                roleid: role.id,
            })
        });

        if (!role) {
            await db.rolemanager.create({
                roleid: data.role[0],
                promote: list,
                demote: list2,
            });

            await interaction.reply(res.default(
                `### ${icon.cheack} O cargo <@&${data.role[0]}> foi configurado com sucesso!`
            ))
        }

        await db.rolemanager.updateOne({ roleid: data.role[0] }, {
            promote: list,
            demote: list2,
        });

        await interaction.reply(res.default(
             `### ${icon.cheack} O cargo <@&${data.role[0]}> foi configurado com sucesso!`
        ))
    },
});