import { createCommand } from "#base";
import { icon, res } from "#functions";
import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits } from "discord.js";

createCommand({
    name: "limpar",
    description: "🧼 Limpar as menssagens do chat",
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: [PermissionFlagsBits.Administrator],
    options:[
        {
            name: "qtd",
            description: "⛈️ Quantidade de menssagens para deletar (2-100)",
            type: ApplicationCommandOptionType.Integer,
            maxValue: 100,
            minValue: 2,
            required: true
        }
    ],
    async run(interaction){
        const qtd = interaction.options.getInteger("qtd", true);

        const messages = await interaction.channel?.messages.fetch({ limit: qtd });
        if (!messages) {
            return interaction.reply(res.error(`### ${icon.error} Não foi possível buscar as mensagens deste canal.`));
        }

        await interaction.channel?.bulkDelete(messages, true);

        return interaction.reply(res.default(`### ${icon.check} ${qtd} mensagens foram limpas com sucesso!`, true));
    }
});