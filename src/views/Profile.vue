<template>
  <div>
    <div class="page-title">
      <h3>{{ localizeFilter('ProfileTitle') }}</h3>
    </div>

    <form class="form" @submit.prevent="submitForm">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{
            invalid: v$.name.$dirty && !v$.name.required.$response,
          }"
        />
        <label for="description">{{ localizeFilter('Name') }}</label>
        <span
          class="helper-text invalid"
          v-if="v$.name.$dirty && !v$.name.required.$response"
          >{{ localizeFilter('EnterName') }}</span
        >
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ localizeFilter('Update') }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import localizeFilter from '../filters/localize.filter'
import {required} from '@vuelidate/validators'
import {useVuelidate} from '@vuelidate/core'
export default {
  setup: () => ({v$: useVuelidate()}),
  metaInfo: {
    title: 'Profile',
  },
  data() {
    return {
      name: '',
      isRuLocale: true,
    }
  },
  validations() {
    return {
      name: {required},
    }
  },
  mounted() {
    this.name = this.$store.getters.info.name
    this.isRuLocale = this.$store.getters.info.locale === 'ru-RU'
    setTimeout(() => {
      window.M.updateTextFields()
    }, 0)
  },
  methods: {
    localizeFilter,
    async submitForm() {
      const result = await this.v$.$validate()
      if (!result) {
        console.log('validation error')
        return
      }

      try {
        const name = this.name
        const locale = this.isRuLocale ? 'ru-RU' : 'en-US'
        await this.$store.dispatch('updateInfo', {name, locale})
      } catch (e) {
        console.log('login error')
      }
    },
  },
}
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
