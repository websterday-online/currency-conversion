<template>
  <div :class="[
      $style.root,
      { [$style.isOpen]: isOpen },
    ]"
       tabindex="0"
       @focusout="onFocusout"
  >
    <div :class="$style.trigger"
         data-trigger
         @click="onTriggerClick"
    >
      <div :class="$style.triggerDefaultText">{{ displayedItem }}</div>
      <span :class="$style.triggerIcon"
            class="icon-triangle"
            data-trigger-icon
      />
    </div>
    <div :class="$style.dropdown"
         data-dropdown
    >
      <div v-for="(item, index) in list"
           :key="index"
           :class="[$style.listItem, {[$style.listItemActive]: index === selectedIndex}]"
           @click="onListItemClick(index)"
      >
        <div :class="$style.defaultListItem">{{ item.name }} ({{ item.key }})</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, computed } from 'vue'

const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
  selected: {
    type: String,
    default: "",
    required: false
  }
})

const emits = defineEmits(['change:model-value'])

const isOpen = ref(false)
const selectedIndex = ref(0)

const selectedItem = computed(() => props.list[selectedIndex.value])
const displayedItem = computed(() => selectedItem.value.name)

watch(() => props.selected, (val) => {
  if (val) {
    selectedIndex.value = findIndexByValue(val)
  }
})

const findIndexByValue = (value) => props.list.findIndex(item => item.name === value)
const onTriggerClick = () => isOpen.value = !isOpen.value
const onFocusout = () => isOpen.value = false
const onListItemClick = (index) => {
  selectedIndex.value = index
  isOpen.value = false
  emits('change:model-value', selectedItem.value)
}
</script>

<style lang="scss" module>
.root {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: uppercase;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  position: relative;
  line-height: normal;
  z-index: 1;
  user-select: none;
  background-color: rgba(255, 255, 255, .08);
  border-radius: 12px;
}

.trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 0 10px;
}

.triggerIcon {
  transition: 0.25s ease-in-out;
  padding: 5px;
  transform: translate(0, 1px);
  mask: url("@/assets/arrow.svg");
  background-color: #fff;
}

.dropdown {
  display: none;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 16px 0 19px;
  background: linear-gradient(180deg, #242732 0%, #1A1C24 100%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.30);
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  z-index: 5;
  border-radius: 12px;

  color: #A3ABBF;
  white-space: nowrap;
}

.listItem {
  cursor: pointer;
  position: relative;
  transition: 0.25s ease-in-out;

  &::before {
    content: "";
    display: block;
    width: 2px;
    height: 100%;
    background: #FBC300;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    opacity: 0;
    transition: 0.25s ease-in-out;
  }

  &:hover {
    color: #fff;

    &::before {
      opacity: 1;
    }
  }
}

.listItemActive {
  color: #fff;

  &::before {
    opacity: 1;
  }
}

.defaultListItem {
  padding: 5px 26px 5px 22px;
}

.root {
  &.isOpen {
    .dropdown {
      display: flex;
    }

    .triggerIcon {
      transform: translate(0, 1px) rotate(-180deg);
    }
  }

  &.disabled {
    color: #737789;
  }
}
</style>
