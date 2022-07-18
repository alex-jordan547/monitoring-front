import { createRouter, createWebHistory } from "vue-router";
import GestionEquipement from "@/components/GestionEquipement";

const routes = [
    {name:'Equipements', path: '/Equipements', component: GestionEquipement },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


export default router;