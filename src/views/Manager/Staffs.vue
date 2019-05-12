<template>
  <div>
    <span>Thank you, manager!</span>
    <el-table :data="staffs" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      staffs: []
    };
  }
};
</script>

<style>
</style>
