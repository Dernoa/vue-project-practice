import MainPage from '@/pages/mainPage.vue'
import ResultsPage from '@/pages/resultsPage.vue'
import SettingsPage from '@/pages/settingsPage.vue'
import StatisticPage from '@/pages/statisticPage.vue'
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
      path: '/statistics',
      component: StatisticPage
    },
  ],
})

export default router
