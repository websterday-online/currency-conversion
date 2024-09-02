<script lang="ts" setup>
import BaseInput from "@/components/ui-kit/base/BaseInput.vue";
import BaseDropdownList from "@/components/ui-kit/base/BaseDropdownList.vue";
import { type PropType } from "vue";
import { CurrencyInterface } from "@/models/currencies.models";

defineProps({
  list: {
    type: Array as PropType<Array<CurrencyInterface>>,
    required: true
  },
  amount: {
    type: [String, Number] as PropType<string | number>,
    required: false
  },
  selected: {
    type: String as PropType<string>,
    default: "",
    required: false
  }
});


</script>

<template>
  <div :class="$style.currencyInput">
    <BaseInput :model-value="amount"
               @update:model-value="$emit('update:model-value', $event)"
    />

    <BaseDropdownList :list="list"
                      :selected="selected"
                      @change:model-value="$emit('select:model-value', $event)"
    />
  </div>
</template>

<style lang="scss" module>
.currencyInput {
  height: 58px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 80px;
  gap: 10px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 16px;
  padding: 3px 3px 3px 13px;
}
</style>
