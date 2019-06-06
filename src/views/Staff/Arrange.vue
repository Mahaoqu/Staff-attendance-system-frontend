<template>
  <div>
    <el-calendar #dateCell="{date, data}" class="sas-calender" :range="range">
      {{ data.day.split('-')[2] }}
      {{ data.isSelected ? '✔️' : ''}}
      {{ arrangment_map[data.day] }}
      <el-button @click="arrange(date)">查看详细</el-button>
    </el-calendar>
  </div>
</template>

<script>
import {} from "@/api/restful";

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
    this.arrangment_map = {}
  },
  data() {
    return {
      range: [lastMonday(new Date()), threeWeeksLater(lastMonday(new Date()))],
      arrangment_map: null
    };
  },
  computed: {},
  methods: {
    arrange: function (date) {
      console.log(date)
    }
  }
};
</script>

<style>
/* .sas-calender {
  height: 100px;
} */
</style>
