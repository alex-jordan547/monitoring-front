<template>
<h1>Equipements</h1>
</template>

<script>
import {useToastStore} from "@/store/toast";

export default {
  setup(){
    const useToast = useToastStore();
    return{
      useToast
    }
},
  name: "GestionEquipement",
  data(){
    return{
      data:[],
      ip:''

    }
  },
  mounted() {
    this.useToast.success('load')
  },
  methods:{
    getIpAdress(){

      }
    }
  }

</script>

<style scoped>

</style>