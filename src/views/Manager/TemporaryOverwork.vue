<template>
  <div>
    <el-table :data="items">
      <el-table-column prop="beginDateTime" label="开始时间" width="100">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.endDateTime.toLocaleString()"
            placement="top-start"
          >
            <span>{{ scope.row.beginDateTime | moment('calendar') }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="endDateTime" label="结束时间" width="100">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.endDateTime.toLocaleString()"
            placement="top-start"
          >
            <span>{{ scope.row.endDateTime | moment('calendar') }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="加班时长" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.endDateTime - scope.row.beginDateTime | duration('humanize')}}</span>
        </template>
      </el-table-column>

      <el-table-column label="加班内容" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="submitStamp" label="提交时间" width="100">
        <template slot-scope="scope">
          <span>{{ fromNow(scope.row.submitStamp) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleCancel(scope.$index, scope.row)"
          >取消</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-form :model="newitem">
      <h3>新临时加班：</h3>
      <el-form-item label="加班时间" :label-width="formLabelWidth">
        <el-date-picker
          v-model="newitem.TimeDuration"
          :picker-options="pickerOptions"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :default-time="['18:00:00', '21:00:00']"
          align="right"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="加班时长" :label-width="formLabelWidth">{{ duration }}</el-form-item>

      <el-form-item label="加班内容" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="2" placeholder="加班内容（100字以内）" v-model="newitem.content"></el-input>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth">
        <el-button @click="clearItem">清空</el-button>
        <el-button type="primary" @click="postItem">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getTemporaryOvertimes,
  newTemporaryOvertime,
  modifyTemporaryOvertime,
  deleteTemporaryOvertime
} from "@/api/restful";

export default {
  async created() {
    await this.refreash();
  },
  computed: {
    duration() {
      if (this.newitem.TimeDuration) {
        return this.$moment
          .duration(this.newitem.TimeDuration[0] - this.newitem.TimeDuration[1])
          .humanize();
      } else return "-";
    }
  },
  data() {
    let t = this;
    return {
      items: [],
      newitem: {},
      pickerOptions: {
        disabledDate: function(date) {
          return t
            .$moment(date)
            .add(1, "d")
            .isBefore(new Date());
        }
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    fromNow(time) {
      console.log(time);
      if (time === undefined || time === null) {
        return "-";
      } else return this.$moment(time).fromNow();
    },
    refreash: async function() {
      this.items = await getTemporaryOvertimes();
    },
    clearItem: function() {
      this.newitem = {};
    },
    postItem: async function() {
      // 将表单中的LeaveTime数组转换成分开的形式
      let l = { ...this.newitem };
      l.beginDateTime = l.TimeDuration[0];
      l.endDateTime = l.TimeDuration[1];
      delete l.TimeDuration

      await newTemporaryOvertime(l);
      this.$message({
        type: "success",
        message: "添加申请成功"
      });
      this.clearItem();
      await this.refreash();
    },
    async handleCancel(index, row) {
      await deleteTemporaryOvertime(row.ID);
      this.$message({
        type: "success",
        message: "取消成功"
      });
      await this.refreash();
    }
  }
};
</script>

<style>
</style>
