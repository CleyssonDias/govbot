import { createCommand } from "#base";
import { icon, res } from "#functions";
import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits } from "discord.js";

createCommand({
    name: "limpar",
    description: "✨ Limpe as menssagens de um canal.",
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: PermissionFlagsBits.Administrator,
    options: [
        {
            name: "quantidade",
            description: "Número de mensagens a serem limpadas.",
            type: ApplicationCommandOptionType.Integer,
            required: true,
            minValue: 2,
            maxValue: 100
        }
    ],
    async run(interaction){
        const quantidade = interaction.options.getInteger("quantidade", true);

        const messages = await interaction.channel?.messages.fetch({ limit: quantidade });
        if (!messages) {
            return interaction.reply(res.error(`### ${icon.error} Não foi possível buscar as mensagens deste canal.`));
        }

        await interaction.channel?.bulkDelete(messages, true);

        return interaction.reply(res.default(`### ${icon.clear} | ${quantidade} mensagens foram limpas com sucesso!`, true));
    }
});