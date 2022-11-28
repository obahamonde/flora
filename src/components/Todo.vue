<script setup lang="ts">
const text = ref('')
</script>
<template>
<input type='text' v-model='text' />
<div>
{{text}}
</div>
</template>