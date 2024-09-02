<script setup>
import { ref, watch } from 'vue'
import { useCurrenciesStore } from '@/stores/currencies'
import CurrencyInput from '@/components/ui-kit/CurrencyInput.vue'
import { storeToRefs } from 'pinia'
import BaseSkeletonBlock from '@/components/ui-kit/base/BaseSkeletonBlock.vue'

const store = useCurrenciesStore()

const {
  currenciesListFrom,
  currenciesListTo,
  currencyFromSelected,
  currencyToSelected
} = storeToRefs(store)

const amountFrom = ref(1)
const amountTo = ref(currencyToSelected.value.value)

watch(currencyFromSelected, (val) => {
  if (val) {
    amountTo.value = +(amountFrom.value * currencyToSelected.value.value).toFixed(4)
  }
})

watch(currencyToSelected, (val) => {
  console.log(val)
  console.log(amountFrom.value)
  console.log(currencyToSelected.value.value)
  if (val) {
    amountTo.value = +(amountFrom.value * currencyToSelected.value.value).toFixed(4)
  }
})

const onSelectCurrencyFrom = (value) => {
  store.setCurrencyFromSelected(value.key)
}
const onSelectCurrencyTo = (value) => {
  store.setCurrencyToSelected(value)
}

const onInputCurrencyFromAmount = (value) => {
  amountFrom.value = value
  amountTo.value = +(Number(amountFrom.value) * currencyToSelected.value.value).toFixed(4)
}
const onInputCurrencyToAmount = (value) => {
  amountTo.value = value
  amountFrom.value = +(Number(amountTo.value) / currencyToSelected.value.value).toFixed(4)
}
</script>

<template>
  <div :class="$style.convert">
    <div :class="$style.wrapper">
      <CurrencyInput v-if="currenciesListFrom.length"
                     :amount="amountFrom"
                     :list="currenciesListFrom"
                     :selected="currencyFromSelected"
                     @update:model-value="onInputCurrencyFromAmount($event)"
                     @select:model-value="onSelectCurrencyFrom($event)"
      />

      <BaseSkeletonBlock v-else
                         :class="$style.skeleton"
      />

      <CurrencyInput v-if="currenciesListTo.length"
                     :amount="amountTo"
                     :list="currenciesListTo"
                     :selected="currencyToSelected.name"
                     @update:model-value="onInputCurrencyToAmount($event)"
                     @select:model-value="onSelectCurrencyTo($event)"
      />

      <BaseSkeletonBlock v-else
                         :class="$style.skeleton"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
.convert {
  max-width: 600px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  margin: 0 auto;
}

.wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 16px;
  padding: 12px 16px;
  border-radius: 16px;
  background-color: #18181a;
  box-shadow: 0 4px 12px 0 rgba(13, 35, 67, .03);
}

.skeleton {
  height: 58px;
  border-radius: 16px;
}
</style>
