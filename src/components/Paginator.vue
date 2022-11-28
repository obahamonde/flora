<template>
  <Ico icon="mdi-arrow-left" class="arrow back" @click="back" />
  <Ico icon="mdi-arrow-right" class="arrow forward" @click="forward" v-if="currentSlide < props.slides" />
</template>

<script setup lang="ts">
//The greatest value: the goods thing going on
const currentSlide = ref(1);
const router = useRouter();
const props = defineProps<{
  to: string;
  slides: number;
}>();
const forward = () => {
  currentSlide.value++;
  router.push(`/slides/${props.to}/${currentSlide.value}`);
};

const back = () => {
  currentSlide.value--;
  router.push(`/slides/${props.to}/${currentSlide.value}`);
};

watchEffect(() => {
  currentSlide.value == props.slides ? router.push("/slides") : currentSlide.value;
  currentSlide.value < 1 ? router.push("/slides") : currentSlide.value;
});
</script>
<style scoped>
.arrow {
  @apply text-secondary hover: text-success tr fixed cp scale p-2 x3;
}

.back {
  @apply m-4 mr-16;
}

.forward {
  @apply m-4;
}
</style>
