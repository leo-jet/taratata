<template>
  <q-layout view="lHh Lpr lff">
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
        <q-btn color="info" to="/" style="margin-right:10px" v-if="$q.platform.is.desktop">ACCUEIL</q-btn>
        <q-btn
          color="green"
          to="/profil/login"
          style="margin-right:10px"
          v-if="$q.platform.is.desktop && $store.state.utilisateur.utilisateur == undefined"
        >Connexion</q-btn>
        <q-btn-dropdown
          color="info"
          :label="nomPrenom"
          v-if="$q.platform.is.desktop && $store.state.utilisateur.utilisateur != undefined"
        >
          <q-list link>
            <q-item v-close-overlay to="/compte" v-if="user != undefined && user.type == 'enseignant'">
              <q-item-side icon="fas fa-user" inverted color="primary"/>
              <q-item-main>
                <q-item-tile label>Profil</q-item-tile>
              </q-item-main>
            </q-item>
            <q-item v-close-overlay to="/profil/information" v-else>
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
        <q-item to="/profil/information">
          <q-item-side icon="settings"/>
          <q-item-main label="Mon compte"/>
        </q-item>
        <q-item @click.native="deconnexion()">
          <q-item-side icon="fas fa-sign-out-alt"/>
          <q-item-main label="Déconnexion"/>
        </q-item>
      </q-list>
    </q-layout-drawer>
    <q-layout-footer>
      <q-toolbar :inverted="$q.theme === 'ios'">
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar>
    </q-layout-footer>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";
export default {
  /*preFetch({ store, redirect }) {
    if (!store.state.utilisateur.connecte) {
      // IMPORTANT! Always use the String form of a
      // route if also building for SSR. The Object form
      // won't work on SSR builds.
      redirect("/profil/login");
    }
  },*/
  name: "MyLayout",
  computed: {
    user() {
      return this.$store.state.utilisateur.utilisateur;
    },
    nomPrenom() {
      return 
        (this.$store.state.utilisateur.utilisateur)?"None":this.$store.state.utilisateur.utilisateur.prenom +
        " " +
        this.$store.state.utilisateur.utilisateur.nom
  
    }
  },
  data() {
    return {
      leftDrawerOpen: false,
      time: "",
      date: "",
      mobileMenu: false,
      week: [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi"
      ],
      timerID: null
    };
  },
  methods: {
    openURL,
    deconnexion() {
      console.log("hello");
      this.$store.commit("utilisateur/deconnexion");
      this.$router.push("/profil/login");
    },
    zeroPadding(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
    updateTime() {
      var cd = new Date();
      this.time =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2);
      this.date =
        this.week[cd.getDay()] +
        " " +
        this.zeroPadding(cd.getDate(), 2) +
        "-" +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        "-" +
        this.zeroPadding(cd.getFullYear(), 4);
    }
  },
  mounted() {
    this.timerID = setInterval(this.updateTime, 1000);
    this.updateTime();
  },
  destroyed() {
    this.$store.commit("utilisateur/DECONNEXION");
  }
};
</script>

<style>
</style>
