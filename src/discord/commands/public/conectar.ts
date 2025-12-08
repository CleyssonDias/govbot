import { createCommand } from "#base";
import { icon, res } from "#functions";
import { createSection } from "@magicyan/discord";
import { ApplicationCommandType, ButtonBuilder, ButtonStyle } from "discord.js";

createCommand({
    name: "conectar",
    description: "😍 Comando para fazer a vinculação entre DISCORD e ROBLOX.",
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
        const discordId = interaction.user.id;
        const verifyUrl = `https://pm.discloud.app/roblox/verify/start/${discordId}`;
        const urlbutton = new ButtonBuilder({
            label: "Verificar no roblox", 
            style: ButtonStyle.Link,
            url: verifyUrl,
            emoji: icon.check
        })

        await interaction.reply(res.default(
            `## Verificação de Conta da ("PM") Polícia Militar ${icon.pm}`,
            '-# Você será **encaminhado** para o site **oficial do roblox**.',
            createSection(
                'Clique nesse botão para conectar sua conta do roblox ao discord:',
                urlbutton
            ),
             `-# ${icon.republica} Governo federal - painel de verificação`
        ));
    }
});