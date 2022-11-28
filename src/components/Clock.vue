<script setup lang="ts">
const now = useNow();
watchEffect(() => {
  unref(now).getHours() > 18 ? useDark() : usePreferredDark();
});
</script>
<template>
  <section id="calendar">
    <strong z-50 tl ml-8 text-sm fixed nav-link m-4>{{
      now.toLocaleTimeString().replace(/:\d\d$/, "")
    }}</strong>
  </section>
</template>
