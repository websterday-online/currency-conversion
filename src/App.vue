<script lang="ts" setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { useCurrenciesStore } from "@/stores/currencies";
import AppHeader from "@/components/common/AppHeader.vue";

const store = useCurrenciesStore();

onMounted(async() => {
  await store.getCurrencies();
});
</script>

<template>
  <AppHeader />

  <main>
    <RouterView />
  </main>
</template>
