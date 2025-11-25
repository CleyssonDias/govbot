import { createCommand } from "#base";
import { createLabel, createModalFields } from "@magicyan/discord";
import { ApplicationCommandType, PermissionFlagsBits, RoleSelectMenuBuilder } from "discord.js";

createCommand({
    name: "setRoles",
    description: "🛠️ Configurar cargos e suas promoções.",
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: [PermissionFlagsBits.Administrator],
    async run(interaction) {
        await interaction.showModal({
            customId: "setrole",
            title: `💥 Cargos e Promoções.`,
            components: createModalFields(
                createLabel(
                    'Cargo que faz a promoção:', 'O cargo principal que faz as promoções.',
                    new RoleSelectMenuBuilder({
                        customId: 'role',
                        placeholder: 'Selecione o cargo principal.',
                        minValues: 1,
                        maxValues: 1,
                        required: true
                    })
                ),
                createLabel(
                    'Cargos para promover:', 'Os cargos que vão receber a promoção.',
                    new RoleSelectMenuBuilder({
                        customId: 'roles',
                        placeholder: 'Selecione os cargos.',
                        minValues: 1,
                        maxValues: 25
                    })
                ),
                createLabel(
                    'Cargos para rebaixar:', 'Os cargos que vão receber o rebaixamento.',
                    new RoleSelectMenuBuilder({
                        customId: 'rolesr',
                        placeholder: 'Selecione os cargos.',
                        minValues: 1,
                        maxValues: 25
                    })
                )
            )
        })
    }
});