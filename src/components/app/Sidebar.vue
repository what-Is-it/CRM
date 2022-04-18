<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpen}">
    <li>
      <router-link to="/" class="waves-effect waves-orange pointer">{{localizeFilter('Menu_Bill')}}</router-link>
    </li>
    <li>
      <router-link
        to="/history"
        class="waves-effect waves-orange pointer"
      >{{localizeFilter('Menu_History')}}</router-link>
    </li>
    <li>
      <router-link
        to="/planning"
        class="waves-effect waves-orange pointer"
      >{{localizeFilter('Menu_Planning')}}</router-link>
    </li>
    <li>
      <router-link
        to="/record"
        class="waves-effect waves-orange pointer"
      >{{localizeFilter('Menu_NewRecord')}}</router-link>
    </li>
    <li>
      <router-link
        to="/categories"
        class="waves-effect waves-orange pointer"
      >{{localizeFilter('Menu_Categories')}}</router-link>
    </li>
  </ul>
</template>

<script>
import localizeFilter from '../../filters/localize.filter'
export default {
  props: ['isOpen'],
  methods: {
    localizeFilter,
  }
}
</script>

<style lang="scss" scoped></style>
