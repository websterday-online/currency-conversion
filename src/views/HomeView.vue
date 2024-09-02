<script lang="ts" setup>
import { useCurrenciesStore } from "@/stores/currencies";
import { storeToRefs } from "pinia";
import BaseSkeletonBlock from "@/components/ui-kit/base/BaseSkeletonBlock.vue";

const store = useCurrenciesStore();

const {
  currencies,
  currenciesListTo
} = storeToRefs(store);

const curs = (to, from) => {
  return currencies.value
    .find(item => item.key === to).list
    .find(item => item.to === from).value
    .toFixed(4);
};
</script>

<template>
  <div :class="$style.home">
    <div :class="$style.wrapper">
      <ul v-if="currenciesListTo.length"
          :class="$style.list"
      >
        <li v-for="(item, index) in currenciesListTo"
            :key="index"
        >
          1 {{ item.to }} = {{ curs(item.to, item.from) }} {{ item.from }}
        </li>
      </ul>

      <div v-else
           :class="$style.list"
      >
        <BaseSkeletonBlock v-for="(_, index) in 5"
                           :key="index"
                           :class="$style.skeleton"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
}

.wrapper {
  max-width: 300px;
  width: 100%;
  padding: 12px 16px;
  border-radius: 16px;
  background-color: #18181a;
  box-shadow: 0 4px 12px 0 rgba(13, 35, 67, .03);
}

.list {
  display: grid;
  grid-gap: 10px;
  font-size: 18px;
  line-height: 18px;
  font-weight: 500;
  color: #ffffff;
  list-style: none;
  padding: 0;
  text-transform: uppercase;
}

.skeleton {
  height: 18px;
  border-radius: 6px;
}
</style>
