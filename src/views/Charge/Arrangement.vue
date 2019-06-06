<template>
  <div>
    <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
      <el-radio-button label="top">top</el-radio-button>
      <el-radio-button label="right">right</el-radio-button>
      <el-radio-button label="bottom">bottom</el-radio-button>
      <el-radio-button label="left">left</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
import {} from "@/api/restful";

export default {
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style>
</style>
