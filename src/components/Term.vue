<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
const { user } = useAuth0()
const { state, setState } = useState()
const text = ref("")
const commands = ref<string[]>([])
const addCommand = (command: string) => {
  commands.value.push(command)
  text.value = ""
}

const emit = defineEmits(['test'])

watchEffect(() => {
  if (text.value === "clear") {
    commands.value = []
    text.value = ""
    setState({testResult: null})
  }
  if (text.value === "help") {
    commands.value.push("help: list of commands")
    commands.value.push("clear: clear the terminal")
    commands.value.push("whoami: display user info")
    text.value = ""
  }
  if (text.value === "whoami") {
    commands.value.push(`username: ${user.value.name}`)
    commands.value.push(`email: ${user.value.email}`)
    commands.value.push(`picture: ${user.value.picture}`)
    text.value = ""
  }
  if (text.value === "test"){
    emit("test")
    commands.value.push("test")
    text.value = ""
  }
})


</script>




<template>

<label for="term" class="bl fixed ml-32 h-1/2 w-full z-50 bg-black text-success p-4">
    <div text-amber v-for="command in commands">
    <h1>{{command}}</h1>
    </div>
    <div text-light v-if="state.testResult" >
    <h1>Test result: {{state.testResult}}</h1>        
    </div>
<strong class="text-cyan">${{user.name}}: </strong><input type='text' id="term" class=" bg-info no-outline"  v-model="text" @keyup.enter="addCommand(text)" />
</label>
</template>