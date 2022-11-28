<script setup lang="ts">
import { Icon } from "@iconify/vue";
defineProps<{
  icon: string;
  class?: string;
}>();
</script>
<template>
  <Icon :icon="icon" :class="class" />
</template>
