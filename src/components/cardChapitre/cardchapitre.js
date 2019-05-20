export default {
  name: "cardchapitre",
  props: ['chapitre'],
  mounted() {},
  computed: {},
  data() {
    return {}
  },
  methods: {
    playSection(nomChapitre, idChapitre, nomSection, idSection) {
      let titreChap = nomChapitre.split(' ').join('_')
      let titreSection = nomSection.split(' ').join('_')
      let next = '/classe/'+this.$route.params.idClasse+'/chapitre/' + idChapitre + "/" + titreChap + "/section/" + idSection + "/" + titreSection
      this.$router.push(next)
    }
  },
  mounted() {

  }
}
