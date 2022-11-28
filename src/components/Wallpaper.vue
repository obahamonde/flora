<template>
  <div class="h-100vh w-100vw tl fixed brightness-300 backdrop-blur-md dark:brightness-25 ">
  <Slider :images="images" />
</div>
</template>

<script setup lang="ts">
import { default as Slider } from 'troisjs/src/components/sliders/Slider2.vue';
const props = defineProps<{ imgs: string[]; }>();
const images = ref(props.imgs.map((img: string) => ({ src: img })));
</script>
