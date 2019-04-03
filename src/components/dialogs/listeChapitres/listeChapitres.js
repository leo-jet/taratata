//import chapitre from "components/dialog/chapitre/chapitre.vue";
export default {
  name: "listeChapitres",
  components: {
    //chapitre
  },
  props: ["maximizedModalChapitres"],
  computed: {
    chapitres() {
      return this.$store.state.cours.chapitres;
    }
  },
  data() {
    return {
      ratingModel: 5,
      maximizedModalChapitre: false,
      nomChapitre: ""
    };
  },
  methods: {
    close() {
      this.$emit("update:maximizedModalChapitres", false);
    },
    voirChapitre(idChapitre, name) {
      this.nomChapitre = name
      let sectionschap = sections.find({
        idChapitre: idChapitre
      });
      this.$store.dispatch("cours/set_sections", sectionschap);
      this.maximizedModalChapitre = true;
    }
  },
  mounted() {}
};
