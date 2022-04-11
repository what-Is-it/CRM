<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p class="currency-line" v-for="currency of currencies" :key="currency">
          <span>{{currencyFilter(getCurrency(currency), currency)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import currencyFilter from '../filters/currency.filter'
    export default {
        props:['rates'],
        data(){
            return {
                currencies: ['RUB', 'USD', 'EUR']
            }
        },
        computed: {
            base(){
                return this.$store.getters.info.bill / (this.rates['RUB']/this.rates['EUR'])
            }
        },
        methods: {
            getCurrency(currency){
                return Math.floor(this.base * this.rates[currency])
            },
            currencyFilter
        }
    }
</script>

<style lang="scss" scoped>
</style>