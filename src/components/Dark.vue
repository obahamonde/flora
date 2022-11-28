<template>
  <Ico
    icon="mdi-lightbulb-on"
    @click="toggleDark()"
    class="tl fixed z-50 x2 text-light cp scale p-2 m-2 hover:text-warning"
    v-if="isDark"
  />
  <Ico
    icon="mdi-lightbulb-off"
    @click="toggleDark()"
    class="tl fixed z-50 x2 text-accent cp scale p-2 m-2 hover:text-primary"
    v-else
  />
</template>
