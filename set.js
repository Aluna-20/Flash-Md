const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID ||"FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNE5yK0tXZTQ2cS9XcEl0YkxQbzFTb3BCNXBFSm1WU1ZBR2ZHQ2RORHgzTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR3NiTVUxc011VWJ1K1dacEVlYy9xR3V5VEpVZ3ZsbFhMR1NVYllsRU9XQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0SE45OHF5czVpNWZBbEplZUlkM2UzZVM5TmJ0QS9sTzEzck1TYXE2cDM4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLa3NKQWI1SUpMNkhPcWVkL1hrRFJZQnkxZUR6dTh4Nm9Wd1J1czFFdUZvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFISElYeWp3bUtuVFl1L2xra3hXc0tIRGxPUEZrekNyMWVReG9nY2pwRjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjN5SEIrWkE0WUthZEJZQlprRmEwL2hFdXpwdXdXRHZIWUFUREgwWERjVDA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0ZuZXkyK3hkNW9aTWtlWU1XT1RuV1NjUFJyOERjMlBRcnlNeTRKelRtdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQTAxMjcxSVB3d0tzQ3lEeXNINnFTWjFReHlYanpyZHdjZHpNNkErSVJ4RT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndxWHpoanRRaWxRd0srWThDTldHYU1FQWJQQXc2TjZYTW8xbkRuVllYVkVwMGRhWSs4UmNacUwzL1ZCV3RmQjhBdFk0Ky9hdVBzeE04cnVucG9rUGpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzUsImFkdlNlY3JldEtleSI6Ik9pSGxVQWFnUWR2TlNaMlJmTC8rZ25WWCt0d29PYmt3N1hRYkhpTXg5TE09IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ik4zaDNnSTJJUjBPLXJabmFhenE5NUEiLCJwaG9uZUlkIjoiNGI1YzUxNTctMTBmMy00NDg4LTljZjUtZTRlNzFlOGJlNWI3IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhBWlIyR0tBOFBVTWdjUmJVMEFiNklnbzljND0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYQnk2TTI1RUF2TGo4QkVlUlVtTWVCS2txQ0E9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRzNZTkVZVEciLCJtZSI6eyJpZCI6IjI1NTc4NDQzODc0OTozNkBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSUx0dzZrRUVMZlA2N1VHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiLzRhWHBXRHlTU01Zb2xLclkzTTdFOHA1ZzB1elNtOHk4MEJCZ3JEUWkzWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiSGZqR3J0SUg5ZkdwajRudnA5UDFLdXdiY0F4ZzVTZnNWenlmamJYR05SZ1VkK2QwLytHQTNWV1JHaEtVVWR4UXZpM1RLbk1jUVNxMTdZSG5hVVV2QVE9PSIsImRldmljZVNpZ25hdHVyZSI6IkppRHNMUWlybE9YQ1BHa3ROVlBLNm8xdkIwaC8vTjNYRVpRbnhGUHpCbW1UQXhmSDkzaTdJdVRqNkhMbHdaZzZWUWttempoK1hjUHVaNnVGT1E4TWl3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1Nzg0NDM4NzQ5OjM2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmYrR2w2Vmc4a2tqR0tKU3EyTnpPeFBLZVlOTHMwcHZNdk5BUVlLdzBJdDIifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjM1MjUwNjB" .'FLASH-MD-WA-BOT;;;=>',
    PREFIXE: process.env.PREFIX || "'",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "255784438749", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
