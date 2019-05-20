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
    async seConnecterFacebook() {
      // Sign in using a popup.
      var provider = new fb.auth.FacebookAuthProvider();
      var fbConnect = await fb.auth().signInWithPopup(provider)
      var email = fbConnect.user.email
      var usersDoc = await utilisateursCollection.doc(email).get()
      var userData = {}
      if (usersDoc.exists == true) {
        userData.email = usersDoc.id
      } else {
        userData = {
          email: user.email,
          solde: 0,

        }
        usersDoc.ref.set(userData)
      }
      this.$store.dispatch("utilisateur/get_user", userData)
      this.$router.push('/')
    }
  },
  mounted() {}
};
