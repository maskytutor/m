const settings = require('../settings');
const moment = require('moment-timezone');
const fetch = require('node-fetch');

async function githubCommand(sock, chatId, message) {
  try {
    const res = await fetch('https://api.github.com/repos/MaskyOfficialTech/MASKY-XD_V3');
    if (!res.ok) throw new Error('Failed to fetch repo');
    const json = await res.json();

    const botName = settings.botName || 'MASKY-XD';
    const txt = `
╭═✦〔 🌟 *${botName}* 〕✦═
│ ⭐ *Name* : ${json.name}
│ 👀 *Watchers* : ${json.watchers_count}
│ 💾 *Size* : ${(json.size / 1024).toFixed(2)} MB
│ 📅 *Last Updated* : ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}
│ 🔗 *Repo* : ${json.html_url}
│ 🍴 *Forks* : ${json.forks_count}
│ 🌠 *Stars* : ${json.stargazers_count}
│ 📌 *Fork & star the repo!*
╰═
`;

    const imageUrl = settings.imageUrl;
    if (imageUrl) {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Failed to fetch image');
      const imageBuffer = await response.buffer();
      await sock.sendMessage(
        chatId,
        {
          image: imageBuffer,
          caption: txt,
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363424398917353@newsletter',
              newsletterName: botName,
              serverMessageId: -143,
            },
          },
        },
        { quoted: message }
      );
    } else {
      await sock.sendMessage(
        chatId,
        {
          text: txt,
          contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363424398917353@newsletter',
              newsletterName: botName,
              serverMessageId: -143,
            },
          },
        },
        { quoted: message }
      );
    }
  } catch (error) {
    console.error('Error in github command:', error);
    await sock.sendMessage(chatId, { text: '❌ Error fetching repo info.' }, { quoted: message });
  }
}

module.exports = githubCommand;