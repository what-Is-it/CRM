<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      Категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <form class="form" v-else @submit.prevent="submitForm">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option
            v-for="category of categories"
            :key="category.id"
            :value="category.id"
          >{{category.title}}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type" />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type" />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: (v$.amount.$dirty && !v$.amount.required.$response)}"
        />
        <label for="amount">Сумма</label>
        <span
          class="helper-text invalid"
          v-if="v$.amount.$dirty && !v$.amount.required.$response"
        >Введите сумму</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: (v$.description.$dirty && !v$.description.required.$response)}"
        />
        <label for="description">Описание</label>
        <span
          class="helper-text invalid"
          v-if="v$.description.$dirty && !v$.description.required.$response"
        >Нет описания</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {required} from '@vuelidate/validators'
import {useVuelidate} from '@vuelidate/core'
export default {
  name: 'Record',
  setup: () => ({v$: useVuelidate()}),
  data() {
    return {
      loading: true,
      categories: [],
      select: null,
      category: null,
      type: 'income',
      amount: 1,
      description: ''
    }
  },
  validations() {
    return{
      amount: {required},
      description: {required}
    }
  },
  async mounted(){
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    setTimeout(()=>{
      this.select = window.M.FormSelect.init(this.$refs.select)
      window.M.updateTextFields()
    },0)

    if(this.categories.length){
      this.category = this.categories[0].id
    }
  },
  unmounted() {
    if(this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  computed: {
    canCreateRecord() {
      if(this.type === 'income') {
        return true
      }
      return this.$store.getters.info.bill >= this.amount
    }
  },
  methods: {
            async submitForm(){
                const result = await this.v$.$validate()
                if(!result || this.amount>this.category.limit){
                    console.log('error');
                    return
                }
               /*  for (let category of this.categories) {
                    if(category.id === this.category) {
                      if(this.amount > category.limit && this.type === 'outcome') {
                        this.$message(`Сумма выше лимита, ваш лимит ${category.limit}`);
                        return
                      }
                    }
                  } */
                if(this.canCreateRecord) {
                  try {
                    await this.$store.dispatch('createRecord', {
                    categoryId: this.category,
                    amount: this.amount,
                    description: this.description,
                    type: this.type,
                    date: new Date().toJSON()
                  })
                  const bill = this.type === 'income' ? this.$store.getters.info.bill + this.amount : this.$store.getters.info.bill - this.amount
                  await this.$store.dispatch('updateInfo', {bill})
                  this.v$.$reset()
                  this.amount = 1
                  this.description = ''
                  this.$message('Запись успешно создана')
                  } catch(e) {
                    console.log(e);
                  }
                } else {
                  this.$message(`Недостаточно средств на счете (${this.amount - this.$store.getters.info.bill})`)
                }
            }
        },
}
</script>
