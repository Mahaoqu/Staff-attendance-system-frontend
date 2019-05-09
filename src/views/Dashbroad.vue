<template>
  <div>
    <el-button @click="logout" round>登出</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 重新实例化vue-router对象
      });
    }
  }
};
</script>

<style>
</style>
