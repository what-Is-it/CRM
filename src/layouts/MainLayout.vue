<template>
  <div class="app-main-layout">
    <Navbar @menuClick="isOpen = !isOpen" />
    <Sidebar :isOpen="isOpen" />

    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
export default {
  name: 'main-layout',
  components: {
    Navbar,
    Sidebar,
  },
  data() {
    return {
      isOpen: true,
    }
  },
}
</script>

<style lang="scss" scoped></style>
