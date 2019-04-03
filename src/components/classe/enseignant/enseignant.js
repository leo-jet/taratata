import axios from 'axios';
export default {
  props: ["idEnseignant"],
  components: {},
  name: 'classe_enseignant',
  data(){
    return {
      enseignant: null
    }
  }, 
  mounted() {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
    axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true
    axios.defaults.headers.common['Authorization'] = "JWT " + this.$store.state.utilisateur.token
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
    let url = process.env.API + "/enseignant/" + this.idEnseignant + '/'
    axios.get(url).then((response) => {
        this.enseignant = response.data
      })
      .catch((error) => {
        let message = "Enseignant plus présent dans notre base de données!" + error
        this.$q.notify({
          type: "positive",
          message: message,
        })
      })
  }
}
