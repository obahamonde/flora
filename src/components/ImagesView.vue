<script setup lang="ts">
const { state, setState } = useState();
const sub = ref("")
watchEffect(() => {
  sub.value = state.user.sub
})
const uploads = ref([]) as any;
const get = async () => {
  const key = `${sub.value}/images/`;
  const { data } = await useFetch("/api/upload?key=" + key).json();
  uploads.value = unref(data);
  setState({
    images: uploads.value
  })
};
const del = async (id: string) => {
  const key = `${sub.value}/images/${id}`;
  await useFetch("api/upload?key=" + key, {
    method: "DELETE",
  });
  await get();
};
onMounted(async () => {
  await get();
});
</script>
<template>
  <section class="col center">
    <Uploader accept="image/*" @upload="get"
    keyString="images"
    />
    <section class="showcase" v-if="uploads.length > 0">
      <div v-for="upload in uploads" class="uploads">
        <Ico icon="mdi-delete" class="del" @click="
  uploads.splice(uploads.indexOf(upload), 1);
del(upload.split('/').pop());
        " />
        <img :src="upload" class="w-24"
          v-if="upload.includes('.png')
          | upload.includes('.jpg') | upload.includes('.jpeg') | upload.includes('.gif') | upload.includes('.webp') | upload.includes('.svg')" />
        <Ico icon="mdi-file" class="x4" v-else>
          <a :href="upload" class="file">{{ upload.split("/").pop() }}</a>
        </Ico>
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
  @apply grid4 gap-4 p-32 ml-24 h-full;
}

.uploads {
  @apply p-4 w-48 col center;
}
</style>
