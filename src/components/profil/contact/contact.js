import {
  utilisateursCollection
} from 'assets/javascript/firebase.js'
export default {
  components: {},
  computed: {
    email() {
      return this.$store.state.utilisateur.utilisateur.email
    }
  },
  data() {
    return {
      quartier: "",
      ville: "",
      edition: false,
    }
  },
  methods: {
    close() {
      this.edition = false
    },
    editer() {
      this.edition = true
    },
    async enregistrement() {
      let formData = {
        "ville": this.ville,
        "quartier": this.quartier,
      }
      utilisateursCollection.doc(this.email).update(formData)
      this.$store.dispatch("utilisateur/get_user", {email: this.email})
    }
  },
  mounted() {
    this.quartier = this.$store.state.utilisateur.utilisateur.quartier
    this.ville = this.$store.state.utilisateur.utilisateur.ville
  }
}
