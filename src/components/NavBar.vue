<template>
  <div>
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="/">首页</el-menu-item>
      <template v-if="isManager">
        <el-menu-item v-for="i in manager" :key="i.route" :index="i.route">{{i.name}}</el-menu-item>
      </template>
      <template v-if="isStaff">
        <el-menu-item v-for="i in staff" :key="i.route" :index="i.route">{{i.name}}</el-menu-item>
      </template>
      <template v-if="isCharge">
        <el-menu-item v-for="i in charge" :key="i.route" :index="i.route">{{i.name}}</el-menu-item>
      </template>
    </el-menu>

    <span>您好，{{this.$store.state.user_info.name}}!</span>
    <el-button @click="changeInfo" icon="el-icon-edit" type="text">修改个人信息</el-button>
    <el-button @click="logout" round>登出</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      activeIndex: "/",

      manager: [
        { name: "员工信息", route: "/staffs" },
        { name: "临时加班", route: "/tempovertime" },
        { name: "工作情况", route: "/allwork" }
      ],
      staff: [{ name: "工作安排", route: "/arrange" }],
      charge: []
    };
  },
  computed: {
    isManager() {
      return this.$store.state.user_info.role === "manager";
    },
    isStaff() {
      return (
        this.$store.state.user_info.role === "staff" ||
        this.$store.state.user_info.role === "charge"
      );
    },
    isCharge() {
      return this.$store.state.user_info.role === "charge";
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      location.reload(); // 重新实例化vue-router对象
    },
    changeInfo() {
      this.$router.push({ path: "/profile" });
    },
    handleSelect(key, keyPath) {
      this.$router.push({ path: key });
    }
  }
};
</script>

<style>
</style>
