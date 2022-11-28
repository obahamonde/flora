<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
const { user } = useAuth0();
const props = defineProps<{
  cta: string;
  slug: string;
  brand: string;
  logo: string;
  icon: string;
  images: string[];
}>();
const show = ref(false)
const adminEmails = ["oscar.bahamonde.dev@gmail.com", "yuly.silva01@gmail.com"]
const showHiddenMenu = (email:string)=>{
  if(adminEmails.includes(email)){
    show.value = !show.value
  }
}
</script>
<template>
  <Wallpaper
    :imgs="props.images"
  />
  <div class="col center">
    <div class="col center mx-auto p-4 z-50 top-16 fixed">
      <h1 class="text-5xl font-bold mt-4 font-script text-title">{{ props.brand }}</h1>
      <h1 class="text-2xl font-bold mt-4 font-sans text-subtitle">
        {{show}}
          {{ props.cta }}
        </h1>
        <div class="col center">
      <img :src="props.logo" alt="logo" width="300" class="animate-fade-in mt-8 rf x12 col center invert dark:filter-none"
          @click="showHiddenMenu(user.email)" />
    </div><div class="m-8 text-2xl font-script text-success col center">
        <Ico :icon="props.icon" class="x3 mx-2 cp  shadow-md shadow-gray-500 rf" 
        @click="showHiddenMenu(user.email)"
        />
        <h2 class="text-xl mt-4 font-serif text-caption"> 
          {{ props.slug }}
        </h2>
      </div>
    </div>
  </div>
  <div mx-auto br mr-4 mb-24 z-50 fixed text-caption text-center v-if="show">
    <RouterLink to="/dashboard" class="text-caption text-center text-gray-500">
      Admin Dashboard
    </RouterLink>
  </div>
</template>
//