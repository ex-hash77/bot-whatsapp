const fs = require('fs');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal')

const SESSION_FILE_PATH = './session.json';

let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({
    session: sessionData
});

client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        }
    });
});
client.on('qr', qr =>{
    qrcode.generate(qr, {small:true});
});

client.on('ready', () =>{
    console.log('client is ready');
});

client.on('message', msg => {
    console.log(msg.body);
})

client.on('message', msg => {
    if(msg.body === 'Pid'){
        msg.reply('Hallo selamat ' + new Date() + 'semoga hari ini cerah ya *BOT*');
    }else if(msg.body === 'Pet'){
        msg.reply('Hallo selamat ' + new Date() + 'semoga hari ini cerah ya *BOT*');
    }
})
client.initialize();