import {
  required,
  sameAs,
  maxLength,
  integer,
  minLength
} from 'vuelidate/lib/validators'
import {
  fb,
  elevesCollection
} from 'assets/javascript/firebase.js'
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
      email: "",
      dateNaissance: "",
      numero: "",
      code: "",
      confirmation: "",
      pass: ""
    }
  },
  validations: {
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
        var self = this
        fb.auth().createUserWithEmailAndPassword(self.email, self.pass).then(user => {
          var user = fb.auth().currentUser;

          user.sendEmailVerification().then(function () {
            console.log("email sent")
          }).catch(function (error) {
            console.log("error")
          });
          // create user obj
          elevesCollection.doc(self.email).set({
            nom: self.nom,
            prenom: self.prenom,
            email: self.email
          }).then(() => {
            console.log("create")
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })
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
