
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast();


export const useToastStore = defineStore('toast' ,{
    state(){
        return{
            toast:[]
        }
    },
    actions: {
        success(message) {
            toast.success(message, {
                timeout: 2000,
            });
        },
        error(message) {
            toast.error(message,{

                timeout: 2500,
            });
        },
        warning(message) {
            toast.warning(message,{

                timeout: 2000,
            });
        },
        info(message) {
            toast.info(message,{
                timeout: 3000,
            });
        },

    }

    })