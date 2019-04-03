import {
  required,
  maxLength,
  integer,
  minLength
} from 'vuelidate/lib/validators'
export default {
  components: {},
  computed: {},
  data() {
    return {
      identifiant: "",
      code: "",
    }
  },
  validations: {
    identifiant: {
      required,
    },
    code: {
      required,
    }
  },
  methods: {
    async confirmation() {
      let formData = new FormData()
      formData.append("username", this.identifiant)
      formData.append("code", this.code)
      let data = {
        "token": this.$store.state.utilisateur.token,
        "self": this,
        "formData": formData
      }
      let promiseConfirmation = null
      try {
        this.$q.loading.show()
        promiseConfirmation = await this.$store.dispatch('utilisateur/confirmation', data)
        this.$q.loading.hide()
        this.$router.push('/profil/login')
      } catch (e) {
        this.$q.loading.hide()
        console.log(e)
        if(e.data.data.erreur == 1){
          this.$q.notify({
            type: 'negative',
            position: 'center',
            message: e.data.data.message
          })
        }
      }
    },
    annuler() {
      this.code = ""
      this.identifiant = ""
    },
  },
  mounted() {}
};
