const fs = require('fs')

//~~~~~~~~~~~ Settings Owner ~~~~~~~~~~~//
global.owner = "2348074548225"
global.developer = "2348074548225"
global.bot = ""
global.devname = "𝐌𝐚𝐬𝐤𝐲 𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥 𝐓𝐞𝐜𝐡"
global.ownername = "ᴍᴀsᴋʏ ᴏғғɪᴄɪᴀʟ ᴛᴇᴄʜ"
global.botname = "ᴍᴀsᴋʏ xᴅ"
global.versisc = "2"
global.packname = "ᴍᴀsᴋʏ xᴅ"
global.SESSION_ID = ""
//~~~~~~~~~~~ Settings Sosmed ~~~~~~~~~~~//
global.linkwa = "https://wa.me/2348074548225"
global.linkyt = "https://www.youtube.com/Masky_Official_Tech"
global.linktt = "tiktok.com/@masky_official_tech"
global.linktele = "https://t.me/masky_xd_v3"

//~~~~~~~~~~~ Settings Bot ~~~~~~~~~~~//
global.prefix = ["","!",".",",","#","/","👺","〽️"]
global.autoRecording = false
global.autoTyping = true
global.autorecordtype = false
global.autoread = true
global.autobio = false
global.anti92 = false
global.owneroff = false
global.autoswview = true

//~~~~~~~~~~~ Settings Thumbnail ~~~~~~~~~~~//
global.thumbbot = "https://files.catbox.moe/i5gti2.png"
global.thumbown = "https://files.catbox.moe/i5gti2.png"

//~~~~~~~~~~~ Settings Channel ~~~~~~~~~~~//
global.idchannel = "120363424398917353@newsletter*"
global.channelname = "ーᴍᴀsᴋʏ xᴅ UPDATES"
global.channel = "https://whatsapp.com/channel/0029VbBaL3BIN9iutL3i200Z"

//~~~~~~~~~~~ Settings Message ~~~~~~~~~~~//
global.mess = {
  developer: " `[ Developer Only!! ]` \n This feature is for developers only!!",
  owner: " `[ Owner Only!! ]` \n This feature is for owners only!!",
  group: " `[ Group Only!! ]` \n This feature is for group chats only!!",
  private: " `[ Private Only!! ]` \n This feature is for private chats only!!",
  admin: " `[ Admin Only!! ]` \n This feature is for admins only!!",
  botadmin: " `[ Bot Admin Only!! ]` \n This feature is for ᴍᴀsᴋʏ xᴅ bot admins only!!",
  wait: " `[ Wait!! ]` \n Please wait, loading...",
  error: " `[ Error!! ]` \n An error occurred!!",
  done: " `[ Done!! ]` \n Process completed!!"
}

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
