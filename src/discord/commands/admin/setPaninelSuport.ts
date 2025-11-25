import { createCommand } from "#base";
import { icon, res } from "#functions";
import { createSection } from "@magicyan/discord";
import { ApplicationCommandType, ButtonBuilder, ButtonStyle, PermissionFlagsBits } from "discord.js";

createCommand({
    name: "setPaninelSuport",
    description: "setPaninelSuport command",
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: [PermissionFlagsBits.Administrator],
    async run(interaction) {
        const urlbutton = new ButtonBuilder({
            custom_id: "suporteb",
            label: "SUPORTE",
            style: ButtonStyle.Secondary,
            emoji: icon.gov
        })
        interaction.channel?.send(res.default(
            `## Solicitar Suporte/Tíquete – STJ e TJ <:_:1442285306626965575>`,
            '-# As solicitações devem ser realizadas apenas quando **estritamente necessárias**. Tíquetes abertos em desacordo com as diretrizes estabelecidas em <#1426306394185007216> poderão acarretar em **sançõe**s administrativas.',
            createSection(
                '__Acione o botão para para obter acesso ao suporte:__',
                urlbutton
            ),
            `-# ${icon.gov} Governo Federal - Suporte`
        ))
    }
});