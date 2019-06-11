<template>
  <div>
    <el-calendar #dateCell="{date, data}" class="sas-calender" :range="range">
      {{ data.day.split('-')[2] }}
      {{ data.isSelected ? '✔️' : ''}}
      {{ arrangment_map[data.day] }}
      <el-button @click="arrange(date)">查看详细</el-button>
    </el-calendar>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getArrangementsByIDandDate } from "@/api/restful";
import { getCurrentID } from "@/utils/storage";

function lastMonday(day) {
  day.setDate(day.getDate() - day.getDay() + 1);
  return day;
}

function threeWeeksLater(day) {
  day.setDate(day.getDate() + 20);
  return day;
}

export default {
  created() {
    this.arrangment_map = {};
  },
  data() {
    return {
      range: [lastMonday(new Date()), threeWeeksLater(lastMonday(new Date()))],
      arrangment_map: null,

      current_arrangement: null,
      dialogVisible: false
    };
  },
  computed: {},
  methods: {
    arrange: async function(date) {
      console.log(date);
      this.current_arrangement = await getArrangementsByIDandDate(
        getCurrentID(),
        date
      );
      this.dialogVisible = true;
    },
    handleClose() {}
  }
};
</script>

<style>
</style>
