<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitForm">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="category of categories"
              :key="category.id"
              :value="category.id"
            >{{category.title}}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            type="text"
            id="name"
            v-model.number="title"
            :class="{invalid: (v$.title.$dirty && !v$.title.required.$response)}"
          />
          <label for="name">Название</label>
          <span
            class="helper-text invalid"
            v-if="v$.title.$dirty && !v$.title.required.$response"
          >TITLE</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: (v$.limit.$dirty && !v$.limit.required.$response)}"
          />
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="v$.limit.$dirty && !v$.limit.required.$response"
          >LIMIT</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
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
      props: {
        categories: {
          type: Array,
          required: true
        }
      },
      validations() {
            return{
                title: {required},
                limit: {required}
            }
        },
      methods: {
        async submitForm() {
          const result = await this.v$.$validate()
                if(!result){
                    console.log('error');
                    return
                }
                 try {
                   const categoryData = {
                     id: this.current,
                     title: this.title,
                     limit: this.limit
                   }
                   await this.$store.dispatch('updateCategory', categoryData)
                this.$message('Категория успешно обновлена')
                this.$emit('update', categoryData)
                } catch(e) {
                    console.log(e);
                }
        }
      },
      data() {
        return {
          select: null,
          title: '',
          limit: '',
          current: null
        }
      },
      mounted() {
        this.select = window.M.FormSelect.init(this.$refs.select)
        window.M.updateTextFields()
      },
      watch: {
        current(arrayId) {
          const {title, limit} = this.categories.find(c=> c.id === arrayId)
          this.title = title
          this.limit = limit
        }
      },
      created() {
        const {id, title, limit} = this.categories[0]
        this.current = id,
        this.title = title,
        this.limit = limit
      },
      unmounted() {
        if(this.select && this.select.destroy) {
          this.select.destroy()
        }
      }
    }
</script>

<style lang="scss" scoped>
</style>