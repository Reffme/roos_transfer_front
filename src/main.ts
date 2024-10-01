import './assets/main.css'

import '@/utils/validators'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createHead } from '@vueuse/head';
import VueHead from 'vue-head'

const app = createApp(App)
const head = createHead();

app.use(createPinia())
app.use(router)
app.use(head);
app.use(VueHead)

app.mount('#app')
