import axios from 'axios';
export default {
  components: {},
  computed: {},
  data() {
    return {
      nom: "",
      prenom: "",
      dateNaissance: "",
      numero: "",
      code: "",
      confirmation: "",
      pass: ""
    }
  },
  methods: {
    async enregistrement() {
      if (this.confirmation === this.pass) {
        let formData = new FormData()
        formData.append("nom", this.nom)
        formData.append("prenom", this.prenom)
        formData.append("numero", this.numero)
        let data = {
          "token": this.$store.state.utilisateur.token,
          "self": this,
          "formData": formData
        }
        try {
          this.$q.loading.show()
          let promiseEnregistrement = await this.$store.dispatch('utilisateur/enregistrement', data)
          this.$q.loading.hide()
          promiseEnregistrement.then((response) => {
            console.log(response)
          })
        } catch (e) {
          console.log(e)
        }
      }else{
        alert("mode de pass different de confirmation")
      }
    }
  },
  mounted() {}
};
