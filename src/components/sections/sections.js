export default {
  props: ["sectionsListDrawer", "changeSectionContenu"],
  data() {
    return {
      checked_one: true
    };
  },
  methods: {
    chooseSection(index) {
      this.indiceSectionCourante = index;
      this.$emit("update:sectionsListDrawer", false);
      this.$emit("update:changeSectionContenu", true);
      console.log("hellooooooooooooooooooooooooooooooooooooo")
    }
  },
  destroyed(){
    this.$emit("update:sectionsListDrawer", false);
    console.log("hellaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    this.$emit("update:changeSectionContenu", false);
  }, 
  computed: {
    indiceSectionCourante: {
      get() {
        return this.$store.state.cours.indiceSectionCourante;
      },
      set(val) {
        this.$store.dispatch("cours/set_indice_section_courante", val);
      }
    },
    sections(){
        return this.$store.state.cours.sections
    }
  }
}
