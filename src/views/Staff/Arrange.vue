<template>
  <div>
    <el-calendar
      #dateCell="{date, data}"
      :range="range"
      v-loading="calendarLoading"
    >
      <span>{{ data.day.split('-')[2] }}</span>
      <br>
      <template v-if="arrangment_map[data.day] == undefined">
        <div>暂无工作安排</div>
      </template>
      <div v-else>
        <div v-for="a in arrangment_map[data.day]" :key="a.ID">
          <small>工作时间：{{a.beginTime}} - {{a.endTime}}</small>
          <br>
          <small>工作内容：{{a.content}}</small>
        </div>
      </div>
    </el-calendar>
  </div>
</template>

<script>
import {
  getArrangementsByRange,
  getArrangementsByIDandDate
} from "@/api/restful";

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
  async created() {
    this.calendarLoading = true;
    await this.getArrangeByRange()
    this.calendarLoading = false;
  },
  data() {
    return {
      range: [lastMonday(new Date()), threeWeeksLater(lastMonday(new Date()))],
      arrangment_map: {},
      calendarLoading : false
    };
  },
  methods: {
    getArrangeByRange: async function() {
      this.arrangment_map = await getArrangementsByRange(
        getCurrentID(),
        this.range
      );
    }
  }
};
</script>

<style>

</style>
