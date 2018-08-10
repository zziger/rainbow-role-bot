const Discord = require('discord.js');
const forEachTimeout = require('foreach-timeout');
const client = new Discord.Client();
const colors = ["FF0D00","FF2800","FF3D00","FF4F00","FF5F00","FF6C00","FF7800","FF8300","FF8C00","FF9500","FF9E00","FFA500","FFAD00","FFB400","FFBB00","FFC200","FFC900","FFCF00","FFD600","FFDD00","FFE400","FFEB00","FFF200","FFFA00","F7FE00","E5FB00","D5F800","C6F500","B7F200","A8F000","98ED00","87EA00","74E600","5DE100","41DB00","1DD300","00C618","00BB3F","00B358","00AC6B","00A67C","009E8E","028E9B","06799F","0969A2","0C5DA5","0E51A7","1047A9","133CAC","1531AE","1924B1","1F1AB2","2A17B1","3415B0","3C13AF","4512AE","4E10AE","560EAD","600CAC","6A0AAB","7608AA","8506A9","9702A7","AD009F","BC008D","C7007D","D0006E","D8005F","DF004F","E7003E","EF002A","F80012"];
const stop = [];
async function color () {
    forEachTimeout(colors, (color) => {
        client.guilds.forEach((guild) => {
                if (!stop.includes(guild.id)) {
                let role = guild.roles.find('name', 'Rainbow');
                if (role && role.editable) 
                    role.setColor(color);
            }  
        })
    }, 1500).then(color);
}
client.on('ready', () => {
    color();
});
client.on('guildCreate', (guild) => {
    let channels = guild.channels.filter(channel => channel.type === 'text' && channel.permissionsFor(guild.members.get(client.user.id)).has('SEND_MESSAGES'));
    if (channels.size > 0) channels.first().send('Вы пригласили бота **Rainbow Role**.\nДля его корректного функционирования у вас на сервере должна быть роль `Rainbow`, роль бота должна иметь право `управление ролями`, и быть выше роли `Rainbow`.\nДля управления ботом есть команды:\n`::stop` - останавливает изменение цвета радужной роли\n`::start` - восстанавливает изменение цвета радужной роли\n**Обе команды требуют право `Администратор` или `Управление сервером`!**\n\nЕсли у вас возникли какие-то трудности - обратитесь к <@421030089732653057> (`zziger#8040`)');
});
client.on('message', (message) => {
    if (message.channel.type !== 'text') return;
    if (message.member.hasPermission('MANAGE_GUILD') || message.member.hasPermission('ADMINISTRATOR') || message.member.id === message.guild.owner.id) {
        if (message.content === '::stop') {stop.push(message.guild.id); return message.channel.send('Готово');}
        if (message.content === '::start') {stop.splice(stop.indexOf(message.guild.id),1); return message.channel.send('Готово');}
    }
})
client.login(process.env.TOKEN);
