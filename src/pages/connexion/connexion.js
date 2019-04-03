import axios from 'axios';
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
      let url = (this.$q.platform.is.mobile && process.env.DEV)? "http://10.0.2.2:8000/connexion/obtain_token/": process.env.API + "/connexion/obtain_token/"
      let data = new FormData()
      data.append("username", this.username)
      data.append("password", this.password)
      axios.post(url, data).then((response) => {
          this.$store.commit("utilisateur/connexion",response.data)
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
    }
  },
  mounted() {
  }
};
