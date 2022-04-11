<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitForm">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.number="title"
            :class="{invalid: (v$.title.$dirty && !v$.title.required.$response)}"
          />
          <label for="name">Название</label>
          <span
            class="helper-text invalid"
            v-if="v$.title.$dirty && !v$.title.required.$response"
          >Введите название категории</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            :class="{invalid:v$.title.$dirty && !v$.title.required.$response}"
            v-model="limit"
          />
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="v$.title.$dirty && !v$.title.required.$response"
          >Введите лимит</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required} from '@vuelidate/validators'
import {useVuelidate} from '@vuelidate/core'
    export default {
        setup: () => ({v$: useVuelidate()}),
        data() {
            return {
                title: '',
                limit: 1
            }
        },
        validations() {
            return{
                title: {required},
                limit: {required}
            }
        },
        mounted() {
            window.M.updateTextFields()
        },
        methods: {
            async submitForm(){
                const result = await this.v$.$validate()
                if(!result){
                    console.log('error');
                    return
                }
                try {
                    const category = await this.$store.dispatch('createCategory', {
                    title: this.title,
                    limit: this.limit
                })
                this.title = ''
                this.limit = 1
                this.v$.$reset()
                this.$message('Категория была создана')
                this.$emit('created', category)
                } catch(e) {
                    console.log(e);
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
</style>