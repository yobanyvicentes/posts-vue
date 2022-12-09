import { createApp } from 'vue';
import {createRouter, createWebHashHistory} from 'vue-router'
import App from './App.vue';
import Category from '../src/components/Category.vue'
import Post from '../src/components/Post.vue'



const routes = [
    { path: "/categories", component: Category,},
    { path: "/posts", component: Post, },
    { path: "/", component: Post, },

];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const app = createApp(App)

app.use(router)

app.mount('#app')
