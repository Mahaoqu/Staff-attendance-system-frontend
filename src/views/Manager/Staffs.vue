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

    <el-table :data="staffData" style="width: 100%">
      <el-table-column prop="id" label="工号" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="birthday" label="生日">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column prop="departmentId" label="所属部门"></el-table-column>
      <el-table-column prop="role" label="职位"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getStaffs } from "@/api/manager";
export default {
  created() {
    this.getStaffData();
  },
  data() {
    return {
      listLoading: true,
      staffData: [],
      downloadLoading: false,
      uploadLoading: false
    };
  },
  methods: {
    async getStaffData() {
      const data = await getStaffs();
      this.staffData = data.staffs;
    },

    handleEdit(index, row) {},
    handleDelete(index, row) {},
    handleFilter() {},
    handleCreate() {},
    handleDownload() {},
    handleUpload() {}
  }
};
</script>

<style>
</style>
