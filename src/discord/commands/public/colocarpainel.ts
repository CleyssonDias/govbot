import { createCommand } from "#base";
import { icon, res } from "#functions";
import { createSection } from "@magicyan/discord";
import { ApplicationCommandType, AttachmentBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } from "discord.js";

const commad = createCommand({
    name: "colocarpainel",
    description: "📚 Colocar paineis.",
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: [PermissionFlagsBits.Administrator]
});

commad.subcommand({
    name: "verificação",
    description: "📚 Colocar painel de verificação.",
    async run(interaction) {

        const receberCargosImg = new AttachmentBuilder(
             './images/recebercargos.png',
             { name:"receberCargosImg.png" }
        )

        
        const urlbutton = new ButtonBuilder({
            custom_id: "verify_robloxname",
            label: "RECEBER CARGOS",
            style: ButtonStyle.Secondary,
            emoji: icon.check
        })

        await interaction.reply(res.default(
            `### ${icon.check} Enviado!`
        ))

        await interaction.channel?.send(res.other(
            `## Sincronizar Cargos: ("PM") Polícia Militar ${icon.pm}`,
            '> Para prosseguir com o **__recebimento__**, é necessário **__vincular sua conta do Discord__** à sua conta do **__Roblox__**. Para isso, **__utilize__** o comando </conectar:1447663941999267860>.',
            receberCargosImg,
            createSection(
                'Clique nesse botão **apenas** se já __conectou sua conta__:',
                urlbutton
            ),
            `-# ${icon.republica} Governo Federal - Painel de verificação`
        ).with({
            files: [receberCargosImg]
        }));
    },
})