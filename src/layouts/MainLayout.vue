<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-main-layout" v-else>
      <Navbar @menuClick="isOpen = !isOpen" />
      <Sidebar :isOpen="isOpen" />

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue"
          to="/record"
          v-tooltip="'Создать новую запись'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import messages from '../utils/messages'
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
export default {
  name: 'main-layout',
  components: {
    Navbar,
    Sidebar,
  },
  async mounted() {
    if(Object.keys(this.$store.getters.info)){
      await this.$store.dispatch('userInfo')
      await console.log(this.$store.getters.info)
    }
    this.loading = false
  },
  data() {
    return {
      isOpen: true,
      loading: true
    }
  },
  computed: {
    error(){
      return this.$store.getters.getError
    }
  },
  watch: {
    error(fbError){
      console.log(fbError.code);
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  }
}
</script>

<style lang="scss" scoped></style>
