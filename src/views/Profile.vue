<template>
  <el-form ref="info" :model="info" label-width="120px" class="profile-form">
    <h3>个人信息</h3>
    <el-form-item label="工号">
      <el-input v-model="info.ID" :disabled="true"></el-input>
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
      <el-input v-model="info.email" :disabled="!revise"></el-input>
    </el-form-item>
    <el-form-item label="下班提醒" prop="notification">
      <el-switch v-model="info.notification" :disabled="!revise"></el-switch>
    </el-form-item>
    <el-form-item v-show="revise">
      <el-button type="success" @click="patchForm" :loading="onSubmit" class="sub-button">确认更改</el-button>
      <el-button type @click="resetForm" class="sub-button">取消</el-button>
    </el-form-item>
    <el-form-item v-show="!revise">
      <el-button type="info" @click="revise=true" class="change-button">更改个人信息</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { get_staff_with_depart_name, modifyStaff } from "@/api/restful";
import { getCurrentID } from "@/utils/storage";

async function getUserInfo() {
  return await get_staff_with_depart_name(getCurrentID());
}

async function patchUserInfo(info) {
  return await modifyStaff(getCurrentID(), info);
}

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
      revise: false,
      onSubmit: false,
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
          this.onSubmit = true;
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
      this.onSubmit = false;
      this.revise = false;
    },
    resetForm() {
      this.info = { ...originInfo };
      this.revise = false;
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
.change-button {
  width: 480px;
}
.sub-button {
  width: 230px;
}
</style>
