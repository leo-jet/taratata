<template>
  <div id="q-app" ref="app">
    <router-view />
  </div>
</template>

<script>
import { colors, Loading } from "quasar";
import axios from "axios";
export default {
  name: 'App',
  /**preFetch({ store, redirect }) {
    if (!store.state.utilisateur.authenticated) {
      redirect("/profil/login");
    }
  },**/
}
</script>

<style>
</style>
