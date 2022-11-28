<script setup lang="ts">
const { state } = useState()
</script>
<template>

<section class="tl absolute mt-16 col center font-mono">
  Your media files  
  <section class="row start w-72">
<ul class="col center gap-4 m-8 underline cp">
  <RouterLink to="/images" title="Videos">Images</RouterLink>
  <li v-for="item in state.images">
    <img :src="item" class="m-2" />
    <Ico icon="mdi-plus" @click="$emit('addImage',item)" />
  </li>
</ul>
<ul class="col center gap-4 m-8 underline cp">
  <RouterLink to="/videos" title="Videos">Videos</RouterLink>
  <li v-for="item in state.videos">
    <video :src="item" class="m-2" />
    <Ico icon="mdi-plus" @click="$emit('addVideo',item)" />
  </li>
</ul>
</section></section>
</template>
