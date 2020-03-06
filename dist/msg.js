"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const user_1 = require("./user");
const config_1 = require("./config");
const _1 = require(".");
const juegos_1 = require("./juegos");
class MSGshux {
    constructor(dsClient) {
        this.dsClient = dsClient;
        this.oneday = 24 * 60 * 60 * 1000;
    }
    getMSG(msg) {
        if (!(msg.author.bot)) {
            if (msg.channel.type == 'dm') {
                this.dmSYS(msg);
            }
            else {
                this.pubSYS(msg);
            }
        }
        if (msg.author.bot) {
            return;
        }
    }
    dmSYS(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (msg.content.toLocaleLowerCase().includes('shux!')) {
                switch (msg.content.toLocaleLowerCase()) {
                    case 'shux!addfc': {
                        yield msg.author.send('Por favor ingrese su fecha de cumpleaños\n**FORMATO: DIA/MES* - ejemplo: 31/5*');
                        yield msg.author.dmChannel.awaitMessages((m) => msg.author.id == m.author.id, { max: 1, time: 63000, errors: ['TIME'] }).then((collected) => {
                            let user_ = new user_1.User(this.dsClient);
                            user_.setaddfc(msg.author.id, collected.first().content);
                            msg.author.send('Su fecha de cumpleaños ha sido guardada');
                        }).catch((err) => { msg.author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                        break;
                    }
                    case 'shux!presupuesto': {
                        yield msg.author.send('Estamos bajos los presupuestos');
                        break;
                    }
                    case 'shux!mibuild': {
                        yield msg.author.send('Por favor, ingresa su URL del build de PicPartPicker\nSi no posee un enlace, vaya a https://pcpartpicker.com/');
                        yield msg.author.dmChannel.awaitMessages((m) => msg.author.id == m.author.id, { max: 1, time: 60000, errors: ['TIME'] }).then((collected) => {
                            let user_ = new user_1.User(this.dsClient);
                            user_.setPCBuilf(msg.author.id, collected.first().content);
                            msg.author.send('Su build ha sido guardada');
                        }).catch((err) => { msg.author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                        break;
                    }
                    case 'shux!report': {
                        break;
                    }
                    case 'shux!propuesta': {
                        yield msg.author.send('Por favor ingrese su segurencia / idea\nSi desea cancelar -> #cancelar');
                        yield msg.author.dmChannel.awaitMessages((m) => msg.author.id == m.author.id, { max: 1, time: 120000, errors: ['TIME'] }).then((collected) => {
                            this.dsClient.channels.forEach((c) => {
                                if (c.id == '673212666210287657') {
                                    const server_ = this.dsClient.guilds.get(config_1.serverID);
                                    server_.channels.get('673212666210287657').send('**SUGERENCIA POR <@' + msg.author.id + '>**\n' + collected.first().content);
                                    msg.author.send('Mensaje enviado\nEspere su respuesta en <#673212666210287657>');
                                }
                            });
                        }).catch((err) => { msg.author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                        break;
                    }
                    case 'shux!entrevista': {
                        yield msg.author.send(`**FORMATO DE FORMULARIO PARA CONSULTOR (#💻consultas:@Consultor) / SHUXTESTER: (#devtest : @SHUXTESTER)**\n------------------------------------------------------------------------------------------------------------------------------------------------------\nPARA QUE ROL?\nPOR QUE QUERES SERLO?\nEXPERIENCIA?\nPOR QUE DEBEMOS ELEGIRTE?\n--------------------------------------------------------------------------------------------------------------------------------------------------------`);
                        yield msg.author.send('Por favor, responda con el formato del formulario, en un solo msj.\nSi desea cancelar -> #cancelar\nComplete el formulario a continuacion, al terminar **presione Enter**');
                        yield msg.author.dmChannel.awaitMessages((m) => msg.author.id == m.author.id, { max: 1, time: 60000, errors: ['TIME'] }).then((collected) => {
                            if (collected.first().content == '#cancelar') {
                                msg.author.send('Ha sido cancelada');
                            }
                            else {
                                this.dsClient.channels.forEach((c) => {
                                    if (c.id == '674408701125459968') {
                                        const server_ = this.dsClient.guilds.get('392414185633611776');
                                        server_.channels.get('674408701125459968').send('<@' + msg.author.id + '>\n' + collected.first().content);
                                        msg.author.send('Mensaje enviado\nEspere su respuesta en <#674408701125459968>\n**:white_check_mark: ACEPTADO - :x: RECHAZADO - :loudspeaker: REVISION - :speech_balloon: VA A PRUEBA**\n*Puede haber preguntas o plantear un problema y tener que resolverlo*');
                                    }
                                });
                            }
                        }).catch((err) => { msg.author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                        break;
                    }
                    default:
                        break;
                }
            }
        });
    }
    pubSYS(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (msg.content.toLocaleLowerCase().startsWith('shux!')) {
                if (msg.content.toLocaleLowerCase().startsWith('shux!perfil')) {
                    let user_ = new user_1.User(this.dsClient);
                    user_.getMyProfile(msg.author.id).then((miPerfil) => {
                        var _a;
                        let embed_ = new Discord.RichEmbed();
                        embed_.setTitle('Perfil de ' + msg.author.username).setThumbnail(msg.author.displayAvatarURL).setColor('red').addField('Cumpleaños: ', String(miPerfil.birth), false)
                            .addField('Mi PC: ', miPerfil.urlbuild, false)
                            .addField('Warnings: ', miPerfil.warns, false)
                            .setTimestamp((_a = msg.guild.members.get(msg.author.id)) === null || _a === void 0 ? void 0 : _a.joinedAt);
                        msg.channel.send(embed_);
                    }).catch(() => {
                        msg.reply('NO tenes un perfil creado');
                    });
                }
                else if (msg.content.toLocaleLowerCase().startsWith('shux!mivoto')) {
                    let user_ = new user_1.User(this.dsClient);
                    let menUser = msg.mentions.users.first();
                    console.log(menUser.username);
                    if (msg.author.id != menUser.id) {
                        user_.setVoto(msg.author.id, msg.mentions.users.first().id).then((res) => { msg.reply(res); }).catch((err) => { msg.reply(err); });
                    }
                    else {
                        msg.reply(config_1.listaErr.votoMe.info);
                    }
                }
                else if (msg.content.toLocaleLowerCase().includes('shux!ping')) {
                    msg.reply('pong');
                }
                else if (msg.channel.id == config_1.channelsTC.vicioroom.idTC && msg.content.toLowerCase().startsWith('shux!vcgame') && isUserEnable(config_1.channelsTC.vicioroom.roles, msg.author.id)) {
                    const TCNombre = msg.content.substring(('shux!vcgame ').length);
                    (new juegos_1.Juegos(this.dsClient)).creategameChannel(TCNombre, msg.author.username);
                }
                if (msg.channel.id == config_1.channelsTC.consulta.idTC || msg.channel.id == config_1.channelsTC.entrevista.idTC || msg.channel.id == config_1.channelsTC.sugerencia.idTC) {
                    if (msg.content.toLowerCase().startsWith('shux!ticket') || msg.content.toLowerCase().startsWith('shux!finticket') || isUserEnable(config_1.channelsTC.consulta.roles, msg.author.id)) {
                        if (msg.content.toLowerCase().startsWith('shux!finticket') && isUserEnable(config_1.channelsTC.consulta.roles, msg.author.id)) {
                            const usuario = new user_1.User(this.dsClient);
                            let menUser = msg.mentions.users.first();
                            yield menUser.send('Su ticket de **Consulta / Ayuda** en <#' + config_1.channelsTC.consulta.idTC + '> fue cerrado.\nCalifique del 1 al 10 como fue... *Tiene 24hs (1 Día) para calificar*');
                            yield msg.author.dmChannel.awaitMessages((m) => msg.author.id == m.author.id, { max: 1, time: this.oneday, errors: ['TIME'] }).then((collected) => __awaiter(this, void 0, void 0, function* () {
                                usuario.updatePoints(menUser.id, 100);
                                msg.author.send('Muchas gracias por calificar.\nHa recibido 100pts.\nSaludos, <@673655111041548288>').then(() => {
                                    const tecnicos = this.dsClient.guilds.find('id', config_1.serverID).channels.find('id', config_1.channelsTC.tecnicos.idTC);
                                    tecnicos.send('El usuario <@' + menUser.id + '> califico la **CONSULTA / AYDUA**\n**' + collected.first().content + '/10**');
                                });
                            })).catch((err) => { msg.author.send('Se ha quedado sin tiempo!!'); });
                        }
                        return;
                    }
                    else if (msg.content.toLowerCase().startsWith('shux!sugerencia') || isUserEnable(config_1.channelsTC.sugerencia.roles, msg.author.id)) {
                        return;
                    }
                    else if (msg.content.toLowerCase().startsWith('shux!entrevista') || isUserEnable(config_1.channelsTC.entrevista.roles, msg.author.id)) {
                        return;
                    }
                    else {
                        if (!(msg.content.toLocaleLowerCase().startsWith('shux!warn') && msg.content.toLocaleLowerCase().includes('-'))) {
                            msg.delete();
                            msg.author.send('Para publicar un mensaje en <#674045015084761127> | <#673212666210287657> | <#674408701125459968>\n Haga click en este enlace para leer los comandos de SHUX -> https://discordapp.com/channels/392414185633611776/674086159697313833/678965114656784394');
                        }
                    }
                }
                else if (isUserEnable(config_1.channelsTC.warnings.roles, msg.author.id)) {
                    if (msg.content.toLocaleLowerCase().startsWith('shux!warn') && msg.content.toLocaleLowerCase().includes('-')) {
                        const usuario = new user_1.User(this.dsClient);
                        let menUser = msg.mentions.users.first();
                        if (menUser.username != undefined || menUser.id != undefined) {
                            const razon = msg.content.split('-');
                            {
                                usuario.updateWarn(menUser.id, '+');
                                menUser.send('**FUE WARNEADO**\nMotivo de reporte: ' + razon[razon.length - 1] + '\nPara más info contactarse con Moderadores en <#501500942122745880>\nSHUX');
                            }
                            {
                                const ShuxSev = this.dsClient.guilds.find('id', config_1.serverID).channels.find('id', config_1.channelsTC.warnings.idTC);
                                ShuxSev.send('**WARNING A <@' + menUser.id + '>** por <@' + msg.author.id + '>\n__Razón/Prueba__: ' + razon[razon.length - 1]);
                            }
                        }
                    }
                    else if (msg.content.toLocaleLowerCase().startsWith('shux!rmwarn') && msg.content.toLocaleLowerCase().includes('-')) {
                        const usuario = new user_1.User(this.dsClient);
                        let menUser = msg.mentions.users.first();
                        if (menUser.username != undefined || menUser.id != undefined) {
                            const razon = msg.content.split('-');
                            {
                                msg.delete();
                                usuario.updateWarn(menUser.id, '-');
                                menUser.send('**SU WARN FUE REMOVIDO** por <@' + msg.author.id + '>\nSHUX');
                            }
                            {
                                const ShuxSev = this.dsClient.guilds.find('id', config_1.serverID).channels.find('id', config_1.channelsTC.warnings.idTC);
                                ShuxSev.fetchMessage(razon[razon.length - 2]).then((msg) => { msg.delete(); });
                                ShuxSev.send('**REMOVE WARNING DE <@' + menUser.id + '>** por <@' + msg.author.id + '>\n__Razón/Prueba__: ' + razon[razon.length - 1]);
                            }
                        }
                    }
                }
            }
        });
    }
}
exports.MSGshux = MSGshux;
function isUserEnable(roles, userDSID) {
    var _a;
    const sv = _1.dsclient.guilds.get(config_1.serverID);
    for (let rol of roles) {
        if ((_a = sv.members.get(userDSID)) === null || _a === void 0 ? void 0 : _a.roles.has(rol))
            return true;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXNnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21zZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0QyxpQ0FBOEI7QUFDOUIscUNBQTBEO0FBRTFELHdCQUE2QjtBQUM3QixxQ0FBa0M7QUFFbEMsTUFBYSxPQUFPO0lBRWhCLFlBQW9CLFFBQXdCO1FBQXhCLGFBQVEsR0FBUixRQUFRLENBQWdCO1FBRDVDLFdBQU0sR0FBVyxFQUFFLEdBQUMsRUFBRSxHQUFDLEVBQUUsR0FBQyxJQUFJLENBQUM7SUFHL0IsQ0FBQztJQUNELE1BQU0sQ0FBQyxHQUFvQjtRQUN2QixJQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2xCLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO2dCQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFBRTtpQkFDNUM7Z0JBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUFFO1NBQzdCO1FBQ0QsSUFBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUFFLE9BQU87U0FBRTtJQUNsQyxDQUFDO0lBQ0ssS0FBSyxDQUFDLEdBQW9COztZQUM1QixJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ2xELFFBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO29CQUNyQyxLQUFLLFlBQVksQ0FBQyxDQUFBO3dCQUNkLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0ZBQWdGLENBQUMsQ0FBQzt3QkFDeEcsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFjLEVBQUUsRUFBRTs0QkFDbEosSUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUNwQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDeEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMseUNBQXlDLENBQUMsQ0FBQzt3QkFDL0QsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzdGLE1BQU07cUJBQ1Q7b0JBQUMsS0FBSyxrQkFBa0IsQ0FBQyxDQUFBO3dCQUN0QixNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7d0JBRXhELE1BQU07cUJBQ1Q7b0JBQUMsS0FBSyxjQUFjLENBQUMsQ0FBQTt3QkFDbEIsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywrR0FBK0csQ0FBQyxDQUFDO3dCQUN2SSxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQWMsRUFBRSxFQUFFOzRCQUNsSixJQUFJLEtBQUssR0FBRyxJQUFJLFdBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQ3BDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUMxRCxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO3dCQUNqRCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDhDQUE4QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDN0YsTUFBTTtxQkFDVDtvQkFBQyxLQUFLLGFBQWEsQ0FBQyxDQUFBO3dCQUVqQixNQUFNO3FCQUNUO29CQUFDLEtBQUssZ0JBQWdCLENBQUMsQ0FBQTt3QkFDcEIsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3RUFBd0UsQ0FBQyxDQUFDO3dCQUNoRyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQWMsRUFBRSxFQUFFOzRCQUNuSixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFrQixFQUFFLEVBQUU7Z0NBQ2xELElBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxvQkFBb0IsRUFBRTtvQ0FDN0IsTUFBTSxPQUFPLEdBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFRLENBQUMsQ0FBQztvQ0FDeEQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEdBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUMsT0FBTyxHQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQ0FDdkgsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsK0RBQStELENBQUMsQ0FBQztpQ0FDcEY7NEJBQ0wsQ0FBQyxDQUFDLENBQUM7d0JBQ1AsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzdGLE1BQU07cUJBQ1Q7b0JBQUMsS0FBSyxpQkFBaUIsQ0FBQyxDQUFBO3dCQUNyQixNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDRlQUE0ZSxDQUFDLENBQUM7d0JBQ3BnQixNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDJLQUEySyxDQUFDLENBQUM7d0JBQ25NLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBYyxFQUFFLEVBQUU7NEJBQ2xKLElBQUcsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sSUFBSSxXQUFXLEVBQUU7Z0NBQ3pDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7NkJBQ3hDO2lDQUFNO2dDQUNILElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQWtCLEVBQUUsRUFBRTtvQ0FDbEQsSUFBRyxDQUFDLENBQUMsRUFBRSxJQUFJLG9CQUFvQixFQUFFO3dDQUM3QixNQUFNLE9BQU8sR0FBUSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQzt3Q0FDcEUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFDLEtBQUssR0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7d0NBQ3BHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLCtPQUErTyxDQUFDLENBQUM7cUNBQ3BRO2dDQUNMLENBQUMsQ0FBQyxDQUFDOzZCQUNOO3dCQUNMLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsOENBQThDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM3RixNQUFNO3FCQUNUO29CQUFDO3dCQUNFLE1BQU07aUJBQ2I7YUFFSjtRQUNMLENBQUM7S0FBQTtJQUNLLE1BQU0sQ0FBQyxHQUFvQjs7WUFDN0IsSUFBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNwRCxJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUU7b0JBQzFELElBQUksS0FBSyxHQUFHLElBQUksV0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDcEMsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQW9CLEVBQUUsRUFBRTs7d0JBQzVELElBQUksTUFBTSxHQUFzQixJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQzt3QkFDeEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDOzZCQUNsSyxRQUFRLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDOzZCQUM3QyxRQUFRLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDOzZCQUM3QyxZQUFZLE9BQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLDBDQUFFLFFBQVEsQ0FBQyxDQUFBO3dCQUM3RCxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDN0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTt3QkFDVixHQUFHLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUE7b0JBQzFDLENBQUMsQ0FBQyxDQUFDO2lCQUNOO3FCQUFNLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRTtvQkFFN0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNwQyxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7b0JBRWpDLElBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRTt3QkFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDM0k7eUJBQU07d0JBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxpQkFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFBRTtpQkFDOUM7cUJBQU0sSUFBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUM3RCxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNyQjtxQkFBTSxJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLG1CQUFVLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxZQUFZLENBQUMsbUJBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQ3JLLE1BQU0sUUFBUSxHQUFXLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFFLENBQUM7b0JBQ3pFLENBQUMsSUFBSSxlQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ2hGO2dCQUVELElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksbUJBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLG1CQUFVLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxtQkFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUU7b0JBQzNJLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxZQUFZLENBQUMsbUJBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUU7d0JBQ3hLLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxZQUFZLENBQUMsbUJBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUU7NEJBQ2pILE1BQU0sT0FBTyxHQUFHLElBQUksV0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFDeEMsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7NEJBQ3pDLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyx5Q0FBeUMsR0FBQyxtQkFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUMsdUZBQXVGLENBQUMsQ0FBQzs0QkFDL0ssTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQU8sU0FBYyxFQUFFLEVBQUU7Z0NBQzlKLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztnQ0FDdEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0ZBQW9GLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO29DQUM1RyxNQUFNLFFBQVEsR0FBNEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxpQkFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsbUJBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7b0NBQ2xJLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUMsd0NBQXdDLEdBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sR0FBQyxPQUFPLENBQUMsQ0FBQztnQ0FDekgsQ0FBQyxDQUFDLENBQUM7NEJBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDOUU7d0JBQ0QsT0FBTztxQkFDVjt5QkFBTSxJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLElBQUksWUFBWSxDQUFDLG1CQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO3dCQUMzSCxPQUFPO3FCQUNWO3lCQUFNLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsSUFBSSxZQUFZLENBQUMsbUJBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUU7d0JBQzNILE9BQU87cUJBQ1Y7eUJBQU07d0JBQ0gsSUFBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUM7NEJBQzNHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs0QkFDYixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywwUEFBMFAsQ0FBQyxDQUFBO3lCQUM5UTtxQkFDSjtpQkFDSjtxQkFBTSxJQUFHLFlBQVksQ0FBQyxtQkFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDOUQsSUFBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ3pHLE1BQU0sT0FBTyxHQUFHLElBQUksV0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDeEMsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQ3pDLElBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxTQUFTLElBQUksT0FBTyxDQUFDLEVBQUUsSUFBSSxTQUFTLEVBQUU7NEJBQ3pELE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUNyQztnQ0FDSSxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0NBQ3BDLE9BQU8sQ0FBQyxJQUFJLENBQUMsdUNBQXVDLEdBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLEdBQUMsNEVBQTRFLENBQUMsQ0FBQzs2QkFDNUo7NEJBQ0Q7Z0NBQ0ksTUFBTSxPQUFPLEdBQTRCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsaUJBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLG1CQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNqSSxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxFQUFFLEdBQUcsWUFBWSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLHVCQUF1QixHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NkJBQ2hJO3lCQUNKO3FCQUNKO3lCQUFNLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUNsSCxNQUFNLE9BQU8sR0FBRyxJQUFJLFdBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ3hDLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUN6QyxJQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksU0FBUyxJQUFJLE9BQU8sQ0FBQyxFQUFFLElBQUksU0FBUyxFQUFFOzRCQUN6RCxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDckM7Z0NBQ0ksR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dDQUNiLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztnQ0FDcEMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsR0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBQyxTQUFTLENBQUMsQ0FBQzs2QkFDM0U7NEJBQ0Q7Z0NBQ0ksTUFBTSxPQUFPLEdBQTRCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsaUJBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLG1CQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNqSSxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQ0FDakYsT0FBTyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxPQUFPLENBQUMsRUFBRSxHQUFHLFlBQVksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyx1QkFBdUIsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzZCQUN4STt5QkFDSjtxQkFDSjtpQkFDSjthQUNKO1FBQ0wsQ0FBQztLQUFBO0NBQ0o7QUFuS0QsMEJBbUtDO0FBQ0QsU0FBUyxZQUFZLENBQUMsS0FBb0IsRUFBRSxRQUFnQjs7SUFDeEQsTUFBTSxFQUFFLEdBQXNCLFdBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFRLENBQUMsQ0FBQztJQUM1RCxLQUFJLElBQUksR0FBRyxJQUFJLEtBQUssRUFBRTtRQUNsQixVQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQywwQ0FBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUc7WUFBRyxPQUFPLElBQUksQ0FBQztLQUM1RDtJQUFDLE9BQU8sS0FBSyxDQUFDO0FBQ25CLENBQUMifQ==