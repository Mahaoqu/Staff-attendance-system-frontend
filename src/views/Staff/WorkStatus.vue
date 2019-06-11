<template>
  <el-table :data="status" style="width: 100%" v-loading="listLoading">
    <el-table-column label="日期"/>
    <el-table-column label="工作安排"></el-table-column>
    <el-table-column label="上班时间"></el-table-column>
    <el-table-column label="下班时间"></el-table-column>
  </el-table>
</template>

<script>
import {} from "@/api/restful";

export default {
  data() {
    return {
      status: [],
      listLoading: false
    };
  },
  computed: {},
  methods: {}
};
</script>

<style>
</style>

