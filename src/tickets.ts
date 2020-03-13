import * as Discord from "discord.js";
import { serverID, channelsTC } from "./config";
import { User } from "./user";

export class TicketSup {
	oneday: number = 24*60*60*1000;
	shuxServe: Discord.Guild = this.dsclient.guilds.find('id', serverID);

   	constructor(private dsclient: Discord.Client) {  }
	abrirTicket(uid: string, usrname: string) {
		this.shuxServe.createChannel('T-'+usrname, "text").then(async channel => {
			let category = this.shuxServe.channels.find(c => c.id == channelsTC.tickets.category && c.type == "category");
		  	if (!category) throw new Error("Category channel does not exist");
			await channel.setParent(channelsTC.tickets.category);
			await channel.lockPermissions();
			await channel.overwritePermissions(uid, { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'READ_MESSAGE_HISTORY': true, 'EMBED_LINKS': true, 'ATTACH_FILES': true })
	  	}).catch(console.error);
	}
	cerrarTicket(msg: Discord.Message) {
		const ticketCh:any|Discord.TextChannel = this.shuxServe.channels.find('id', msg.channel.id);
		if(ticketCh.parentID == channelsTC.tickets.category) {
			ticketCh.delete().then (() => {
				this.calidadDeTicket(msg);
			});
		}
	}
	async calidadDeTicket(msg: Discord.Message) {
		const usuario = new User(this.dsclient);
		let menUser = msg.mentions.users.first();
		await menUser.send('Su ticket fue cerrado.\nCalifique del 1 al 10 como fue... *Tiene 24hs (1 Día) para calificar*');
		await msg.author.dmChannel.awaitMessages((m: any) => msg.author.id == m.author.id, { max: 1, time: this.oneday, errors: ['TIME'] }).then(async (collected: any) => {
			usuario.updatePoints(menUser.id, 100);
			msg.author.send('Muchas gracias por calificar.\nHa recibido 100pts.\nSaludos, <@673655111041548288>').then(() => {
				const tecnicos: Discord.TextChannel|any = this.shuxServe.channels.find('id', channelsTC.tecnicos.idTC);
				tecnicos.send('El usuario <@'+menUser.id+'> califico la **Ayuda | Consulta | Presupuesto | Reportes**\n**'+collected.first().content+'/10**');
			});
		}).catch((err: any) => { msg.author.send('Se ha quedado sin tiempo!!'); });
	}
}