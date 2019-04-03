import axios from 'axios';
export default {
  components: {},
  computed: {},
  data() {
    return {
      email: "",
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
      let formData = new FormData()
      formData.append("email", this.email)
      formData.append("quatier", this.quartier)
      formData.append("ville", this.ville)
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
    this.quartier = this.$store.state.utilisateur.quartier
    this.ville = this.$store.state.utilisateur.ville
    this.email = this.$store.state.utilisateur.email
  }
}
