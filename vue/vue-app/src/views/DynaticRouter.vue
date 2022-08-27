<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    {{ content }}_{{ id }}
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  props: {
    id: {
      type: String,
      require: true,
    },
  },
  components: {},
  data() {
    return {
      content: "动态路由",
    };
  },
  watch: {
    /* $route: {
      handler: function (to, from) {
        console.log(to, from);
      },
      deep: true,
      immediate: true,
    }, */
  },
};
</script>
