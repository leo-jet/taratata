export default {
  components: {},
  computed: {},
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
      let formData = new FormData()
      formData.append("nom", this.nom)
      formData.append("prenom", this.prenom)
      formData.append("numero", this.numero)
      let date = this.dateNaissance.split(' ')[0]
      let dateSplit = date.split('/')
      let formatDate = dateSplit[0] + "-" + dateSplit[1] + "-" + dateSplit[2]
      formData.append("dateNaissance", formatDate)
      formData.append("lieuNaissance", this.lieuNaissance)
      formData.append("telephone", this.numero)
      let data = {
        "token": this.$store.state.utilisateur.token,
        "self": this,
        "formData": formData,
        "id": this.$store.state.utilisateur.id
      }
      try {
        this.$q.loading.show()
        let promiseEnregistrement = await this.$store.dispatch('utilisateur/editer_information', data)
        promiseEnregistrement.then((response) => {
          console.log(response)
        })
      } catch (e) {
        console.log(e)
        this.$q.loading.hide()
      }
    }
  },
  mounted() {
    this.nom = this.$store.state.utilisateur.nom
    this.prenom = this.$store.state.utilisateur.prenom
    this.dateNaissance = this.$store.state.utilisateur.dateNaissance
    this.lieuNaissance = this.$store.state.utilisateur.lieuNaissance
    this.numero = this.$store.state.utilisateur.telephone
  }
};
