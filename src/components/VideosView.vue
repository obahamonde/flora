<script setup lang="ts">
const { state, setState } = useState();
const sub = ref("")
watchEffect(() => {
  sub.value = state.user.sub
})
const videos = ref([]) as any;

const get = async () => {
  const key = `${sub.value}/videos/`;
  const { data } = await useFetch("/api/upload?key=" + key).json();
  videos.value = unref(data);
  setState({
    videos: videos.value
  })
};

const del = async (id: string) => {
  const key = `${sub.value}/videos/${id}`;
  await useFetch("/api/upload?key=" + key, {
    method: "DELETE",
  });
  await get();
};

onMounted(async () => {
  await get();
});

</script>

<template>
  <section class="col center h-full">
    <Uploader accept="video/*" 
    keyString="videos"
    @upload="get()" />
    <section class="showcase" v-if="videos.length > 0">
      <div v-for="video in videos" class="uploads">
        <Ico icon="mdi-delete" class="del" @click="
          videos.splice(videos.indexOf(video), 1);
          del(video.split('/').pop());
        " />
        <video :src="video" class="w-48" controls />
        <span class="file">{{ video.split("/").pop() }}</span>
      </div>
    </section>
  </section>
</template>

<style scoped>
.del {
  @apply cp text-warning hover: text-danger m-2 ml-28;
}

.file {
  @apply hover: underline text-xs font-mono;
}

.showcase {
  @apply grid3 gap-2 p-16 m-auto h-full;
}

.uploads {
  @apply p-4 w-48 col center;
}
.file {
  @apply hover: underline text-xs font-mono;
}
</style>
