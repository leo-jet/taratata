import questionsList from "components/questionsList/questionsList.vue";
export default {
  components: {
    questionsList
  },
  props: ["maximizedModalQuiz"],
  created() {

  },
  data() {
    return {
      score: 0,
      correction: false,
      options: [{
          label: 'Google',
          value: 'goog'
        },
        {
          label: 'Facebook',
          value: 'fb'
        },
        {
          label: 'Twitter',
          value: 'twtr'
        },
        {
          label: 'Apple Inc.',
          value: 'appl'
        },
        {
          label: 'Oracle',
          value: 'ora'
        }
      ],
      selectModel: "",
      propositions: {
        type: "qcm",
        lists: [{
            id: "a",
            enonce: "proposition A",
            solution: false,
            checked: true
          },
          {
            id: "b",
            enonce: "proposition B",
            solution: true,
            checked: false
          },
          {
            id: "c",
            enonce: "proposition C",
            solution: false,
            checked: false
          }
        ]
      },
      check4: true,
      check5: false,
      check6: true,
      state: "started",
      questionListDrawer: false,
      startTime: 0,
      currentTime: 0,
      interval: null
    };
  },
  mounted() {
    this.interval = setInterval(this.updateCurrentTime, 1000);
    console.log(this.$store.state.quiz.questions)
  },
  destroyed: function () {
    clearInterval(this.interval);
  },
  computed: {
    questions() {
      return this.$store.state.quiz.questions
    },
    indiceQuestionCourante: {
      get() {
        return this.$store.state.quiz.indiceQuestionCourante
      },
      set(val) {
        this.$store.commit('quiz/updateIndiceQuestionCourante', val)
      }
    },
    time: function () {
      return this.hours + ":" + this.minutes + ":" + this.seconds;
    },
    milliseconds: function () {
      return this.currentTime;
    },
    hours: function () {
      var lapsed = this.milliseconds;
      var hrs = Math.floor(lapsed / 1000 / 60 / 60);
      return hrs >= 10 ? hrs : "0" + hrs;
    },
    minutes: function () {
      var lapsed = this.milliseconds;
      var min = Math.floor((lapsed / 1000 / 60) % 60);
      return min >= 10 ? min : "0" + min;
    },
    seconds: function () {
      var lapsed = this.milliseconds;
      var sec = Math.ceil((lapsed / 1000) % 60);
      return sec >= 10 ? sec : "0" + sec;
    }
  },
  methods: {
    urlBegin(path) {
      return (this.$q.platform.is.mobile && process.env.DEV) ? "http://10.0.2.2:8000" + path : process.env.API + path
    },
    removeChip(index) {
      if (this.correction == false) {
        this.questions[this.indiceQuestionCourante].propositions.lists[index].proposition = null
      }
    },
    reset: function () {
      this.$data.state = "started";
      this.$data.startTime = 0;
      this.$data.currentTime = 0;
    },
    showQuestions() {
      this.questionListDrawer = true
    },
    terminer() {
      this.correction = true
      this.pause()
      this.corriger()
    },
    pause: function () {
      this.$data.state = "paused";
    },
    resume: function () {
      this.$data.state = "started";
    },
    async corriger() {
      let point = 0
      let feuille = []
      for(var i in this.questions){
        let myquestion = {
          id: this.questions[i].id,
          type: this.questions[i].type
        }
        console.log("hello")
        let mypropositions = []
        if(this.questions[i].type == "qcm"){
          let reponsefausse = false
          for(var j in this.questions[i].propositions.lists){
            mypropositions.push({
              checked: this.questions[i].propositions.lists[j].checked, 
              solution: this.questions[i].propositions.lists[j].solution
            })
            console.log(this.questions[i].propositions.lists[j].checked, this.questions[i].propositions.lists[j].solution)
            if(this.questions[i].propositions.lists[j].checked != this.questions[i].propositions.lists[j].solution){
              reponsefausse = true
            }
          }
          if(reponsefausse == false){
            point = point + 1
          }
        }
        if(this.questions[i].type == "schema"){
          let reponsefausse = false
          for(var j in this.questions[i].propositions.lists){
            mypropositions.push({
              proposition: this.questions[i].propositions.lists[j].proposition, 
              solution: this.questions[i].propositions.lists[j].solution
            })
            console.log(this.questions[i].propositions.lists[j].proposition, this.questions[i].propositions.lists[j].solution)
            if(this.questions[i].propositions.lists[j].proposition != this.questions[i].propositions.lists[j].solution){
              reponsefausse = true
            }
          }
          if(reponsefausse == false){
            point = point + 1
          }
        }
        myquestion.propositions = mypropositions
        feuille.push(myquestion)
      }
      let formData = new FormData()
      let data = {
        "token": this.$store.state.utilisateur.token,
        "self": this
      }
      let score = point/this.questions.length
      formData.append("note", Math.round(score*100))
      formData.append("idDevoir", this.$store.state.quiz.quiz.id)
      formData.append("reponses", JSON.stringify(feuille))
      let time = this.hours*3600 + this.minutes*60 + this.seconds
      formData.append("duree", time)
      data.formData = formData
      let promiseEnvoiFeuille = await this.$store.dispatch('classe/envoi_feuille', data)
      this.score = point
    },
    updateCurrentTime: function () {
      if (this.$data.state == "started") {
        this.currentTime = this.currentTime + 1000;
      }
    },
    indexOfProposition(index) {
      if (index == 0) {
        return "A"
      }
      if (index == 1) {
        return "B"
      }
      if (index == 2) {
        return "C"
      }
      if (index == 3) {
        return "D"
      }
      if (index == 4) {
        return "E"
      }
      if (index == 5) {
        return "F"
      }
      if (index == 6) {
        return "G"
      }
    },
    clickProposition(index) {
      if (this.correction == false) {
        if (this.questions[this.indiceQuestionCourante].propositions.type == "qcm") {
          this.questions[this.indiceQuestionCourante].propositions.lists[index].checked = !this.questions[this.indiceQuestionCourante].propositions.lists[index].checked
        }
        if (this.questions[this.indiceQuestionCourante].propositions.type == "qru") {
          for (var i in this.questions[this.indiceQuestionCourante].propositions.lists) {
            this.questions[this.indiceQuestionCourante].propositions.lists[i].checked = false
          }
          this.questions[this.indiceQuestionCourante].propositions.lists[index].checked = !this.questions[this.indiceQuestionCourante].propositions.lists[index].checked
        }
      }
    },
    nextQuestion() {
      this.indiceQuestionCourante = this.indiceQuestionCourante + 1
    },
    previousQuestion() {
      this.indiceQuestionCourante = this.indiceQuestionCourante == 0 ? 0 : this.indiceQuestionCourante - 1
    },
    close() {
      this.$emit("update:maximizedModalQuiz", false);
    }
  }
}
