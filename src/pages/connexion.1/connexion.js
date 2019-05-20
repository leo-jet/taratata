import axios from 'axios';
import {
  fb,
  utilisateursCollection
} from 'assets/javascript/firebase.js'
export default {
  components: {},
  computed: {},
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    seConnecter() {
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
      let url = (this.$q.platform.is.mobile && process.env.DEV) ? "http://10.0.2.2:8000/connexion/obtain_token/" : process.env.API + "/connexion/obtain_token/"
      let data = new FormData()
      data.append("username", this.username)
      data.append("password", this.password)
      axios.post(url, data).then((response) => {
          this.$store.commit("utilisateur/connexion", response.data)
          this.$router.push('/')
        })
        .catch((error) => {
          let message = "Identifiant ou mot de pass incorrect!" + error
          console.log(error)
          this.$q.notify({
            type: "positive",
            message: message,
          })
        })
    },
    seConnecterFacebook() {
      // Sign in using a popup.
      var provider = new fb.auth.FacebookAuthProvider();
      var self = this
      fb.auth().signInWithPopup(provider).then(function (result) {
        var user = result.user
        const usersRef = utilisateursCollection.doc(user.email)
        /** */
        usersRef.get()
          .then((docSnapshot) => {
            var userData = null
            if (docSnapshot.exists) {
              userData = docSnapshot.data()
            } else {
              userData = {
                email: user.email
              }
              usersRef.set(userData)
              var user = fb.auth().currentUser;
            }
            self.$store.commit("utilisateur/SET_UTILSATEUR", userData)
            self.$router.push('/')
          });
      }).catch(function (result) {
        console.log(result)
      })
    }
  },
  mounted() {}
};
