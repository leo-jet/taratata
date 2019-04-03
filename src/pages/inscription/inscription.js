import {
  required,
  sameAs,
  maxLength,
  integer,
  minLength
} from 'vuelidate/lib/validators'
import {
  telephoneValidator,
  confimationpass
} from 'assets/javascript/validators'
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
  validations: {
    numero: {
      required,
      integer,
      minLength: minLength(10),
      maxLength: maxLength(10)
    },
    prenom: {
      required,
    },
    confirmation: {
      required,
      confimationpass: sameAs('pass')
    },
    pass: {
      required,
    },
    nom: {
      required,
    }
  },
  methods: {
    async enregistrement() {
      if (this.$v.$invalid == false) {
        let formData = new FormData()
        formData.append("nom", this.nom)
        formData.append("pass", this.pass)
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
          if(promiseEnregistrement.status == true){
            this.$router.push('/profil/confirmation')
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    annuler() {
      this.nom = ""
      this.prenom = ""
      this.dateNaissance = ""
      this.numero = ""
      this.code = ""
      this.confirmation = ""
      this.pass = ""
    }
  },
  mounted() {}
};
