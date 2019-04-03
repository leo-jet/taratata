import axios from 'axios';
export default {
  components: {},
  computed: {},
  data() {
    return {
      etablissement: "",
      niveau: "",
      concours1: "",
      concours2: "",
      concours3: ""
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
      let formData = new FormData()
      formData.append("etablissement", this.etablissement)
      formData.append("niveau", this.niveau)
      formData.append("concours1", this.concours1)
      formData.append("concours2", this.concours2)
      formData.append("concours3", this.concours3)
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
  }
}
