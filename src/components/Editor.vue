<template>
  <div col w-screen h-screen top-0 fixed>
    <div class="h-1/2">
      <prism-editor
        class="my-editor"
        v-model="editorCode"
        :highlight="highlighter"
        line-numbers
        @update="handleUpdate"
      >
      </prism-editor>
      <button class="btn-post rf p-1 x2 col center tr m-4 mr-6 fixed" @click="makeTest"
        v-if="props.endpoint === 'api/static/app.py'"
      ><Ico icon="file-icons:test-python" class="rf"
        @click="makeTest()"
      /></button>
    </div>
    <iframe :src="url" class="h-1/2" frameborder="0" allowfullscreen></iframe>
  </div>
  <Term  v-if="props.endpoint === 'api/static/app.py'" @test="makeTest"
  />
</template>
<script setup>
import { PrismEditor } from "vue-prism-editor";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; 
import { useAuth0 } from "@auth0/auth0-vue";
const { setState } = useState()
const { getAccessTokenSilently } = useAuth0();
const props = defineProps({
  endpoint: {
    type: String,
    required: true,
  },
});
const { data } = useFetch(props.endpoint).text();
const editorCode = ref(data);
const url = computed(() => {
  if(props.endpoint === "api/static/index.html") {
    return "data:text/html;charset=utf-8," + editorCode.value;
  } else {
    return "data:text/x-python;charset=utf-8," + editorCode.value;
  }
});

const highlighter = (code) => {
  return prism.highlight(code, prism.languages.js);
};

const makeTest = async()=>{
  const { data } = await useFetch(`api/test`,{
    method: "POST",
    headers : {
      "Authorization": `Bearer ${await getAccessTokenSilently()}`,
    },
    body: JSON.stringify(encodeURI(editorCode.value))
  }).text();
 setState({testResult: data})
}

</script>
<style scoped>
.my-editor {
  background: #2d2d2d;
  color: #ccc;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  height: 100%;
}
.prism-editor__textarea:focus {
  outline: none;
}
.mb-4 {
  margin-bottom: 1rem;
}
</style>
