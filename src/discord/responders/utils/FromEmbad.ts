import { createResponder, ResponderType } from "#base";
import { res } from "#functions";
import { modalFieldsToRecord } from "@magicyan/discord";

createResponder({
    customId: "embad",
    types: [ResponderType.Modal], cache: "cached",
    async run(interaction) {
        const data = modalFieldsToRecord(interaction)

        await interaction.channel?.send(res.default(
        `${data.description}`
        ))

        await interaction.reply(res.success("Embad enviada com sucesso!"));
    },
});