import MainPage from '@/pages/mainPage.vue'
import ResultsPage from '@/pages/resultsPage.vue'
import SettingsPage from '@/pages/settingsPage.vue'
import gamePage from '@/pages/gamePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainPage
    },
    {
      path: '/settings',
      component: SettingsPage
    },
    {
      path: '/results',
      component: ResultsPage
    },
    {
      path: '/game',
      component: gamePage
    },
  ],
})

export default router
