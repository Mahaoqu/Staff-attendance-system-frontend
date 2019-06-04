<template>
  <div>
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >添加</el-button>
      <el-button
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >导出</el-button>
      <el-button
        :loading="uploadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-upload"
        @click="handleUpload"
      >导入Excel</el-button>
    </div>

    <el-table :data="staffs" style="width: 100%" v-loading="listLoading">
      <el-table-column prop="ID" label="工号" width="180"/>
      <el-table-column prop="name" label="姓名" width="180"/>
      <el-table-column label="年龄">
        <template slot-scope="scope">
          <span>{{ age(scope.row.birthday) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.gender === true ? '男' : '女' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属部门">
        <template slot-scope="scope">
          <span>{{ departmentMapping[scope.row.departmentID] || '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="职位">
        <template slot-scope="scope">
          <span>{{ roleMapping[scope.row.identity]}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱"/>
      <el-table-column prop="phoneNumber" label="电话号码"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="个人信息" :visible.sync="dialogFormVisible">
      <el-form :model="edit">
        <el-form-item label="工号" :label-width="formLabelWidth">
          <el-input v-model="edit.ID" :disabled="true"/>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="edit.name"/>
        </el-form-item>
        <el-form-item label="所属部门" :label-width="formLabelWidth">
          <el-select v-model="edit.departmentID" placeholder="选择部门">
            <el-option
              v-for="item in departmentList"
              :key="item.ID"
              :label="item.name"
              :value="item.ID"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="edit.gender">
            <el-option
              v-for="item in genderList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="edit.identity">
            <el-option v-for="item in roleList" :key="item.ID" :label="item.name" :value="item.ID"/>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="edit.birthday"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="电子邮箱" :label-width="formLabelWidth">
          <el-input v-model="edit.email"/>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth">
          <el-input v-model="edit.phoneNumber"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="个人信息" :visible.sync="newFormVisible">
      <p>登录的初始化密码为：123456</p>
      <el-form :model="newbie">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="newbie.name"/>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="newbie.gender">
            <el-option
              v-for="item in genderList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门" :label-width="formLabelWidth">
          <el-select v-model="newbie.departmentID" placeholder="选择部门">
            <el-option
              v-for="item in departmentList"
              :key="item.ID"
              :label="item.name"
              :value="item.ID"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-select v-model="newbie.identity">
            <el-option v-for="item in roleList" :key="item.ID" :label="item.name" :value="item.ID"/>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="newbie.birthday"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="电子邮箱" :label-width="formLabelWidth">
          <el-input v-model="newbie.email"/>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth">
          <el-input v-model="newbie.phoneNumber"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlePost">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getStaffs, newStaff, modifyStaff, deleteStaff } from "@/api/restful";

import {
  departmentMapping,
  roleMapping,
  departmentList,
  roleList
} from "@/utils/storage";

export default {
  async created() {
    let _ = null;
    [
      this.departmentMapping,
      this.departmentList,
      this.roleMapping,
      this.roleList,
      _
    ] = await Promise.all([
      departmentMapping(),
      departmentList(),
      roleMapping(),
      roleList(),
      this.refreash()
    ]);
  },
  data() {
    return {
      listLoading: true,
      downloadLoading: false,
      uploadLoading: false,
      staffs: [],

      roleMapping: {},
      departmentMapping: {},

      roleList: null,
      departmentList: null,
      genderList: [{ value: true, name: "男" }, { value: false, name: "女" }],

      edit: {},
      newbie: {},

      formLabelWidth: "120px",
      dialogFormVisible: false,
      newFormVisible: false
    };
  },
  methods: {
    // 通过时间（Unix格式）计算年龄
    departmentByID() {},
    roleByID() {},
    age(time) {
      if (time == undefined) return "-";
      return (
        Math.floor(
          (Date.now() - Date.parse(time)) / (365 * 24 * 60 * 60 * 1000)
        ) + "岁"
      );
    },

    // 异步：刷新员工列表
    async refreash() {
      this.listLoading = true;
      this.staffs = await getStaffs();
      this.listLoading = false;
    },

    // 异步：打开编辑列表。点击「修改」按钮时调用
    // 在此期间获取部门列表，并复制员工信息对象
    async handleEdit(index, row) {
      this.edit = { ...row };
      this.dialogFormVisible = true;
    },

    // 异步：更新信息。在更新框中点击按钮时调用
    async handleUpdate() {
      await modifyStaff(this.edit);
      this.dialogFormVisible = false;
      this.listLoading = true;
      await this.refreash();
    },

    // 异步：删除信息。当点击「删除」按钮时调用
    handleDelete(index, row) {
      this.$confirm("该员工将被删除且不可撤销，是否确定？", "删除员工", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })

        .then(() => {
          this.$message({
            type: "success",
            message: "操作成功"
          });
        })
        .then(() => {
          return deleteStaff(row.ID);
        })
        .then(() => {
          return this.refreash();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //
    handleFilter() {},

    // 异步：在新建窗口中点击确定时调用。
    async handlePost() {
      this.newbie.password = "123456";
      await newStaff(this.newbie);
      this.newFormVisible = false;
      await this.refreash();
    },

    // 点击「新建」按钮时调用。打开窗口。
    handleCreate(index, row) {
      this.newFormVisible = true;
    },
    handleDownload() {},
    handleUpload() {}
  }
};
</script>

<style>
</style>
