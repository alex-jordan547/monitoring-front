import {defineStore} from "pinia";
import axios from "axios";

export const useUserStore = defineStore('equipements', {
    state() {
        return {
            statut: '',
        }
    },
    actions: {

        //Mise à jour du statut de chargement des requêtes
        setStatus(statut) {
            this.statut = statut;
        },
        getEquipements() {

            axios({method: 'get', url: '/api/user/infos', data: {id: this.user.userId}})
                .then(response => {
                    console.table(response.data)
                    if (response.data.token === 'yes') {
                        this.setUserInfos(response.data.user)
                    } else {
                        localStorage.removeItem('user');
                    }
                });
        },
    },
    getters: {

    }

})