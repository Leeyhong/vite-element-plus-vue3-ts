import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@element-plus/icons-vue'

const app = createApp(App)
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
      next();
    } else {
      let token = localStorage.getItem('Authorization');
      if (token === null || token === '') {
        next('/login'); // token存储在localStorage中
      } else {
        if (to.matched.length === 0) {
          next('/404')
        } else {
          next();
        }
      }
    }
  })
 
app.use(router)
app.use(ElementPlus)
app.mount('#app')
