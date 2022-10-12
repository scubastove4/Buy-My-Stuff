import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { MdEmailOutlined, IoLogoInstagram } from 'oh-vue-icons/icons'
import './styles/indexMain.css'
import './styles/App.css'

addIcons(MdEmailOutlined, IoLogoInstagram)

createApp(App).use(router).component('v-icon', OhVueIcon).mount('#app')
