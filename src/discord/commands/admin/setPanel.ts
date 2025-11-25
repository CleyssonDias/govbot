import { createCommand } from "#base";
import { icon, res } from "#functions";
import { createSection } from "@magicyan/discord";
import { ApplicationCommandType, ButtonBuilder, ButtonStyle, PermissionFlagsBits } from "discord.js";

createCommand({
    name: "setPanel",
    description: "⚙️ Painel de Receber Cargos Automáticos.",
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: [PermissionFlagsBits.Administrator],
    async run(interaction) {
        const urlbutton = new ButtonBuilder({
            custom_id: "verify_robloxname",
            label: "RECEBER CARGOS",
            style: ButtonStyle.Secondary,
            emoji: icon.role
        })
        await interaction.channel?.send(res.default(
            `## ${icon.cheack} Verificação de Conta: ("BM") Bombeiro Militar ${icon.bm}`,
            '### Se você já usou o comando: </verificar:1442597497313951766>, clique no botão abaixo para receber seus cargos.',
            createSection(
                'Clique nesse botão **apenas** se já usou o comando </verificar:1442597497313951766>:',
                urlbutton
            ),
            `-# ${icon.gov} Governo federal - painel de verificação`
        ));
    }
});