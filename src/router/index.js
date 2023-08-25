import Vue from 'vue'
import VueRouter from 'vue-router'

import Admin from '@/views/MyAdmin.vue'
import Article from '@/views/MyArticle.vue'
import Category from '@/views/MyCategory.vue'
import Comment from '@/views/MyComment.vue'
import Gallery from '@/views/MyGallery.vue'
import Home from '@/views/MyHome.vue'
import Login from '@/views/MyLogin.vue'
import Poem from '@/views/MyPoem.vue'
import Setting from '@/views/MySetting.vue'
import Tags from '@/views/MyTags.vue'
import Write from '@/views/MyWrite.vue'
import Register from '@/views/MyRegister.vue'
import Homepage from '@/views/MyHomepage.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/home',
    component: Home,
    redirect: '/home/homepage',
    children: [
      { path: 'article', component: Article },
      { path: 'homepage', component: Homepage },
      { path: 'category', component: Category },
      { path: 'comment', component: Comment },
      { path: 'gallery', component: Gallery },
      { path: 'article', component: Article },
      { path: 'admin', component: Admin },
      { path: 'poem', component: Poem },
      { path: 'setting', component: Setting },
      { path: 'tags', component: Tags },
      { path: 'write', component: Write }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/login') {
    if (token || to.path === '/register') {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
