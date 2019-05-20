import commentcours from "components/commentcours/commentcours.vue";
import {
  mapState,
  mapGetters
} from 'vuex'
export default {
  props: ['discussionDrawer'],
  components: {
    commentcours
  },
  computed: {
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
  }
}
