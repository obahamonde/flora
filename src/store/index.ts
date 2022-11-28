import { acceptHMRUpdate, defineStore } from "pinia";

export const useState = defineStore("store", () => {
  const state = reactive({}) as any;
  const setState = (newState: any) => {
    Object.assign(state, { ...state, ...newState });
  };
  return {
    state,
    setState,
  };
});

if (import.meta.hot) {
  acceptHMRUpdate(useState, import.meta.hot);
}
