import { createCommand } from "#base";
import { db } from "#database";
import { icon, res } from "#functions";
import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits } from "discord.js";

const commad = createCommand({
    name: "setOptions",
    description: "💌 Configurar opções de suporte.",
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: [PermissionFlagsBits.Administrator]
});

commad.subcommand({
    name: "add",
    description: "💌 Adicionar opção.",
    options: [
        {
            name: "nome",
            description: "🧡 Nome da opção que deseja adiconar.",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "descricao",
            description: "🧡 Descrição da opção que deseja adiconar.",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "quem",
            description: "🧡 Quem e para atender 1:TJ ou 2:STJ.",
            type: ApplicationCommandOptionType.Integer,
            minValue:1,
            maxValue:2,
            required: true
        }
    ],
    async run(interaction) {
        const nome = interaction.options.getString('nome');
        const des = interaction.options.getString("descricao");
        const quem = interaction.options.getInteger("quem");
        if (!nome || !des) return;

        const isCreate = await db.suporte.findOne({ nome })
        if (isCreate) {
            interaction.reply(res.error(
                `### ${icon.error} Opção já foi criada!`
            ))
            return;
        }

        await db.suporte.create({
            nome,
            descrição: des,
            quem
        })

        interaction.reply(res.default(
            `### ${icon.cheack} Opção criada!`
        ))
    }
})

commad.subcommand({
    name: "remove",
    description: "💌 Remover opção.",
    options: [
        {
            name: "nome",
            description: "🧡 Nome da opção que deseja remover.",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async run(interaction) {
        const nome = interaction.options.getString('nome');
        if (!nome) return;

        const isCreate = await db.suporte.findOne({ nome })
        if (!isCreate) {
            await interaction.reply(res.error(
                `### ${icon.error} Opção não foi criada!`
            ))
            return;
        }

        await db.suporte.deleteOne({
            nome
        })

        await interaction.reply(res.default(
            `### ${icon.cheack} Opção Deletada!`
        ))
    }
})
