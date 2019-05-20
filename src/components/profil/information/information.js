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
      edition: false,
      nom: "",
      prenom: "",
      dateNaissance: "",
      lieuNaissance: "",
      numero: "",
      code: "",
      confirmation: "",
      pass: "",
      currentStep: 'first'
    }
  },
  methods: {
    close() {
      this.edition = false
    },
    async editer() {
      this.edition = true
    },
    async enregistrement() {
      let date = this.dateNaissance.split(' ')[0]
      let dateSplit = date.split('/')
      let formatDate = dateSplit[0] + "-" + dateSplit[1] + "-" + dateSplit[2]
      let formData = {
        "nom": this.nom,
        "prenom": this.prenom,
        "numero": this.numero,
        "dateNaissance": formatDate,
        "lieuNaissance": this.lieuNaissance,
        "telephone": this.numero,
        "email": this.email,
        "type": "eleve"
      }
      utilisateursCollection.doc(this.email).update(formData)
      this.$store.dispatch("utilisateur/get_user", {email: this.email})
    }
  },
  mounted() {
    this.nom = this.$store.state.utilisateur.utilisateur.nom
    this.prenom = this.$store.state.utilisateur.utilisateur.prenom
    this.dateNaissance = this.$store.state.utilisateur.utilisateur.dateNaissance
    this.lieuNaissance = this.$store.state.utilisateur.utilisateur.lieuNaissance
    this.numero = this.$store.state.utilisateur.utilisateur.telephone
  }
};
