import axios from 'axios';
export default {
  props: ["modalChapitre"],
  components: {},
  name: 'classe_dialog_chapitre',
  data() {
    return {
      enseignant: null,
      dateDebut: "",
      dateFin: "",
      titre: "",
      contenuFichier: "",
      contenuVideo: "",
      description: "", 
      numero: 1,
    }
  },
  methods: {
    fermer() {
      this.$emit("update:modalChapitre", false)
    },
    enregistrer() {
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
      axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true
      axios.defaults.headers.common['Authorization'] = "JWT " + this.$store.state.utilisateur.token
      axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
      let url = process.env.API + "/chapitre/"
      let data = new FormData()
      data.append("titre", this.titre)
      data.append("numero", this.numero)
      data.append("idClasse", this.$route.params.idClasse)
      let debut = this.dateDebut.split(' ')[0]
      let fin = this.dateFin.split(' ')[0]
      data.append("dateDebut", debut.replace(/\//g, '-'))
      data.append("dateFin", fin.replace(/\//g, '-'))
      data.append("description", this.description)
      data.append("contenuFichier", this.$refs.fichier.files[0])
      data.append("contenuVideo", this.$refs.video.files[0])
      axios.post(url, data).then((response) => {
          let message = "Le chapitre a été bien créé"
          this.fermer()
          this.$q.notify({
            type: "positive",
            message: message,
          })
        })
        .catch((error) => {
          let message = "Identifiant ou mot de pass incorrect!" + error
          this.$q.notify({
            type: "positive",
            message: message,
          })
        })
    }
  },
  mounted() {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
    axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true
    axios.defaults.headers.common['Authorization'] = "JWT " + this.$store.state.utilisateur.token
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
  }, 
  destroyed(){
    let url = process.env.API + "/classe/" + this.$route.params.idClasse + "/"
    axios.get(url).then((response) => {
        this.$store.commit("classe/init_classe", response.data)
      })
      .catch((error) => {
        let message = "Identifiant ou mot de pass incorrect!" + error
        this.$q.notify({
          type: "positive",
          message: message,
        })
      })
  }
}
