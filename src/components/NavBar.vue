<template>
  <div class="sas-navbar">
    <el-menu :default-active="activeIndex" mode="horizontal" :router="true">
      <el-menu-item index="/">首页</el-menu-item>
      <template v-if="isManager">
        <el-menu-item v-for="i in manager" :key="i.route" :index="i.route">{{i.name}}</el-menu-item>
      </template>
      <template v-if="isStaff">
        <el-menu-item v-for="i in staff" :key="i.route" :index="i.route">{{i.name}}</el-menu-item>
        <el-submenu index="/apply">
          <template slot="title">申请</template>
          <el-menu-item v-for="i in staff2" :key="i.route" :index="i.route">{{i.name}}</el-menu-item>
        </el-submenu>
      </template>
      <template v-if="isCharge">
        <el-submenu index="/charge">
          <template slot="title">部门管理</template>
          <el-menu-item v-for="i in charge" :key="i.route" :index="i.route">{{i.name}}</el-menu-item>
        </el-submenu>
      </template>
      <el-submenu index="/user" class="user-submenu">
        <template slot="title">我的</template>
        <el-menu-item index="/profile">修改个人信息</el-menu-item>
        <el-menu-item @click="logout">登出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { getCurrentRole } from "@/utils/storage";

export default {
  data() {
    return {
      info: {},
      activeIndex: this.$route.fullPath,

      manager: [
        { name: "员工信息", route: "/staffs" },
        { name: "临时加班", route: "/temp-overtime" },
        { name: "工作情况", route: "/all-work" }
      ],
      staff: [
        { name: "工作安排", route: "/arrange" },
        { name: "签到历史", route: "/work-status" }
      ],
      staff2: [
        { name: "请假", route: "/leave" },
        { name: "申请加班", route: "/overwork" }
      ],
      charge: [
        { name: "请假审批", route: "/leave-approve" },
        { name: "加班审批", route: "/overwork-approve" },
        { name: "安排工作", route: "/arrange-work" },
        { name: "工作情况", route: "/department-work" }
      ]
    };
  },
  computed: {
    isManager() {
      return getCurrentRole() === "manager";
    },
    isStaff() {
      return getCurrentRole() === "staff" || getCurrentRole() === "charge";
    },
    isCharge() {
      return getCurrentRole() === "charge";
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      location.reload(); // 重新实例化vue-router对象
    }
  }
};
</script>

<style>
</style>
