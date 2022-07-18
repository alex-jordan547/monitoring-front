import {defineStore} from "pinia";
import axios from "axios";

let user = localStorage.getItem('user');
if(!user){
    user = {
        userId: -1,
            token: ''
    }
}else {
    try {
        user = JSON.parse(user);
        axios.defaults.headers.common['Authorization'] = user.token
    }catch (e) {
        user = {
            userId: -1,
            token: ''
        }
    }
}

export const useUserStore = defineStore('user', {
    state() {
        return {
            statut: '',
            user:user,
            userInfos: {
                name: '',
                lastname: '',
                email: '',
                roles: [],
                poste: ''
            }
        }
    },
    actions: {
        //Inscription
        register(user) {
            this.setStatus('loading')
            axios({
                method: 'post',
                url: '/api/user/register',
                data: {email: user.email, name: user.name, lastname: user.lastname, password: user.password,poste:user.poste}
            })
                .then(response => {
                    // console.log(response)
                    this.setStatus('')
                    user.onSuccess();
                });

        },
        //Connexion
        login(user) {
            try {
                this.setStatus('loading')
                axios({
                    method: 'post',
                    url: '/api/user/login',
                    data: {email: user.email, name: user.name, lastname: user.lastname, password: user.password}
                })
                    .then(response => {
                        //console.log(response.data.status)
                        if (response.data.status === 401) {
                            user.onNotFound();
                            this.setStatus('')
                        } else if (response.data.status === 403) {
                            user.onErrorPassword();
                            this.setStatus('')
                        } else {
                            this.logUser(response.data)
                            this.setStatus('')
                            user.onSuccess();
                        }

                    });

            } catch (e) {
                console.log(e)
            }

        },
        //Déconnexion
        logout() {
            this.user =  {
                userId: -1,
                token: ''
            }
            localStorage.removeItem('user');
        },
        //Mise à jour du statut de chargement des requêtes
        setStatus(statut) {
            this.statut = statut;
        },
        //Assignation des infos de l'utilisateur
        logUser(user) {
            axios.defaults.headers.common['Authorization'] = user.token
            localStorage.setItem('user', JSON.stringify(user));
            this.user = user;
        },
        setUserInfos(user) {
            this.userInfos = user;
        },
        getUserInfos() {

            axios({method: 'post', url: '/api/user/infos', data: {id: this.user.userId}})
                .then(response => {
                     console.table(response.data)
                    if (response.data.token === 'yes') {
                        this.setUserInfos(response.data.user)
                    } else {
                        localStorage.removeItem('user');
                    }
                });
        },
        resetPass(object){
            this.setStatus('loading')
            axios({
                method: 'post',
                url: '/api/user/resetPass',
                data: {password: object.password,token:object.token}
            })
                .then(response => {
                    console.log(response)

                    if(response.data.statut === "token corrompu"){
                        object.onCorrompu();
                        this.setStatus('')
                    }else if(response.data.statut === "ok"){
                        object.onSuccess();
                    }
                    else if(response.data.statut === "invalid"){
                        object.onExpired();
                    }
                     this.setStatus('')
                });


        }
        ,

    },
    getters: {
        isAuthenticated(){
            return this.user.userId !== -1;
        },
        isAdmin(){
            return this.userInfos.roles.includes('ROLE_ADMIN');
        },


    }

})