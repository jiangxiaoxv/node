<template>
  <div>
    <Layout />
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src

import Layout from "@/components/layout/index.vue";

export default {
  name: "HomeView",
  components: {
    Layout,
  },
};
</script>
<style lang="less"></style>
