import { createEvent } from "#base";
import { createCanvas, loadImage } from "canvas";

createEvent({
    name: "autoRole",
    event: "guildMemberAdd",
    async run(member) {
        const welcomeChannel = await member.guild.channels.fetch(constants.configa.autoRole.welcomeChannel);
        const role = await member.guild.roles.fetch(constants.configa.autoRole.roleId);
        if (!welcomeChannel || !role) return;
        if (welcomeChannel.isTextBased() === false) return;

        await member.roles.add(role);

        const canvas = createCanvas(800, 300);
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#181818';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, 60);
        ctx.lineTo(canvas.width, 30);
        ctx.lineTo(canvas.width, 90);
        ctx.lineTo(0, 120);
        ctx.closePath();
        ctx.fillStyle = '#d32f2f';
        ctx.shadowColor = '#b71c1c';
        ctx.shadowBlur = 18;
        ctx.fill();
        ctx.restore();
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, 130);
        ctx.lineTo(canvas.width, 100);
        ctx.lineTo(canvas.width, 140);
        ctx.lineTo(0, 170);
        ctx.closePath();
        ctx.fillStyle = '#ffd600';
        ctx.shadowColor = '#ffea00';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();

        const avatarURL = member.user.displayAvatarURL({ extension: 'png', size: 512 });
        const avatar = await loadImage(avatarURL);
        const avatarSize = 160;
        const avatarX = canvas.width / 2;
        const avatarY = canvas.height / 2 - 10;

        ctx.save();
        ctx.beginPath();
        ctx.arc(avatarX, avatarY, avatarSize / 2 + 8, 0, Math.PI * 2);
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 18;
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.closePath();
        ctx.restore();
        ctx.save();
        ctx.beginPath();
        ctx.arc(avatarX, avatarY, avatarSize / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatar, avatarX - avatarSize / 2, avatarY - avatarSize / 2, avatarSize, avatarSize);
        ctx.restore();
        ctx.save();
        ctx.font = 'bold 40px Arial Black, Arial, Sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#d32f2f';
        ctx.shadowBlur = 10;
        const nameY = avatarY + avatarSize / 2 + 44;
        ctx.fillText(`${member.user.username}`, canvas.width / 2, nameY);
        ctx.restore();
        ctx.font = 'italic 22px Arial, Sans-serif';
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#fff';

        const buffer = canvas.toBuffer("image/png");

        await welcomeChannel.send({
            content: `Seja bem-vindo(a) <@${member.id}>!`,
            files: [{ attachment: buffer, name: 'welcome-image.png' }],
        });
    },
});