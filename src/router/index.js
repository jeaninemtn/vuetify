/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto';
import { setupLayouts } from 'virtual:generated-layouts';
// import { routes } from 'vue-router/auto-routes';

const routes = [
  { path: "/index", name: "Index", component: () => import("../pages/index.vue") },
  { path: "/button", name: "Buttons", component: () => import("../views/Button.vue") },
  { path: "/checkbox", name: "Checkbox", component: () => import("../views/Checkbox.vue") },
  { path: "/input", name: "Input", component: () => import("../views/Input.vue") },
  { path: "/select", name: "Select", component: () => import("../views/Select.vue") },
  { path: "/colors", name: "Colors", component: () => import("../views/Colors.vue") },
  { path: "/fonts", name: "Fonts", component: () => import("../views/Fonts.vue") },

  { path: "/", redirect: "/index" }, // 預設跳轉到首頁
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
