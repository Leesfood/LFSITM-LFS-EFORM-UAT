<template>
  <n-loading-bar-provider>
    <component :is="layout">
      <router-view />
    </component>
  </n-loading-bar-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const defaultLayout = 'default';
const route = useRoute();

const layout = computed(() => {
  return `${route.meta.layout || defaultLayout}-layout`;
});
</script>
