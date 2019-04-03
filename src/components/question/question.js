import axios from 'axios';
export default {
  props: ["question"],
  components: {},
  name: 'question',
  data() {
    return {}
  },
  methods: {
    ajouter(question){
      this.$store.commit("quiz/APPEND_QUESTIONS", question)
    }
  },
  mounted() {},
  destroyed() {}
}
