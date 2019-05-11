<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"></el-menu>
    <span>您好，{{info.name}}!</span>
    <el-button @click="changeInfo" icon="el-icon-edit" type="text">修改个人信息</el-button>
    <el-button @click="logout" round>登出</el-button>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/userinfo";

export default {
  data() {
    return {
      info: {},
      activeIndex: "1"
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      this.info = await getUserInfo();
    },
    async logout() {
      await this.$store.dispatch("LogOut");
      location.reload(); // 重新实例化vue-router对象
    },
    changeInfo() {}
  }
};
</script>

<style>
</style>
