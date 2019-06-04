<template>
  <div>
    <el-table>
      <el-form :model="newitem">
        <h3>新请假：</h3>
        <el-form-item label="假期时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="value2"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            align="right"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </el-table>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      newitem: {},
      pickerOptions: {
        shortcuts: []
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: "",
      formLabelWidth: "120px"
    };
  },
  methods: {}
};
</script>

<style>
</style>
