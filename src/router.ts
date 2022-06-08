import HelloWorld from "./components/HelloWorld.vue";
import * as VueRouter from "vue-router";
import { h } from "vue";
import AuthVue from "./views/Auth.vue";
import LoginVue from "./views/Login.vue";
import RegisterVue from "./views/Register.vue";
import SearchVue from "./views/Search.vue";
import CartVue from "./views/Cart.vue";
import OrderVue from "./views/Order.vue";
const routes = [
    {
        path: "/",
        component: HelloWorld
    },
    {
        path: "/auth",
        component: AuthVue,
        children: [
            {
                path: "login",
                name: "login",
                component: LoginVue
            },
            {
                path: "register",
                name: "register",
                component: RegisterVue
            }
        ]
    },
    {
        path: "/cart",
        name: 'cart',
        component: CartVue
    },
    {
        path: "/search",
        component: SearchVue,
    },
    {
        path: "/order",
        component: OrderVue,
    }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});

export default router;
