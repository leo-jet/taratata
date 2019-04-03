import information from "components/classe/information/information.vue";
import enseignants from "components/classe/enseignants/enseignants.vue";
import chapitres from "components/classe/chapitres/chapitres.vue";
import eleve from "components/classe/eleve/eleve.vue";
import quiz from "components/classe/quiz/quiz.vue";
import axios from 'axios';
import { Loading } from 'quasar'
export default {
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    let data = {
      token: store.state.utilisateur.token, 
      idClass: currentRoute.params.idClasse
    }
    return store.dispatch('classe/get_classe', data)
  },
  components: {
    information, 
    quiz,
    enseignants,
    chapitres,
    eleve
  },
  name: 'classe',
  data() {
    return {
      nom: "",
      dateDebut: "",
      dateFin: "",
      prix: 0
    }
  },
  computed: {
    classe() {
      return this.$store.state.classe.classe
    }
  },
  methods: {
    editclasse(data) {
      let url = process.env.API + "/classe/" + this.classe.idClass + '/'
      axios.put(url, data).then((response) => {
          this.$store.commit("classe/init_classe", response.data)
          let message = "Classe bien modifiée!"
          let next = '/classe/' + response.data.idClass
          this.$router.push(next)
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
    },
    modifier() {
      let data = new FormData()
      data.append("nom", this.nom)
      data.append("dateDebut", this.dateDebut.replace(/\//g, '-'))
      data.append("dateFin", this.dateFin.replace(/\//g, '-'))
      data.append("prix", this.prix)
      this.editclasse(data)
    },
    creer() {
      let url = process.env.API + "/classe/"
      let data = new FormData()
      data.append("nom", this.nom)
      data.append("dateDebut", this.dateDebut.replace(/\//g, '-'))
      data.append("dateFin", this.dateFin.replace(/\//g, '-'))
      data.append("prix", this.prix)
      axios.post(url, data).then((response) => {
          this.$store.commit("classe/init_classe", response.data)
          let message = "Classe bien créée!"
          let next = '/classe/' + response.data.idClass
          this.$router.push(next)
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
  mounted(){
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
    axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true
    axios.defaults.headers.common['Authorization'] = "JWT " + this.$store.state.utilisateur.token
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
    this.nom = this.classe.nom
    this.dateDebut = this.classe.dateDebut
    this.dateFin = this.classe.dateFin
    this.prix = this.classe.prix
    let data = {
      token: this.$store.state.utilisateur.token, 
      idClass: this.$route.params.idClasse
    } 
    this.$store.dispatch('classe/get_chapitres_classe', data)
  }
}
