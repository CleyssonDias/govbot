import { createResponder, ResponderType } from "#base";
import { db } from "#database";
import { icon, res } from "#functions";
import { createLabel, createModalFields, modalFieldsToRecord } from "@magicyan/discord";
import { ChannelType, PermissionFlagsBits, StringSelectMenuBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

createResponder({
    customId: "suporteb",
    types: [ResponderType.Button], cache: "cached",
    async run(interaction) {
        const motvos = await db.suporte.find()
        let motivoslist: any = []

        motvos.map(motv => {
            motivoslist.push({
                label: motv.nome,
                value: motv.nome,
                description: motv.descrição,
                emoji: icon.tj
            })
        })

       await interaction.showModal({
            customId: "suportee",
             title: "Suporte ao STJ e TJ!",
            components: createModalFields(
                createLabel(
                    'Selecione o motivo da solicitação.:', 'Selecione o motivo da solicitação.',
                    new StringSelectMenuBuilder({
                        customId: 'motivo',
                        placeholder: 'Selecione o motivo.',
                        options: motivoslist,
                        required: true
                    })
                ),
                createLabel(
                    'Descreva:', 'Descreva detalhadamente o motivo da sua solicitação.',
                    new TextInputBuilder({
                        customId: 'motivoescrito',
                        placeholder: 'Escreva sobre.',
                        min_length: 200,
                        style: TextInputStyle.Paragraph,
                        required: true
                    })
                )
            )
        })
    },
});


type data = {
    motivo: string,
    motivoescrito: string
}

createResponder({
    customId: "suportee",
    types: [ResponderType.ModalComponent], cache: "cached",
    async run(interaction) {
        const data = modalFieldsToRecord<data>(interaction);
        const guild = interaction.client.guilds.cache.get("1441629451489378334")
        const cargostj = guild?.roles.cache.get("1442282100396130508")
        const cargotj = guild?.roles.cache.get("1442283161760305295")
        const categoria = guild?.channels.cache.get("1442719074466660505")
        if (!guild || !categoria || !cargostj || !cargotj) return

        const datas = await db.suporte.findOne({  nome: data.motivo })

        if (datas?.quem == 2) {
            const newChannel = await guild.channels.create({
            name: `🎟 Ticket-STJ-${interaction.user.id}`,
            type: ChannelType.GuildText,
            parent: categoria.id,
            permissionOverwrites: [{
                id: interaction.user.id, 
                deny: [PermissionFlagsBits.ViewChannel],
            },{
                id: cargostj.id,
                deny: [PermissionFlagsBits.ViewChannel],
            }],
            });

            await newChannel.send(res.default(
                `# Ticket - STJ ${icon.tj}`,
                `**Id do solicitante**: ${interaction.user.id}`,
                `**Solicitou ao**: ${cargostj}`,
                `**Motivo**: ${data.motivo}`,
                `**Descrição**: \n${data.motivoescrito}`,
                `-# ${icon.gov} Governo Federal - Suporte`
            ).with({ allowedMentions: { roles: [cargostj.id] } }))

            interaction.reply(res.default(`${icon.tj} Ticket criado em <#${newChannel.id}>.`))
            return
        }
         if (datas?.quem == 1) {
            const newChannel = await guild.channels.create({
            name: `🎟 Ticket-TJ-${interaction.user.id}`,
            type: ChannelType.GuildText,
            parent: categoria.id,
            permissionOverwrites: [{
                id: interaction.user.id, 
                deny: [PermissionFlagsBits.ViewChannel],
            },{
                id: cargotj.id,
                deny: [PermissionFlagsBits.ViewChannel],
            }],
            });

            await newChannel.send(res.default(
                `# Ticket - STJ ${icon.tj}`,
                `**Id do solicitante**: ${interaction.user.id}`,
                `**Solicitou ao**: ${cargotj}`,
                `**Motivo**: ${data.motivo}`,
                `**Descrição**: \n${data.motivoescrito}`,
                `-# ${icon.gov} Governo Federal - Suporte`
            ).with({ allowedMentions: { roles: [cargotj.id] } }))

            interaction.reply(res.default(`${icon.tj} Ticket criado em <#${newChannel.id}>.`))
            return
        }

    },
});