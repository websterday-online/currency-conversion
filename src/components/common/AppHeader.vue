<script lang="ts" setup>
import { RouterLink } from "vue-router";
import BaseDropdownList from "@/components/ui-kit/base/BaseDropdownList.vue";
import { useCurrenciesStore } from "@/stores/currencies";
import { storeToRefs } from "pinia";
import BaseSkeletonBlock from "@/components/ui-kit/base/BaseSkeletonBlock.vue";

const store = useCurrenciesStore();

const {
  currenciesListFrom,
  currencyFromSelected
} = storeToRefs(store);

const onSelectCurrencyFrom = (value) => {
  store.setCurrencyFromSelected(value.key);
};
</script>

<template>
  <header :class="$style.header">
    <nav :class="$style.nav">
      <RouterLink to="/">Главная</RouterLink>
      <RouterLink to="/convert">Конвертация</RouterLink>
    </nav>

    <div :class="$style.currency">
      <BaseDropdownList v-if="currenciesListFrom.length"
                        :list="currenciesListFrom"
                        :selected="currencyFromSelected"
                        @change:model-value="onSelectCurrencyFrom($event)"
      />

      <BaseSkeletonBlock v-else
                         :class="$style.skeleton"
      />
    </div>
  </header>
</template>

<style lang="scss" module>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #18181a;
  box-shadow: 0 1px rgba(255, 255, 255, .12);
  padding: 10px 20px;
}

.nav {
  display: flex;
  align-items: center;
  gap: 20px;

  & a {
    color: #ffffff;
    text-decoration-color: transparent;
    font-size: 16px;
    font-weight: 500;
    transition: .25s;

    &:global(.router-link-active) {
      text-decoration-color: inherit;
    }
  }
}

.currency {
  width: 80px;
  height: 40px;
}

.skeleton {
  border-radius: 12px;
}
</style>
