<template>
  <div>
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
          >Поле Email не должно быть пустым</small>
          <small
            class="helper-text invalid"
            v-else-if="v$.e_mail.$dirty && !v$.e_mail.email.$response"
          >Введите корректный Email</small>
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
          >Введите пароль</small>
          <small
            class="helper-text invalid"
            v-if="v$.password.$dirty && !v$.password.minLength.$response"
          >
            Пароль не может быть меньше
            {{ v$.password.minLength.$params.min }} символов, сейчас
            {{ password.length }}
          </small>
        </div>
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: v$.name.$dirty && !v$.name.required.$response}"
          />
          <label for="name">Имя</label>
          <small
            class="helper-text invalid"
            v-if="v$.name.$dirty && !v$.name.required.$response"
          >Введите ваше имя</small>
        </div>
        <p>
          <label>
            <input type="checkbox" v-model="agree" />
            <span>С правилами согласен</span>
          </label>
        </p>
      </div>
      <div class="card-action">
        <div>
          <button class="btn waves-effect waves-light auth-submit" type="submit">
            Зарегистрироваться
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Уже есть аккаунт?
          <router-link to="/login">Войти!</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import {email, required, minLength} from '@vuelidate/validators'
import {useVuelidate} from '@vuelidate/core'
export default {
  name: 'Register',
  setup: () => ({v$: useVuelidate()}),
  data() {
    return {
      e_mail: '',
      password: '',
      name: '',
      agree: false
    }
  },
  validations() {
    return {
      e_mail: {email, required},
      password: {required, minLength: minLength(8)},
      name: {required},
      agree: {checked: value => value}
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
        name: this.name
      }
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch(e) {
        console.log(e);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>