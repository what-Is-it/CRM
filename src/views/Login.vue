<template>
  <form class="card auth-card" @submit.prevent="submitForm">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="e_mail"
          :class="{
            invalid:
              (v$.e_mail.$dirty && !v$.e_mail.required.$response) ||
              (v$.e_mail.$dirty && !v$.e_mail.email.$response),
          }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="v$.e_mail.$dirty && !v$.e_mail.required.$response"
          >Поле Email не должно быть пустым</small
        >
        <small
          class="helper-text invalid"
          v-else-if="v$.e_mail.$dirty && !v$.e_mail.email.$response"
          >Введите корректный Email</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
          v-model.trim="password"
          :class="{
            invalid:
              (v$.password.$dirty && !v$.password.required.$response) ||
              (v$.password.$dirty && !v$.password.minLength.$response),
          }"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="v$.password.$dirty && !v$.password.required.$response"
          >Введите пароль</small
        >
        <small
          class="helper-text invalid"
          v-if="v$.password.$dirty && !v$.password.minLength.$response"
          >Пароль не может быть меньше
          {{ v$.password.minLength.$params.min }} символов, сейчас
          {{ password.length }}</small
        >
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from '@vuelidate/validators'
import {useVuelidate} from '@vuelidate/core'
export default {
  name: 'Login',
  setup: () => ({v$: useVuelidate()}),
  data() {
    return {
      e_mail: '',
      password: '',
    }
  },
  validations() {
    return {
      e_mail: {email, required},
      password: {required, minLength: minLength(8)},
    }
  },
  methods: {
    async submitForm() {
      const result = await this.v$.$validate()
      if (!result) {
        console.log('validation error')
        return
      }
      const formData = {
        email: this.e_mail,
        password: this.password,
      }
      console.log(formData)
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped></style>
