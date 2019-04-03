<template>
  <q-layout>
    <!-- Be sure to play with the Layout demo on docs -->

    <q-layout-header>
      <q-toolbar color="primary" dark>
        <img
          class="ml-2"
          height="40"
          alt="Company logo"
          src="statics/icons/homeschool/ms-icon-150x150.png"
          v-if="$q.platform.is.mobile"
        >
        <img
          class="ml-2"
          height="50"
          alt="Company logo"
          src="statics/icons/homeschool/ms-icon-150x150.png"
          v-if="$q.platform.is.desktop"
        >
        <q-toolbar-title>
          Homeschool
          <div slot="subtitle">Together let's build tomorrow education</div>
        </q-toolbar-title>
        <q-btn
          v-if="$q.platform.is.mobile"
          flat
          round
          @click="mobileMenu = !mobileMenu"
          dense
          icon="menu"
        />
        <q-btn color="info" to="profil/information" style="margin-right:10px" v-if="$q.platform.is.desktop">ACCUEIL</q-btn>
        <q-btn color="yellow" to="/profil/confirmation" style="margin-right:10px" v-if="$q.platform.is.desktop">Valider son compte</q-btn>
        <q-btn-dropdown
          color="info"
          :label="nomPrenom"
          v-if="$q.platform.is.desktop && $store.state.utilisateur.connecte==true"
        >
          <q-list link>
            <q-item v-close-overlay to="">
              <q-item-side icon="fas fa-user" inverted color="primary"/>
              <q-item-main>
                <q-item-tile label>Profil</q-item-tile>
              </q-item-main>
            </q-item>
            <q-item-separator/>
            <q-item v-close-overlay @click.native="deconnexion()">
              <q-item-side icon="fas fa-sign-out-alt" inverted color="red"/>
              <q-item-main>
                <q-item-tile label>Déconnexion</q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer v-model="mobileMenu" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <q-list no-border link inset-delimiter>
        <q-list-header>Menu principal</q-list-header>
        <q-item to="/">
          <q-item-side icon="home"/>
          <q-item-main label="Accueil"/>
        </q-item>
        <q-item to="compte" v-if="$store.state.utilisateur.connecte==true">
          <q-item-side icon="settings"/>
          <q-item-main label="Cours"/>
        </q-item>
        <q-item @click.native="deconnexion()" v-if="$store.state.utilisateur.connecte==true">
          <q-item-side icon="fas fa-sign-out-alt"/>
          <q-item-main label="Déconnexion"/>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  // name: 'LayoutName',
  computed: {
    nomPrenom() {
      return (
        this.$store.state.utilisateur.prenom +
        " " +
        this.$store.state.utilisateur.nom
      );
    }
  },
  data() {
    return {
      mobileMenu: false
    };
  }
};
</script>

<style>
</style>
