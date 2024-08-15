const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID ||"FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaVBpdVBleUFpeXhsekJqYnV0UVNGei9jK1ZlNzE5ODVDTWJlSDdlY2NFRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZHNnMjdnREIvQ2NnYmZtZEQ2T2NYRXNCdzVFWllWeWNPSythTDhGamJFYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFTWN4S05qK3FNQkFCWWp5b2x1ek5xbG0xVWlFa3JyUC85blNWRzZMTEY4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhM2hmdWVRT3ZwMHUzQlQvWXlwU0pBN2tKdVI4U1AxcGQ1ZGwxMGkrNlVjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVGNTdiZ254cTY2WGhXcWtuakpwd2xVMUZtaEZvbVdBV2RaTEV5cVpkMFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVMZnY0R2VSdUVpQlNIclRTd3YyZWxQSDZSaGRRdzIvNHo0R2lYbFdLa0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEY1M2Ruam1IYkVLQnRwWUVoQ1dmNmMwOHF1Q092eGdBYlR0eWVsWUdXUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibEk5bEZJT0tOajh1TGM4M0dhdENvYXQ2c0VCTzI1Uzl3aFRpM1Jwam1DOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFVYmk1UUc5U3M5dmgrcHhNNmhqekU1L3dtbmZUUGFpcnh4VHRTTDZtWW55dTJ4eUxpRHBWVGJDZkRwNVRLQ2ptTC9Nb1l5OUFLUTY2UWJEeUQ0R0JnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ0LCJhZHZTZWNyZXRLZXkiOiIyTkN2T2N1WVRIM2RzMUprWG9Vd2YyL0sxTGl4TWIvQ3BNMFU1U0I3a2s0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ5UGhvQUE3SVFHeUM3SkxGOGpTRFZBIiwicGhvbmVJZCI6ImY5NjljZWQ0LWZiOTgtNDFhMC1iY2M2LWEzZWVhNWJiNWM0MiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4ZjFYNStnbTFaVSt4NzltR2JjNllvTnJqclE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUmZVamY5emFVdTRwYURNamdMaW1hbkZKVmNnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjlEQkhXREM0IiwibWUiOnsiaWQiOiIyNTU3ODQ0Mzg3NDk6MzhAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lUdHc2a0VFTUQyK2JVR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ii80YVhwV0R5U1NNWW9sS3JZM003RThwNWcwdXpTbTh5ODBCQmdyRFFpM1k9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjRGcDRvcUgxaS9ublQrSU1zTjN6TnR1RVFWbUFKcElHMDNnVXBIQWpwMnhJLy8zRFBoN1EwZ2QwbS95eGZRVFlMOVBSWFNRTHE3ZVJIMVZnbVJNekFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI1RnhvdVFXTS9SYi9jQWlrdWZJbTJPdnlzc1RsY3JQejdzQm53dTV1MXg2bU9yYU5WNHFTR0s1SUYvNFFQZ2NpT2wxZThvVGlnc3J5cm9RdEM0Nm9DUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTc4NDQzODc0OTozOEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmK0dsNlZnOGtrakdLSlNxMk56T3hQS2VZTkxzMHB2TXZOQVFZS3cwSXQyIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzNzU5NDM4fQ=="
    PREFIXE: process.env.PREFIX || ".",
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
