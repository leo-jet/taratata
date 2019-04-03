import axios from 'axios';
export default {
  computed: {},
  data() {
    return {
      edit: false,
      nom: "TEMATIO",
      prenom: "J",
      dateNaissance: "",
      lieuNaissance: "YAOUNDE",
      sexe: "",
      sexes: [{
        label: 'Monsieur',
        value: 'Masculin'
      }, {
        label: 'Madame/Mademoiselle',
        value: 'Feminin'
      }],
      ville: "YAUONDE",
      quartier: "YAOOUNDE",
      telephone: "99999999",
      email: "",
      profession: "",
      specialite: ""
    }
  },
  methods: {
    modifier() {
      this.edit = true
    },
    valider() {
      let url = process.env.API + "/connexion/obtain_token/"
      let data = new FormData()
      data.append("username", this.username)
      data.append("password", this.password)
      axios.post(url, data).then((response) => {
          this.$store.commit("utilisateur/connexion", response.data)
          this.$router.push('/')
        })
        .catch((error) => {
          let message = "Identifiant ou mot de pass incorrect!" + error
          this.$q.notify({
            type: "positive",
            message: message,
          })
        })
    }
  },
  mounted() {
    this.nom = this.$store.state.utilisateur.nom
    this.prenom = this.$store.state.utilisateur.prenom
    this.dateNaissance = this.$store.state.utilisateur.dateNaissance
    this.lieuNaissance = this.$store.state.utilisateur.lieuNaissance
    this.sexe = this.$store.state.utilisateur.sexe
    this.ville = this.$store.state.utilisateur.ville
    this.quartier = this.$store.state.utilisateur.quartier
    this.telephone = this.$store.state.utilisateur.telephone
    this.email = this.$store.state.utilisateur.email
    this.profession = this.$store.state.utilisateur.profession
    this.specialite = this.$store.state.utilisateur.specialite
  }
};
