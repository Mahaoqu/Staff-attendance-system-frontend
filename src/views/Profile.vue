<template>
  <el-form ref="info" :model="info" label-width="120px" class="profile-form">
    <h3>个人信息</h3>
    <el-form-item label="工号">
      <el-input v-model="info.id" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="info.name" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="所属部门">
      <el-input v-model="info.department" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="角色">
      <el-select v-model="info.role" disabled>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="出生日期">
      <el-date-picker v-model="info.birthday" type="date" :disabled="true"></el-date-picker>
    </el-form-item>
    <el-form-item label="email">
      <el-input v-model="info.email"></el-input>
    </el-form-item>
    <el-form-item label="下班提醒" prop="notification">
      <el-switch v-model="info.notification"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="patchForm">更改</el-button>
      <el-button type @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getUserInfo, patchUserInfo } from "@/api/userinfo";

function compare(obj1, obj2) {
  let keys = Object.keys(obj1);
  for (let key in obj1) {
    if (obj2.hasOwnProperty(key)) {
      if (!Object.is(obj1[key], obj2[key])) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
}

let originInfo = {};

export default {
  data() {
    return {
      info: {},
      options: [
        { value: "manager", label: "经理" },
        { value: "charge", label: "部门主管" },
        { value: "staff", label: "员工" }
      ]
    };
  },
  created() {
    this.getForm();
  },
  methods: {
    async getForm() {
      originInfo = await getUserInfo();
      this.info = { ...originInfo };
    },
    async patchForm() {
      let changed = !compare(this.info, originInfo);
      try {
        if (changed) {
          await patchUserInfo(this.info);
        }
        this.$notify({
          title: "提交成功",
          message: "您的修改已经成功提交到服务器上",
          type: "success"
        });
      } catch {
        this.$notify.error()({
          title: "错误",
          message: "提交修改时出现了一些错误，请稍后重试。"
        });
      }
      this.getForm(); // 更新后重新获取信息
    },
    resetForm() {
      this.info = { ...originInfo };
    }
  }
};
</script>

<style>
.profile-form {
  width: 600px;
  margin-left: 100px;
  margin-top: 50px;
}
</style>
