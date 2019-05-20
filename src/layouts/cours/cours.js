import {
  mapState,
  mapGetters
} from 'vuex'
import {
  classesCollection
} from 'assets/javascript/firebase.js'
import timelinechapitre from "components/drawers/timelinechapitre/timelinechapitre.vue";
import discussion from "components/drawers/discussion/discussion.vue";
export default {
  components: {
    timelinechapitre,
    discussion
  },
  computed: {
    classe() {
      return this.$store.state.classe.classe
    },
    chapitre() {
      return this.$store.state.cours.chapitre
    },
    header: {
      get() {
        return this.$store.state.layoutDemo.header
      },
      set(val) {
        this.$store.commit('layoutDemo/setHeader', val)
      }
    },
    footer: {
      get() {
        return this.$store.state.layoutDemo.footer
      },
      set(val) {
        this.$store.commit('layoutDemo/setFooter', val)
      }
    },
    left: {
      get() {
        return this.$store.state.layoutDemo.left
      },
      set(val) {
        this.$store.commit('layoutDemo/setLeft', val)
      }
    },
    right: {
      get() {
        return this.$store.state.layoutDemo.right
      },
      set(val) {
        this.$store.commit('layoutDemo/setRight', val)
      }
    },
    ...mapGetters('layoutDemo', ['view']),
    ...mapState('layoutDemo', [
      'headerReveal', 'footerReveal',
      'leftOverlay', 'leftBehavior', 'leftBreakpoint',
      'rightOverlay', 'rightBehavior', 'rightBreakpoint',
      'scrolling'
    ])
  },
  data() {
    return {
      discussionDrawer: false
    }
  },
  methods: {
    sortir() {
      let nom = this.classe.nom.split(' ').join('_')
      let next = '/classe/' + this.$route.params.idClasse + "/" + nom + "/"
      this.$router.push(next)
    }
  },
  async mounted() {
    var idChapitre = this.$route.params.idChapitre
    var idSection = this.$route.params.idSection
    var idClasse = this.$route.params.idClasse
    var classeDoc = await classesCollection.doc(idClasse).get()
    var chapitreDoc = await classeDoc.ref.collection("chapitres").doc(idChapitre).get()
    this.$store.commit("classe/SET_CLASSE", classeDoc.data())
    this.$store.commit("cours/SET_CHAPITRE", chapitreDoc.data())
    var sectionDoc = await chapitreDoc.ref.collection("sections").doc(idSection).get()
    this.$store.commit("cours/SET_SECTION", sectionDoc.data())
    var sectionQuery = await chapitreDoc.ref.collection("sections").get()
    if (sectionQuery.empty == false) {
      var sections = []
      for (var sectionDoc of sectionQuery.docs) {
        var section = sectionDoc.data()
        section.id = sectionDoc.id
        section.devoirs = []
        var devoirsQuery = await sectionDoc.ref.collection("devoirs").get()
        if (devoirsQuery.empty == false) {
          for (var devoirDoc of devoirsQuery.docs) {
            var devoir = devoirDoc.data()
            devoir.id = devoirDoc.id
            section.devoirs.push(devoir)
          }
        }
        sections.push(section)
      }
      this.$store.commit("cours/SET_SECTIONS", sections)
    }
  }
}
