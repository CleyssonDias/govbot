import { createCommand } from "#base";
import { createLabel, createModalFields, createTextInput } from "@magicyan/discord";
import { ApplicationCommandType, PermissionFlagsBits, TextInputStyle } from "discord.js";

createCommand({
    name: "embed",
    description: "🎈 Comando para colocar embads!",
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: [PermissionFlagsBits.Administrator],
    async run(interaction){
       await interaction.showModal({
        customId: "embad",
        title: "Criar Embad",
        components: createModalFields(
            createLabel(
                'Descrição do Embad:',
                createTextInput({
                    customId: "description",
                    style: TextInputStyle.Paragraph,
                    placeholder: "Digite a descrição aqui...",
                    required: true,
                    minLength: 5
                })
            )
        )
       })
    }
});