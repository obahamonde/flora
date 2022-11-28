<script setup lang="ts">
const active = ref('html')
</script>
<template>
  <section
    class="col pl-2 tl fixed h-full w-32 pt-12 bg-gray-300 rounded-lg bg-gray-300 animate-fade-in-left"
  >
    <nav class="col start gap-6 my-8">
      <h1 row @click="active='html'" cp>
        <Ico icon="logos:html-5" mx-2 text-2xl /><span class="text-sm text-info"
          >index.html</span
        >
      </h1>
      <h1 row @click="active='python'" cp>
        <Ico icon="logos:python" mx-2 text-2xl /><span class="text-sm text-info"
          >app.py</span
        >
      </h1>
    </nav>
  </section>
  <div ml-32>
    <div v-if="active === 'html'" class="col">
      <Editor
      endpoint="api/static/index.html"
        />
    </div>
    <div v-else class="col">
      <Editor
      endpoint="api/static/app.py"
      />
  
    </div>
  </div>
</template> 