import { createWebHistory, createRouter } from 'vue-router'
import Home from './pages/Home.vue'
import CategoryDetails from './pages/CategoryDetails.vue'
import Items from './pages/Items.vue'
import ItemDetails from './pages/ItemDetails.vue'
import Contact from './pages/Contact.vue'
import Login from './pages/Login.vue'
import Cart from './pages/Cart.vue'
import Profile from './pages/Profile.vue'

const routes = [
  { path: '/', component: Home, name: 'Home' },
  {
    path: '/categories/:category_id',
    component: CategoryDetails,
    name: 'CategoryDetails'
  },
  { path: '/items', component: Items, name: 'Items' },
  { path: '/items/:item_id', component: ItemDetails, name: 'ItemDetails' },
  { path: '/contact', component: Contact, name: 'Contact' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/cart', component: Cart, name: 'Cart' },
  { path: '/profile/:user_id', component: Profile, name: 'Profile' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
