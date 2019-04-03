export default {
  props: ["questionListDrawer", "questions"],
  data() {
    return {
      checked_one: true
    };
  },
  methods: {
    chooseQuestion(index) {
      this.indiceQuestionCourante = index;
      console.log(index);
      this.$emit("update:questionListDrawer", false);
    }
  },
  computed: {
    indiceQuestionCourante: {
      get() {
        return this.$store.state.quiz.indiceQuestionCourante;
      },
      set(val) {
        this.$store.commit("quiz/updateIndiceQuestionCourante", val);
      }
    }
  }
};
