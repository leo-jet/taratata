import academie from "components/profil/academie/academie.vue";
import contact from "components/profil/contact/contact.vue";
import cardTotal from "components/cardTotal/cardTotal.vue";
import information from "components/profil/information/information.vue";
export default {
  components: {
    information,
    academie, 
    contact,
    cardTotal
  },
  computed: {},
  data() {
    return {
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
      } else {
        alert("mode de pass different de confirmation")
      }
    }
  },
  mounted() {
    this.nom = this.$store.state.utilisateur.nom
    this.prenom = this.$store.state.utilisateur.prenom
    this.dateNaissance = this.$store.state.utilisateur.dateNaissance
  }
};
