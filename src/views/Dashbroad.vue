<template>
  <el-container>
    <el-header>
      <NavBar></NavBar>
    </el-header>
    <el-main>Main</el-main>
  </el-container>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  components: {
    NavBar
  },

  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
