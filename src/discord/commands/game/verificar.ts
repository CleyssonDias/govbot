import { createCommand } from "#base";
import { res } from "#functions";
import { createSection } from "@magicyan/discord";
import { ApplicationCommandType, ButtonBuilder, ButtonStyle } from "discord.js";

createCommand({
    name: "verificar",
    description: "🆗 omando para verificar sua conta do roblox no servidor.",
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
        const discordId = interaction.user.id;
        const verifyUrl = `https://bm.discloud.app/roblox/verify/start/${discordId}`;
        const urlbutton = new ButtonBuilder({
            label: "Verificar no roblox", 
            style: ButtonStyle.Link,
            url:verifyUrl
        })

        await interaction.reply(res.default(
            "# Verificação de Conta do (\"BM\") Bombeiro Militar",
            '-# Você será encaminhado para o site oficial da roblox.',
            createSection(
                'Clique nesse botão para conectar sua conta do roblox ao discord:',
                urlbutton
            ),
            '-# [GOV] - verificação de conta'
        ));
    }
});