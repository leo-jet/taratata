import listeSections from "components/sections/sections.vue";
import contenuSection from "components/section/section.vue";
export default {
  components: {
    listeSections, 
    contenuSection
  },
  props: ["maximizedModalChapitre", "nomChapitre"],
  created() {

  },
  watched: {
    sectionsListDrawer(val) {
      this.refreshMathJax()
    }
  },
  data() {
    return {
      sectionsListDrawer: false, 
      changeSectionContenu: false
    };
  },
  mounted() {
    //this.refreshMathJax()
  },
  computed: {
    sections() {
      return this.$store.state.cours.sections
    },
    section() {
      return this.$store.state.cours.sections[this.$store.state.cours.indiceSectionCourante]
    },
    indiceSectionCourante: {
      get() {
        return this.$store.state.cours.indiceSectionCourante
      },
      set(val) {
        this.$store.dispatch('cours/set_indice_section_courante', val)
      }
    },
  },
  methods: {
    showSectionsListe() {
      this.sectionsListDrawer = true
    },
    nextProposition() {
      //this.indiceQuestionCourante = this.indiceQuestionCourante + 1
    },
    previousProposition() {
      //this.indiceQuestionCourante = this.indiceQuestionCourante == 0 ? 0 : this.indiceQuestionCourante - 1
    },
    close() {
      this.$emit("update:maximizedModalChapitre", false);
    }
  }
}
