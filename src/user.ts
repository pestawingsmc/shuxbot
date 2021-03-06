//#region IMPORTS
//#region Plug
import * as Discord  from "discord.js";
import * as firebase from "firebase/app";
import "firebase/database";
//#endregion
import { serverID, listaErr, listaPass, channelsTC, LVLs } from "./const";
import { electos } from "./interfaces/elecciones";
import { fbuser } from "./interfaces/users";
import { dsclient } from ".";
//#endregion

export class User {
	shuxServe: Discord.Guild = this.dsclient.guilds.find('id', serverID);

    constructor(private dsclient: Discord.Client) {  }
    //#region User FNs
        async miPerfil(uid: string) {
		    const author: Discord.GuildMember = this.shuxServe.members.find('id', uid);
            const listPreg: Array<string> = [
                'Por favor, ingrese su fecha de cumpleaños\n**FORMATO: DIA/MES* - ejemplo: 31/5*',
                'Por favor, ingresa su URL del build de PicPartPicker\nSi no posee un enlace, vaya a https://pcpartpicker.com/'
            ];
            await author.send('A continuación, podrá editar su perfil\n#cancelar :: terminar carga | #siguiente :: para saltear -- Tiene 5 minutos');
            for(let i=0; i<listPreg.length; i++) {
                await author.send(listPreg[i]);
                await author.user.dmChannel.awaitMessages((m: any) => author.id == m.author.id, { max: 1, time: 5*60000, errors: ['TIME'] }).then((collected: any) => {
                    if(collected.first().content == '#cancelar') {
                        author.send('La carga fue cancelada,\nSaludos SHUX');
                        return 0;
                    } else if(collected.first().content == '#siguiente') {
                        
                    } else {
                        switch(i) {
                            case 0: {
                                this.setaddfc(uid,collected.first().content);
                                break;
                            } case 1: {
                                this.setPCBuilf(uid,collected.first().content);
                                break;
                            }
                        }
                    }
                }).catch((err: any) => { author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
            } await author.send('La carga fue finalizada,\nSaludos SHUX');
        }
        /* asignarViejosMiembros(){
            const usuariosShux: Array<Discord.GuildMember> = this.shuxServe.members.array();
            let i=0;
            setInterval(() => {
                    for(let miLvl of LVLs) {
                        if(usuariosShux[i].roles.has(miLvl.roleLVL)) {
                            usuariosShux[i].addRole('700343155593183255').catch(() => {});
                            break;
                        }
                    
                } i++;
                console.log(i,' de ', usuariosShux.length);
            }, 1000);
        } */
        changeLVL(uid: string) {
            this.getMyProfile(uid).then((snapshot: any) => {
                const usuario: fbuser = snapshot;
                if(usuario.points==null) return;
                let userShux: Discord.GuildMember = this.shuxServe.member(uid);
                let subeNivel: { newLVL: boolean; idLVL: string, oldLVL: string } = lvlUP(usuario.points, userShux.roles.keyArray());
                if(subeNivel.newLVL && subeNivel.idLVL!=subeNivel.oldLVL) {
                    if(!(userShux.roles.has(subeNivel.idLVL))) {
                        userShux.addRole(subeNivel.idLVL).then(() => {
                            userShux.removeRole(subeNivel.oldLVL);
                        });
                    }
                } return;
            });
        }
        eleccionesWinners() {
            const elecFB = firebase.database().ref('/elecciones');
            let votaciones: Array<electos> = new Array(0);
            elecFB.once('value', snapshot => {
                snapshot.forEach(snap => {
                    let auxElec: electos = { idElecto: null, idVotantes: 0 };
                    auxElec.idElecto = snap.key;
                    snap.forEach(voto => {
                        auxElec.idVotantes++;
                    }); votaciones.push(auxElec);
                }); this.ponsacMonthRol(votaciones);
            });
        }
        ponsacMonthRol(votos: Array<electos>) {
            //let ;
        }
        listaTopUsers(): Array<Array<any>> {
            let ListaUsers: Array<Array<any>> = []
            const shuxRoles: Discord.Guild|any = dsclient.guilds.find('id', serverID);
            for(let i = (LVLs.length-7); i < LVLs.length; i++) {
                const rolAux:Discord.Role = shuxRoles.roles.find('id', LVLs[i].roleLVL);
                ListaUsers.push(rolAux.members.array());
            }
            this.searchDeletedUser(ListaUsers);
            return ListaUsers;
        }
        searchDeletedUser(users: Array<Array<string>>) {
            const shuxuser: Discord.Guild|any = this.dsclient.guilds.find('id', serverID);
            for(let i=0; i<users.length; i++){
                if(users[i].length>0) {
                    for(let j=0; j<users[i].length; j++) {
                        const me: Discord.GuildMember = shuxuser.member(String(users[i][j]));
                        //console.log(me)
                        if(!me) { 
                            /* console.log('No esta en el server'); */
                            
                        }
                    }
                }
            }
        }
        async createRole(uid: string) {
            const author: Discord.GuildMember = this.shuxServe.members.find('id', uid);
            let roles_: Array<string> = new Array(0);
            for(let i=LVLs.length-5; i<LVLs.length; i++) { roles_.push(LVLs[i].roleLVL); }
            if(isUserEnable(roles_, uid)) {
                //#region
                const listPreg: Array<string> = [
                    'Por favor, ingrese su nombre de Rol\nSi desea cancelar -> #cancelar',
                    'Por favor, ingresar el color (**Formato #COLOR** -> usar ColorPicker en Google)'
                ];
                let flag: boolean = false;
                //#endregion
                let datos_: Array<string> = new Array(0);
                console.log(listPreg.length)
                for(let i=0; i<listPreg.length && !flag; i++) {
                    await author.send(listPreg[i]);
                    await author.user.dmChannel.awaitMessages((m: any) => uid == m.author.id, { max: 1, time: 130000, errors: ['TIME'] }).then(async(collected: any) => {
                        if(collected.first().content=='#cancelar') {
                            author.send('Se ha quedado sin tiempo!!\nVuelva a empezar');
                            flag = true;
                        } else {
                            console.log(collected.first().content);
                            await datos_.push(collected.first().content);
                        }
                    }).catch((err: any) => { author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                }
                this.getMyProfile(uid).then((miPerfil: fbuser|any) => {
                    if(miPerfil.customRole!='' || miPerfil.customRole==undefined || miPerfil.customRole==NaN) {
                        this.shuxServe.createRole({ name: String(datos_[0]), color: String(datos_[1]) }).then(async(role_: Discord.Role) => {
                            console.log('cree y entre')
                            await role_.setPosition(17);
                            await this.shuxServe.member(uid).addRole(role_.id);
                            await this.updateRole(uid, role_.id);
                            await author.send('Su ROL ya fue creado!!\nSaludos, SHUX');
                        });
                    } else { author.send('Ya posee un rol, solicite un ticket reporte si quiere eliminarlo o modificarlo!!\nSaludos, SHUX'); }
                }).catch(() => {});
            } else { await author.send('No posee rango para crear un rol, debe tener minimo LVL 20!!\nSaludos, SHUX'); }
        }
        
    //#endregion
    //#region DB
        //#region GET
            getMyProfile(uid: string) {
                return new Promise((resolve, reject) => {
                    const userFB = firebase.database().ref('/users').child(uid);
                    userFB.once('value', snapshot => {
                        resolve(snapshot.exportVal());
                    }).catch(err => reject(err));
                });
            }
        //#endregion
        //#region SET
            setPerfil(uid: string) {
                const userFB = firebase.database().ref('/users').child(uid);
                userFB.set({ birth: '-', points: 0, warns: 0 });
            }
            setaddfc(uid: string, fecha: string){
                const userFB = firebase.database().ref('/users').child(uid);
                userFB.update({ birth: fecha });
            }
            setPCBuilf(uid: string, url_: string) {
                const userFB = firebase.database().ref('/users').child(uid);
                userFB.update({
                    urlbuild: url_
                });
            }
            setVoto(uidVoter: string, uidElector: string) {
                return new Promise((resolve, reject) => {
                    if(isUserEnable(channelsTC.ciervos.roles, uidElector)) {
                        const eleccionesFB = firebase.database().ref('/elecciones/staff');
                        this.votoNoRep(uidVoter, eleccionesFB).then((res) => {
                            if(res==true) { this.votoFn(uidVoter, (eleccionesFB.child(uidElector))).then((res: any) => { resolve(res); }); }
                        }).catch((err) => { reject(err) });
                    } else {
                        const eleccionesFB = firebase.database().ref('/elecciones/user');
                        this.votoNoRep(uidVoter, eleccionesFB).then((res) => {
                            if(res==true) { this.votoFn(uidVoter, (eleccionesFB.child(uidElector))).then((res: any) => { resolve(res); }); }
                        }).catch((err) => { reject(err); });
                    }
                });
            }
            setTicketTC(uid: string, tipo_: string) {
                const userFB = firebase.database().ref('/users').child(uid);
                switch(tipo_) {
                    case 'SUPP': {
                        userFB.update({ supTicket: true });
                        break;
                    } case 'STAFF': {
                        userFB.update({ staffTicket: true });
                        break;
                    }
                }
            }
            //#region VOTO
                votoFn(uidVoter: string, eleccionesFB: any) {
                    return new Promise((resolve, reject) => {
                        let votantes: Array<string> = new Array(0);
                        eleccionesFB.once('value', (snapshot: any) => {
                            snapshot.forEach((item: any) => { votantes.push(item.val()); }); 
                            votantes.push(uidVoter);
                            if(votantes.length == 1) { eleccionesFB.set(votantes).then(() => { resolve(listaPass.voto.info); }); }
                            else { eleccionesFB.update(votantes).then(() => { resolve(listaPass.voto.info); }); }
                        }).catch((err: any) => { console.log(err); });
                    });
                }
                votoNoRep(uidVoter: string, electos: any) {
                    return new Promise((resolve, reject) => {
                        electos.once('value', (snapshot: any) => {
                            let contador = 0;
                            snapshot.forEach((snap: any) => {
                                snap.forEach((item: any) => { if(item.val() == uidVoter) contador++; }); 
                            });
                            if(contador>=3) { reject(listaErr.votoMulti.info); }
                            else if(contador>0 && contador<3) { reject(listaErr.votoRep.info); }
                            resolve(true)
                        });
                    });
                }
            //#endregion
            setWarn(uid: string) { firebase.database().ref('/users').child(uid).update({ warns: 1 }); }
        //#endregion
        //#region UPDATE
            updateRole(uid: string, flag: string) {
                firebase.database().ref('/users').child(uid).update({ customRole: flag }).catch((err: any) => console.log(err));
            }
            updateWarn(uid: string, addrm: string) {
                this.getMyProfile(uid).then((miPerfil: fbuser|any) => {
                    console.log(miPerfil.warns);
                    if((miPerfil.warns==0 || miPerfil.warns==undefined || miPerfil.warns==NaN) && (addrm != '-')) {
                        this.setWarn(uid);
                        return;
                    }
                    {
                        let sum = miPerfil.warns;
                        switch(addrm) {
                            case '+': {
                                sum+=1;
                                break;
                            } case '-': {
                                if(sum > 0) sum-=1;
                                break;
                            }
                        }
                        firebase.database().ref('/users').child(uid).update({ warns: sum }); 
                    }
                }).catch(() => {});
            }
            updatePoints(uid: string, points_: number) {
                this.getMyProfile(uid).then((snap: any)  => {
                    let sum = points_, miPerfil: fbuser = snap;
                    if(miPerfil.points!=null) {
                        sum+=miPerfil.points;
                    } firebase.database().ref('/users').child(uid).update({ points: sum });
                    this.changeLVL(uid);
                }).catch(() => {});
            }
            deleteTicket(uid: string, tipo_: string) {
                const userFB = firebase.database().ref('/users').child(uid);
                switch(tipo_) {
                    case 'SUPP': {
                        userFB.update({ supTicket: false });
                        break;
                    } case 'STAFF': {
                        userFB.update({ staffTicket: false });
                        break;
                    }
                }
            }
        //#endregion
        //#region DELETE
            deleteProfile(dsid: string) {
                const userData = firebase.database().ref('/users').child(dsid).remove();
            }
        //#endregion
    //#endregion
}
function isUserEnable(roles: Array<string>, userDSID: string): boolean {
    const sv: Discord.Guild = dsclient.guilds.find('id', serverID);
    for(let rol of roles) {
        if(sv.members.find('id', userDSID)?.roles.has(rol)) return true;
    } return false;
}
function lvlUP(userPoints: number, roles_: string[]): { newLVL: boolean; idLVL: string, oldLVL: string} {
    let actualLVL: string = '-';
    for(let lvls_ of LVLs) {
        for(let myLvl of roles_) {
            if(myLvl==lvls_.roleLVL) { 
                actualLVL=lvls_.roleLVL;
                break;
            }
        }
    }
    for(let lvls_ of LVLs) {
        if(userPoints>=(lvls_.minLvl*1000)&&userPoints<(lvls_.maxLvl*1000)) { 
            return { newLVL: true, idLVL: lvls_.roleLVL, oldLVL: actualLVL };
        }
    } 
    return { newLVL: false, idLVL: '-', oldLVL: '-' };
}
export function updateDB() {
    firebase.database().ref('/users').on('value', snapshot => {
        snapshot.forEach(snap => {
            console.log(snap.exportVal());
        });
    });
}