<template>
  <div>
    <myHeader></myHeader>
    <nuxt-child />
    <myFooter></myFooter>

    <login v-show="loginstatus" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import myHeader from '../components/myHeader'
import myFooter from '../components/myFooter'
import login from '../components/login'
export default {
  components: {
    myHeader,
    myFooter,
    login,
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      loginstatus: 'user/loginstatus',
    }),
  },
  mounted() {},
}
</script>
<style>
</style>
