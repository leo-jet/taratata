import listeQuiz from "components/dialogs/listeQuiz/listeQuiz.vue";
import listeChapitres from "components/dialogs/listeChapitres/listeChapitres.vue";
export default {
  name: "listeCours",
  components: {
    listeQuiz,
    listeChapitres
  },
  data() {
    return {
      maximizedModal: false,
      maximizedModalQuiz: false,
      maximizedModalChapitres: false,
      mescours: null,
      chapdevoirs: null
    };
  },
  methods: {
    showCours(idClass) {
      this.maximizedModalChapitres = true;
      /*console.log(idClass, chapitres.data): get chapitres of the classe
      let courschapitres = chapitres.find({
        idClass: idClass
      });*/
      this.$store.dispatch("cours/set_chapitres", courschapitres);
    },
    showQuiz(idClass) {
      /*let chapdevoirs = devoirs.find({
        idClass: idClass.toString()
      });
      let mesdevoirs = [];
      for (var i in chapdevoirs) {
        mesdevoirs.push(Object.assign({}), chapdevoirs[i]);
      }
      console.log(mesdevoirs)*/
      this.$store.dispatch("quiz/set_quizs", mesdevoirs);
      this.maximizedModalQuiz = true;
    }
  },
  async mounted() {
    let parameters = {}
    console.log(this.$route)
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
        this.chapitres = "No"
      }
    } catch (e) {
      console.log(e)
    }
  }
};
