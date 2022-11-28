<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
import { useState } from "~/store";
const { isAuthenticated, getAccessTokenSilently, loginWithRedirect, logout, handleRedirectCallback } = useAuth0();
const { state, setState } = useState();
const login = async () => {
  await loginWithRedirect();
  await handleRedirectCallback().then(fetchUser);
};
const _ = async () => {
  try {
    const token = await getAccessTokenSilently();

    const { data } = await useFetch("/api/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).json();
    setState({ user: data.value, token: token });
  } catch (e) {
    console.error(e);
  }
};

const toggle = ref(false);

onMounted(async () => {
  if (isAuthenticated.value) {
    await _();
    await fetchUser()
  }
});

watch(isAuthenticated, async (val) => {
  if (val) {
    await _();
  }
});

const fetchUser = async () => {
  const token = await getAccessTokenSilently();
  const { data } = await useFetch("/api/register", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).json();
  console.log(data);
};


</script>
<template>
  <section @click="toggle = !toggle" >

    <div v-if="isAuthenticated" >
      <img :src="state.user.picture" class="br x4 fixed m-4 rf shadow-gray-500 shadow-md cp scale" v-if="state.user" />
    </div>
    <Ico icon="mdi-login" @click="login()" class="br x2 fixed m-4 text-warning hover:text-danger cp scale" v-else />

  </section>

  <div v-if="toggle"
    class="text-xs col dark:bg-gray-500 center br fixed mr-32 mb-4 backdrop-blur-md shadow-gray-500 shadow-md p-2 fade-in-up">
    <h1>{{ state.user.name }}</h1>
    <h1>{{ state.user.email }}</h1>
    <button @click="logout()" class="btn-del">Logout</button>
  </div>
</template>
