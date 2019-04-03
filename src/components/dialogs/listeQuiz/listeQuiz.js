import consigne from "components/dialogs/consigne/consigne.vue";
export default {
  name: "listeQuiz",
  components: {
    consigne
  },
  props: ["maximizedModalQuiz"],
  computed: {
    quizs() {
      return this.$store.state.quiz.quizs;
    }
  },
  data() {
    return {
      ratingModel: 5,
      maximizedModalConsigne: false
    };
  },
  methods: {
    close() {
      this.$emit("update:maximizedModalQuiz", false);
    },
    async get_statistiques(idQuiz) {
      let parameters = {}
      parameters.quizz__idQuizz = idQuiz
      let data = {
        "token": this.$store.state.utilisateur.token,
        "self": this,
        "parameters": parameters
      }
      try {
        this.$q.loading.show()
        let promiseReponses = await this.$store.dispatch('classe/get_resultat_quiz', data)
        this.$q.loading.hide()
        if (promiseReponses.status == true) {
          console.log(promiseReponses.data)
          return promiseReponses.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    async showConsigne(quiz) {
      let parameters = {}
      parameters.idQuestion__in = quiz.numeroDesQuestions.replace(";", ",")
      let data = {
        "token": this.$store.state.utilisateur.token,
        "self": this,
        "parameters": parameters
      }
      try {
        this.$q.loading.show()
        let promiseQuestions = await this.$store.dispatch('classe/devoirs_questions', data)
        this.$q.loading.hide()
        if (promiseQuestions.status == true) {
          let questions = []
          for (var i in promiseQuestions.data) {
            questions.push(promiseQuestions.data[i].questionquiz)
          }
          this.$store.dispatch("quiz/set_questions", questions)
          this.$store.dispatch("quiz/set_quiz", quiz)
          this.maximizedModalConsigne = true
        }
      } catch (e) {
        console.log(e)
      }
      console.log(quiz)
    }
  },
  async mounted() {
    let quizs = this.$store.state.quiz.quizs
    let stats = {

    }
    for (var i in quizs) {
      let parameters = {}
      parameters.quizz__idQuizz = quizs[i].quizz.idQuizz
      let data = {
        "token": this.$store.state.utilisateur.token,
        "self": this,
        "parameters": parameters
      }
      try {
        let promiseReponses = await this.$store.dispatch('classe/get_resultat_quiz', data)
        if (promiseReponses.status == true) {
          stats[quizs[i].id] = promiseReponses.data
        }
      } catch (e) {
        console.log(e)
      }
    }
    this.$store.commit('quiz/SET_STATISTIQUE', stats)
    console.log("hello", stats)
  }
};
