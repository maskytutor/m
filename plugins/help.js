const settings = require('../settings');
const fetch = require('node-fetch');

function formatTime(seconds) {
  const units = [
    { v: Math.floor(seconds / 86400), u: 'd' },
    { v: Math.floor((seconds % 86400) / 3600), u: 'h' },
    { v: Math.floor((seconds % 3600) / 60), u: 'm' },
    { v: Math.floor(seconds % 60), u: 's' },
  ];
  return units.filter(({ v }) => v > 0).map(({ v, u }) => `${v}${u}`).join(' ') || '0s';
}

const commandCategories = {
  Owner: {
    'Bot Management': [
      '.chatbot', '.resetlink', '.welcome', '.goodbye',
    ].sort(),
    'User Control': [
      '.ban', '.unban', '.promote', '.demote', '.mute', '.unmute', '.delete',
      '.kick', '.warnings', '.warn', '.antilink', '.antibadword', '.clear',
      '.tag', '.tagall',
    ].sort(),
  },
  General: {
    Status: [
      '.ping', '.runtime',
    ].sort(),
    Info: [
      '.groupinfo', '.admins', '.jid', '.owner',
    ].sort(),
    Help: [
      '.menu',
    ].sort(),
    Fun: [
      '.joke', '.quote', '.fact', '.weather', '.news', '.attp', '.lyrics',
      '.8ball', '.trt', '.ss', '.tts', '.vv',
    ].sort(),
  },
  Settings: {
    Mode: [
      '.public', '.private', '.autostatus', '.autoread', '.antidelete',
      '.autoreact', '.autobio', '.autotyping', '.autorecording',
    ].sort(),
    Cleanup: [
      '.clearsession', '.cleartmp',
    ].sort(),
    Profile: [
      '.getpp', '.setpp',
    ].sort(),
  },
  Sticker: {
    Creation: [
      '.blur', '.simage', '.sticker', '.tgsticker', '.meme', '.take', '.emojimix',
    ].sort(),
  },
  Game: {
    Challenges: [
      '.tictactoe', '.hangman', '.guess', '.trivia', '.answer', '.truth', '.dare',
    ].sort(),
  },
  'Search AI': {
    AI: [
      '.gpt', '.gptgo', '.masky', '.imagine', '.flux',
    ].sort(),
  },
  Other: {
    Misc: [
      '.compliment', '.insult', '.flirt', '.shayari', '.goodnight', '.roseday',
      '.character', '.wasted', '.ship', '.simp', '.stupid',
    ].sort(),
  },
  Maker: {
    Effects: [
      '.metallic', '.ice', '.snow', '.impressive', '.matrix', '.light', '.neon',
      '.devil', '.purple', '.thunder', '.leaves', '.1917', '.arena', '.hacker',
      '.sand', '.blackpink', '.glitch', '.fire',
    ].sort(),
  },
  Search: {
    Media: [
      '.play', '.song', '.instagram', '.facebook', '.tiktok', '.video', '.ytmp4',
    ].sort(),
  },
  GitHub: {
    Code: [
      '.git', '.github', '.sc', '.script', '.repo', '.gitclone',
    ].sort(),
  },
};

const totalCommands = Object.values(commandCategories).flatMap(category => Object.values(category).flat()).length;

async function helpCommand(sock, chatId, message) {
  try {
    const start = Date.now();
    await sock.sendMessage(chatId, { text: '_Loading ♻️ please wait..._' }, { quoted: message });
    const ping = Math.round((Date.now() - start) / 2);

    const uptimeFormatted = formatTime(process.uptime());
    const botName = settings.botName || 'ᴍᴀsᴋʏ xᴅ';
    const helpMessage = `
╭═✦〔 🤖 *${botName}* 〕✦═
│ 👤 ᴏᴡɴᴇʀ   : ${settings.botOwner}
│ 🌍 ᴍᴏᴅᴇ    : *${settings.public ? 'ᴘᴜʙʟɪᴄ' : 'sᴇʟғ'}*
│ 🛠️ ᴘʀᴇғɪx  : [ ${settings.prefix || '.'} ]
│ 📈 ᴄᴍᴅs   : ${totalCommands}
│ ⏰ ᴜᴘᴛɪᴍᴇ  : ${uptimeFormatted}
│ 🧪 ᴠᴇʀsɪᴏɴ : ${settings.version}
╰═══⭖══════⭖═══✪

📚 *ᴍᴇɴᴜ ɴᴀᴠɪɢᴀᴛɪᴏɴ:*
${Object.entries(commandCategories).map(([category, subcategories]) => `
📚 *${category.toUpperCase()}*
│
${Object.entries(subcategories).map(([subcat, cmds]) => `│ 📌 *${subcat.toUpperCase()}* ${subcat === 'Status' ? '📊' : subcat === 'System' ? '⏰' : subcat === 'Info' ? 'ℹ️' : subcat === 'Help' ? '❓' : subcat === 'Owner' ? '👑' : ''}
${cmds.map(cmd => `│ ⊹ ${cmd}`).join('\n')}
│`).join('\n')}
╰═
`).join('\n')}
`;

    const imageUrl = settings.imageUrl;
    if (imageUrl) {
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error('Failed to fetch image');
        const imageBuffer = await response.buffer();
        await sock.sendMessage(
          chatId,
          {
            image: imageBuffer,
            caption: helpMessage,
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
      } catch (imageError) {
        console.warn('Failed to fetch image:', imageUrl, imageError);
        await sock.sendMessage(
          chatId,
          {
            text: helpMessage,
            contextInfo: {
              forwardingScore: 991,
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
    } else {
      console.warn('No image URL provided in settings');
      await sock.sendMessage(
        chatId,
        {
          text: helpMessage,
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
    }
  } catch (error) {
    console.error('Error in help command:', error);
    await sock.sendMessage(chatId, { text: 'Failed to load menu. Try again!' }, { quoted: message });
  }
}

module.exports = helpCommand;