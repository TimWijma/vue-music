import { createRouter, createWebHistory } from "vue-router";
import Profile from "../views/Profile.vue";

const routes = [
    {
        path: "/:username",
        name: "Profile",
        component: Profile,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
