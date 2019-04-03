import chapitre from "components/dialogs/chapitre/chapitre.vue"
import listeQuiz from "components/dialogs/listeQuiz/listeQuiz.vue"
export default {
  name: "cours",
  components: {
    chapitre,
    listeQuiz
  },
  data() {
    return {
      chapitres: [],
      maximizedModalChapitre: false,
      maximizedModalQuiz: false,
      chapdevoirs: null,
      nomChapitre: ""
    };
  },
  methods: {
    async demarrer(chapitre) {
      let parameters = {}
      parameters.idChapitre = chapitre.value
      let data = {
        "token": this.$store.state.utilisateur.token,
        "self": this,
        "parameters": parameters
      }
      try {
        this.$q.loading.show()
        let promiseSections = await this.$store.dispatch('classe/sections_chapitre', data)
        this.$q.loading.hide()
        if (promiseSections.status == true) {
          let sections = []
          for (var i in promiseSections.data) {
            sections.push(promiseSections.data[i].data)
          }
          console.log(sections)
          this.$store.dispatch('cours/set_sections', sections)
        }
      } catch (e) {
        console.log(e)
      }
      this.maximizedModalChapitre = true
      this.nomChapitre = chapitre.label

    },
    async quizs(chapitre) {
      let parameters = {}
      parameters.chapitre__id = chapitre.value
      let data = {
        "token": this.$store.state.utilisateur.token,
        "self": this,
        "parameters": parameters
      }
      try {
        this.$q.loading.show()
        let promiseQuizs = await this.$store.dispatch('classe/devoirs_chapitre', data)
        this.$q.loading.hide()
        if (promiseQuizs.status == true) {
          this.chapdevoirs = promiseQuizs.data
          this.$store.dispatch("quiz/set_quizs", promiseQuizs.data);
          this.maximizedModalQuiz = true
        }
      } catch (e) {
        console.log(e)
      }

    }
  },
  async mounted() {
    let parameters = {}
    parameters.idClass = this.$route.params.id
    let data = {
      "token": this.$store.state.utilisateur.token,
      "self": this,
      "parameters": parameters
    }
    try {
      this.$q.loading.show()
      let promiseChapitre = await this.$store.dispatch('classe/chapitres_classe', data)
      this.$q.loading.hide()
      if (promiseChapitre.status == true) {
        this.chapitres = promiseChapitre.data
      }
    } catch (e) {
      console.log(e)
    }
  }
};
