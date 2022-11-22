import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue')
  },
  {
    path: '/cargar',
    name: 'cargar',
 
    component: () => import(/* webpackChunkName: "ingresar" */ '../views/IngresarFrase.vue')
  },
  {
    path: '/frasesguardadas',
    name: 'frasesguardadas',
 
    component: () => import(/* webpackChunkName: "ingresar" */ '../components/Mis-Frases.vue')
  },

  

  { 
    path: '/editarfrase/:autor/:frase/:selected/:anio/:id', 
    name:'editarfrase',
    component: () => import(/* webpackChunkName: "ingresar" */ '../views/EditarFrase.vue')

  }
]

const router = new VueRouter({
  routes
})

export default router
