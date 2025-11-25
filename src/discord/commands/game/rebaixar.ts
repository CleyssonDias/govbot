import { createCommand } from "#base";
import { db } from "#database";
import { icon, instance, res } from "#functions";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";

createCommand({
    name: "rebaixar",
    description: "🎇 Rebaixar um usuario.",
    type: ApplicationCommandType.ChatInput,
    options: [{
        name: "usuario",
        description: "🧡 Nome do roblox (Ex: Ryo, Aplus...).",
        type: ApplicationCommandOptionType.String,
        required: true
    },
    {
        name: "cargo",
        description: "🧡 Cargo para rebaixar.",
        type: ApplicationCommandOptionType.String,
        required: true,
        autocomplete: true
    }],
    async autocomplete(interaction) {
        const focus = interaction.options.getFocused();

        const DEV_ID = '1060550577525891182';

        if (interaction.user.id === DEV_ID) {
            const roles = interaction.guild.roles.cache
                .filter(r => {
                    if (r.id === interaction.guild.id) return false;
                    if (!focus) return true;
                    return r.name.toLowerCase().includes(String(focus).toLowerCase());
                })
                .sort((a, b) => b.position - a.position)
                .map(r => ({ name: r.name, value: r.name }))
                .slice(0, 25);

            return roles;
        }
        try {
            const roleIds = interaction.member.roles.cache.map(r => String(r.id).trim());
            if (!roleIds.length) return [];
            const rolesFound = await db.rolemanager.findOne({ roleid: { $in: roleIds } });

            if (!rolesFound || !Array.isArray(rolesFound.demote)) return [];
            const choices = rolesFound.demote
                .filter(p => {
                    if (!focus) return true;
                    return String(p.roleName).toLowerCase().includes(String(focus).toLowerCase());
                })
                .map(p => ({ name: p.roleName, value: p.roleName }))
                .slice(0, 25);

            return choices;
        } catch (err) {
            console.error("Autocomplete error:", err);
            return [];
        }
    },

    async run(interaction) {
        const message = await interaction.deferReply({ flags: ["Ephemeral"]})
        const users = interaction.options.getString("usuario");
        const cargo = interaction.options.getString("cargo");
        const roleIds = interaction.member.roles.cache.map(r => String(r.id));
        const rolesFound = await db.rolemanager.findOne({ roleid: { $in: roleIds } });
        if (!rolesFound) return;
        var podePromover = false

        if (interaction.user.id === '1060550577525891182') podePromover = true

        rolesFound.demote.forEach(res => {
            if (res.roleName === interaction.options.getString("cargo")) {
                podePromover = true
            }
        })

        if (!podePromover) {
            await message.edit(res.error(
                `### ${icon.error} Você não tem permissão para rebaixar.`
            ));
            return;
        }

        if (!users) return;
        const user = users.split(',')
        if (user.length > 1) {
            for (const name of user) {
                try {
                    if (name == "" || name.trim() == "") continue;
                    const u = await instance.get(`user/${name.trim()}`)
                    const rolee = interaction.guild.roles.cache.find(role => role.name === u.data.roles);
                    const roledele = interaction.guild.roles.cache.find(role => role.id === String(rolesFound.roleid));
                    if (!rolee || !roledele) return;

                    if (rolee?.position >= roledele?.position && interaction.user.id != '1060550577525891182') {
                        message.edit(res.error(
                            `### ${icon.error} Você não tem permissão para fazer isso.`
                        ))
                        return;
                    }
                    try {
                        const member = interaction.guild.members.cache.find(m => m.nickname?.includes(name.trim()));
                        if (member) {
                        await member.roles.set([])
                        if (member.nickname) {
                            const role = cargo?.split("]")[0] + ']'
                            var DiplayName = `${role} ${member.nickname.split("]")[1].trim()}`;
                            type RoleKey = keyof typeof constants.roles;
                            const cargos = constants.roles[role as RoleKey];
                            cargos.map(cargo => {
                                member.roles.add(cargo);
                            })
                            member.setNickname(DiplayName)
                        }
                    }
                    } catch (err) {
                        console.log('erros')
                    }
                    

                    await instance.put(`user/edit/role`, {
                        "name": name.trim(),
                        "roles": cargo
                    })
                } catch (err) {
                    await instance.post(`user`, {
                        "name": name,
                        "roles": cargo,
                        "color": "#fbff03",
                        "badges": "[💛]",
                        "coins": 0,
                        "rebirths": 0
                    })
                }

            }

            const rolees = interaction.guild.roles.cache.find(role => role.name === cargo);

            await message.edit(res.default(
                `### ${icon.cheack} Os usuários ${user.join(', ')} foram rebaixados para o cargo <@&${rolees?.id}>.`
            ));
            return;
        }

        try {
            const u = await instance.get(`user/${user[0]}`)
            const rolee = interaction.guild.roles.cache.find(role => role.name === u.data.roles);
            const roledele = interaction.guild.roles.cache.find(role => role.id === String(rolesFound.roleid));
            if (!rolee || !roledele) return;

            if (rolee?.position >= roledele?.position && interaction.user.id != '1060550577525891182') {
                message.edit(res.error(
                    `### ${icon.error} Você não tem permissão para fazer isso.`
                ))
                return;
            }

            await instance.put(`user/edit/role`, {
                "name": user[0],
                "roles": cargo
            })
        } catch (err) {
            await instance.post(`user`, {
                "name": user[0],
                "roles": cargo,
                "color": "#fbff03",
                "badges": "[💛]",
                "coins": 0,
                "rebirths": 0
            })
        }

        const member = interaction.guild.members.cache.find(m => m.nickname?.includes(user[0]));
        if (member) {
            await member.roles.set([])
            if (member.nickname) {
                const role = cargo?.split("]")[0] + ']'
                var DiplayName = `${role} ${member.nickname.split("]")[1].trim()}`;
                type RoleKey = keyof typeof constants.roles;
                const cargos = constants.roles[role as RoleKey];
                cargos.map(cargo => {
                    member.roles.add(cargo);
                })
                member.setNickname(DiplayName)
            }
        }

        const rolee = interaction.guild.roles.cache.find(role => role.name === cargo);

        await message.edit(res.default(
            `### ${icon.cheack} O usuário ${user[0]} foi rebaixado para o cargo <@&${rolee?.id}>.`
        ));
    }
});