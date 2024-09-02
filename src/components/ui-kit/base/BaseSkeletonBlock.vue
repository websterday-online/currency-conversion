<template>
  <div :class="$style.root" />
</template>

<style lang="scss" module>
$shimColor: #737789;

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.root {
  display: inline-block;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: #2D2F39;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
        90deg,
        rgba($shimColor, 0) 0,
        rgba($shimColor, 0.2) 20%,
        rgba($shimColor, 0.5) 60%,
        rgba($shimColor, 0)
    );
    animation: shimmer 5s infinite;
    content: '';
  }
}
</style>
