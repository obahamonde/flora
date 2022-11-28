<template>
<Gallery
  @addImage="addImage"
  @addVideo="addVideo"
/>
<BlogPost
  :images="images"
  :videos="videos"
/>
<section class="bottom-0 fixed mx-48 ml-72 row center overflow-x-scroll">
<div class="w-1/2 row gap-2"  v-for="image in images">
  <img :src="image" class="w-32" />
  <Ico icon="mdi-close" @click="removeImage(image)" class="cp hover:text-danger scale" />
</div>
<div class="w-1/2 row gap-2" v-for="video in videos">
  <video :src="video" class="w-32" />
  <Ico icon="mdi-close" @click="removeVideo(video)" class="cp hover:text-danger scale" />
</div>
</section>
</template>
<script setup lang="ts">
const images = ref<string[]>([])
const videos = ref<string[]>([])
const addImage = (item: string) => images.value.push(item)
const addVideo = (item: string) => videos.value.push(item)
const removeVideo = (item: string) => videos.value.splice(videos.value.indexOf(item), 1)
const removeImage = (item: string) => images.value.splice(images.value.indexOf(item), 1)
</script>
