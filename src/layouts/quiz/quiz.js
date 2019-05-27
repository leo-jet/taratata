import {
  classesCollection
} from 'assets/javascript/firebase.js'
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
      questionListDrawer: false,
      startTime: 0,
      currentTime: 0,
      interval: null
    };
  },
  async mounted() {
    
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
