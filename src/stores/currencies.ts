import { computed, ref, type Ref } from "vue";
import { defineStore } from "pinia";
import type { CurrencyInterface } from "@/models/currencies.models";
import CurrenciesServices from "@/services/currencies.services";

export const useCurrenciesStore = defineStore("currencies", () => {
  const currencies: Ref<Array<CurrencyInterface>> = ref([]);
  const currencyFromSelected: Ref<string> = ref("usd");
  const currencyToSelected: Ref<object> = ref({});

  const currenciesListFrom = computed(() => currencies.value || [])
  const currenciesListTo = computed(() => {
    if (currencies.value.length) {
      return currencies.value.find(item => item.key === currencyFromSelected.value).list
    }

    return []
  })

  const getCurrencies = async() => {
    const response: Array<CurrencyInterface> = await CurrenciesServices.getCurrencies();
    currencies.value.push(...response);
    currencyFromSelected.value = currencies.value[0].key
    currencyToSelected.value = currencies.value[0].list[0]
  };

  const setCurrencyFromSelected = (value: string) => {
    currencyFromSelected.value = value;
    currencyToSelected.value = currencies.value.find(item => item.key === currencyFromSelected.value).list[0]
  };

  const setCurrencyToSelected = (data: object) => {
    currencyToSelected.value = data
  };

  return {
    currencies,
    currencyFromSelected,
    currencyToSelected,
    currenciesListFrom,
    currenciesListTo,
    getCurrencies,
    setCurrencyFromSelected,
    setCurrencyToSelected
  };
});
