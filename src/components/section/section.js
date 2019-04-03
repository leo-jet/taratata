import pdfviewer from "vue-instant-pdf-viewer"
export default {
  components: {
    pdfviewer
  },
  data() {
    return {};
  },
  mounted() {
    this.refreshMathJax()
    console.log("world")
  },
  computed: {
    pathfile(){
      let url = (this.$q.platform.is.mobile && process.env.DEV) ? "http://10.0.2.2:8000" : process.env.API
      return url + this.$store.state.cours.sections[this.$store.state.cours.indiceSectionCourante].contenuFichier
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

    refreshMathJax() {
      console.log("hello")
      if (window.MathJax) {
        window.MathJax.Ajax.config.path["mhchem"] =
          "https://cdnjs.cloudflare.com/ajax/libs/mathjax-mhchem/3.3.2";
        window.MathJax.Hub.Config({
          TeX: {
            extensions: ["[mhchem]/mhchem.js"],
          }
        })

        window.MathJax.Hub.Queue([
          'Typeset',
          window.MathJax.Hub,
          this.$refs.description
        ])
      }
    },
  }
}
