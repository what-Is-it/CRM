<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{base}}</h4>
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      Категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>
    <section v-else>
      <div v-for="category of categories" :key="category.id">
        <p>
          <strong>{{category.title}}:</strong>
          {{ currencyFilter(category.spend) }} из {{currencyFilter(category.limit)}}
        </p>
        <div class="progress" v-tooltip="category.tooltipMessage">
          <div
            class="determinate"
            :class="[category.progressColor]"
            :style="{width: category.progressPercent+'%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import currencyFilter from '../filters/currency.filter'
export default {
  name: 'Planning',
  data() {
    return {
      loading: true,
      categories: []
    }
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    
    this.categories = categories.map(arr => {
      const spend = records.filter(rec => rec.categoryId === arr.id).filter(rec => rec.type === 'outcome').reduce((total, record)=>{
        return total += +record.amount
      },0)

      const percent = (100 * spend / arr.limit)
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60 ? 'green' :  percent < 100 ? 'yellow' : 'red'

      const tooltipValue = arr.limit - spend
      const tooltipMessage = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...arr,
        progressPercent,
        progressColor,
        spend,
        tooltipMessage
      }

    })
    console.log(records, categories);
    this.loading = false
  },
  computed: {
    base(){
        return currencyFilter(this.$store.getters.info.bill, 'RUB')
    },
  },
  methods: {
    currencyFilter,
  },
}
</script>
