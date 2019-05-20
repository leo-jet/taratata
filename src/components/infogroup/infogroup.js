export default {
  name: "infogroup",
  props: [],
  mounted() {
    this.$nextTick(FB.XFBML.parse())
  },
  computed: {},
  data() {
    return {}
  }
}
