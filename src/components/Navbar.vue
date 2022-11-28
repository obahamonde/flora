<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
const { isAuthenticated } = useAuth0()
</script>
<template>
  <nav class="fade-in tr fixed mt-10">
    <RouterLink to="/" class="nav-link" title="Home">
      <Ico icon="mdi-home" class="link" />
    </RouterLink>
    <div v-if="isAuthenticated">
    <RouterLink to="/images" class="nav-link" title="Images">
      <Ico icon="mdi-image" class="link" />
    </RouterLink>
    <RouterLink to="/videos" class="nav-link" title="Videos">
      <Ico icon="mdi-video" class="link" />
    </RouterLink>
    <RouterLink to="/content" class="nav-link" title="Content">
      <Ico icon="mdi-file-document" class="link" />
    </RouterLink>
    <RouterLink to="/code" class="nav-link" title="Code">
      <Ico icon="mdi-xml" class="link" />
    </RouterLink>
  </div>
  </nav>
</template>
<style global>
.nav-link {
  @apply text-accent dark:text-primary;
}
.link {
  @apply x2 tr m-6 cp scale fade-in;
}
.router-link-active {
  @apply text-warning dark:text-light;
}
</style>
