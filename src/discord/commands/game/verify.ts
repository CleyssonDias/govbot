import { createCommand } from "#base";
import { icon, res } from "#functions";
import { createSection } from "@magicyan/discord";
import { ApplicationCommandType, ButtonBuilder, ButtonStyle } from "discord.js";

createCommand({
    name: "verificar",
    description: "✅ Comando para verificar sua conta do ROBLOX na comunidade.",
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
        const discordId = interaction.user.id;
        const verifyUrl = `https://bm.discloud.app/roblox/verify/start/${discordId}`;
        const urlbutton = new ButtonBuilder({
            label: "Verificar no roblox", 
            style: ButtonStyle.Link,
            url:verifyUrl,
            emoji: icon.cheack
        })

        await interaction.reply(res.default(
            `## Verificação de Conta do ("BM") Bombeiro Militar ${icon.bm}`,
            '-# Você será **encaminhado** para o site **oficial do roblox**.',
            createSection(
                'Clique nesse botão para conectar sua conta do roblox ao discord:',
                urlbutton
            ),
             `-# ${icon.gov} Governo federal - painel de verificação`
        ));
    }
});