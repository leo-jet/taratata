export default {
  name: "infogroup",
  props: ['description'],
  mounted() {
    this.$nextTick(function () {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.$refs.descriptionDialog])
    })
  },
  computed: {},
  data() {
    return {}
  }
}
