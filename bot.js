//429287180914130945
const Discord = require('discord.js');
const client = new Discord.Client();
const colors = ['e74c3c', 'e67e22', 'f1c40f', '2ecc71', '1abc9c', '3498db', '9b59b6']; // массив всех цветов
function color () {
    colors.forEach(function (item, number) {
        setTimeout(function () {client.guilds.get('422775194281705493').roles.get('429287180914130945').setColor(item).catch();if(number === colors.length-1) setTimeout(function () {color()}, 2000)}, number*2000);
    });
}
client.on('ready', () => {
    color();
});
function embed_error(text) {
    let error_emoji = client.emojis.get(emojis.error);
    return new Discord.RichEmbed()
        .setTitle('Ошибка')
        .setColor('#C34E4E')
        .setDescription(`${error_emoji} ${text}`);
}
client.on('message', (message) => {
    if (!message.member || !message.member.roles) return;
    if (message.guild.id !== '436835088450322444') if (!message.member.roles.has('431356870486261762'))  return;

    //Проверка на содержания сообщением префикса, создание констант args и command
    if(message.content.indexOf('.') !== 0) return;
	const args = message.content.slice('.'.length).trim().split(/ +/g);
  	const command = args.shift().toLowerCase();
    
	
    if (command === 'embed' || command === 'e') {
        try {
            let text = args.join(" ").replace(/\n/g, "\\n");
            let embed = new Discord.RichEmbed();
            let footer = text.match(/{footer:(.*?)( \| icon: ?(.*?))?}/i);
            if (footer !== null) {
                embed.setFooter(footer[1], footer[3])
            }
            let image = text.match(/{image: ?(.*?)}/i);
            if (image !== null) {
                embed.attachFile({
                    attachment: image[1],
                    file: image[1].substring(image[1].lastIndexOf('/') + 1)
                }).setImage('attachment://'+image[1].substring(image[1].lastIndexOf('/') + 1));
            }
            let thumb = text.match(/{thumbnail: ?(.*?)}/i);
            if (thumb !== null) {
                embed.attachFile({
                    attachment: thumb[1],
                    file: thumb[1].substring(thumb[1].lastIndexOf('/') + 1)
                }).setThumbnail('attachment://'+thumb[1].substring(thumb[1].lastIndexOf('/') + 1));
            }
            let author = text.match(/{author:(.*?)( \| icon: ?(.*?))?( \| url: ?(.*?))?}/i);
            if (author !== null) {
                embed.setAuthor(author[1], author[3], author[5])
            }
            let title = text.match(/{title:(.*?)}/i);
            if (title !== null) {
                embed.setTitle(title[1])
            }
            let url = text.match(/{url: ?(.*?)}/i);
            if (url !== null) {
                embed.setURL(url[1])
            }
            let description = text.match(/{description:(.*?)}/i);
            if (description !== null) {
                embed.setDescription(description[1].replace(/\\n/g, '\n'))
            }
            let color = text.match(/{colou?r: ?(.*?)}/i);
            if (color !== null) {
                embed.setColor(color[1])
            }
            let timestamp = text.match(/{timestamp(: ?(.*?))?}/i);
            if (timestamp !== null) {
                if (timestamp[2] === undefined || timestamp[2] === null)
                embed.setTimestamp(new Date());
                else
                embed.setTimestamp(new Date(timestamp[2]));
            }
            let fields = text.match(/{field: ?(.*?) \| value: ?(.*?)( \| inline)?}/gi)
            if (fields !== null) {
                fields.forEach((item) => {
                if (item[1] == null || item[2] == null || typeof item[1] === "undefined" || typeof item[2] === "undefined") return;
                let matches = item.match(/{field: ?(.*?) \| value: ?(.*?)( \| inline)?}/i);
                embed.addField(matches[1], matches[2], (matches[3] != null));
            });}
            message.channel.send({embed});
            message.delete();
        } catch(e) {
            message.channel.send({embed: embed_error('Ошибка отправки эмбэда')}).then(msg => msg.delete(3000));
            console.error(e);
        }
    }
});
client.login(process.env.BOT_TOKEN);
