import quiz from "components/dialogs/quiz/quiz.vue";
export default {
  name: "consigne",
  components: {
    quiz
  },
  props: ["maximizedModalConsigne"],
  data() {
    return {
      maximizedModalQuiz: false
    };
  },
  computed: {
    currentquiz() {
      return this.$store.state.quiz.quiz;
    }
  },
  methods: {
    close() {
      this.$emit("update:maximizedModalConsigne", false);
    },
    showQuiz() {
      this.$store.commit("quiz/updateIndiceQuestionCourante", 0);
      this.maximizedModalQuiz = true;
    }
  },
  mounted() {}
};