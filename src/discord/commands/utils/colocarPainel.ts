import { createCommand } from "#base";
import { res } from "#functions";
import { createSection } from "@magicyan/discord";
import { ApplicationCommandType, ButtonBuilder, ButtonStyle, PermissionFlagsBits } from "discord.js";

createCommand({
    name: "colocarPainel",
    description: "⚙ Comando de para colocar o painel de verificação.",
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: [PermissionFlagsBits.Administrator],
    async run(interaction){
        const urlbutton = new ButtonBuilder({
                    custom_id: "verify_robloxname",
                    label: "Receber cargos", 
                    style: ButtonStyle.Secondary
                })
        await interaction.channel?.send(res.default(
            `# Verificação de Conta do ("BM") Bombeiro Militar`,
            '### Se você já usou o comando: \`/verificar\`, clique no botão abaixo para receber seus cargos.',
            createSection(
                'Clique nesse botão **apenas** se já usou o comando \`/verificar\`:',
                urlbutton
            ),
            '-# [GOV] - verificação de conta'
        ));
    }
});