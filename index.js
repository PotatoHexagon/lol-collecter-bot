const { Discord, Client, MessageEmbed } = require(`discord.js`)
const client = new Client()
const { Token } = require(`./token`)
const db = require(`quick.db`)
const prefix = "lol"
const token = process.env.token
client.on(`ready`, async () => {
client.user.setActivity(`in lol collecter event`)
console.log("lol ready")
})

client.on(`message`, async message => {
if(message.author.bot) return;
if(message.channel.id === "848131402435657749") {
if(message.content === "lol" || message.content === "Lol" || message.content === "lOl" || message.content === "loL" || message.content === "LOL") {
db.add(`lol_${message.guild.id}_${message.author.id}`, 1)
message.react(`👍`)
}
}
if(message.content.startsWith("lol!rank")) {
const member = message.mentions.members.first() || message.author;
const Rank = db.fetch(`lol_${message.guild.id}_${message.author.id}`)
const messagee = `**${member.username}** said "lol" **${Rank}** times!`
console.log(messagee)
message.channel.send(messagee)
}
if(message.content.startsWith(`lol!leaderboard`) || message.content.startsWith(`lol!lb`)) {
let lol = db.all().filter(i => i.ID.startsWith(`lol_${message.guild.id}`)).sort((a, b) => b.data - a.data);
if (lol.length < 1) return message.channel.send("no one on leaderboard sed");
let content = "";
for (let i = 0; i < money.length; i++) {
let userr = message.guild.members.cache.get(lol[i].ID.split('_')[2])
let user = userr.user.tag
content += `${i+1}. ${user} - ${lol[i].data}\n`
}
const embed = new MessageEmbed()
.setTitle(`Leaderboard`)
.setDescription(content)
.setColor("RANDOM")
message.channel.send(embed)
}
})
client.login(token)
