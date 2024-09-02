<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: 1
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 21
  },
})
const emits = defineEmits(['update:model-value'])

const validate = (event) => {
  if (!event.target.value) {
    event.target.value = 0
  }

  emits('update:model-value', event.target.value = event.target.value.replace(/[^.\d]+/g, '')
    .replace(/^([^.]*\.)|\./g, '$1')
    .replace(/(?<=\.[0-9]{4}).+/, '')
    .replace(/^(\s)/, '')
    .slice(0, props.max))
}
</script>

<template>
  <label :class="$style.label">
    <input ref="input"
           :class="[$style.input]"
           :max="max"
           :min="min"
           :value="modelValue"
           type="text"
           @input="validate($event)"
    />
  </label>
</template>

<style lang="scss" module>
.label {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
}

.input {
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background-color: transparent;
  border: none;
  outline: none;
  padding: 0 10px;
  font-size: 16px;
  text-overflow: ellipsis;
  text-align: right;
  color: #fff;
}
</style>
