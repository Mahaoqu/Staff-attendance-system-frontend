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
      <el-table-column prop="ID" label="工号" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column label="年龄">
        <template slot-scope="scope">
          <span>{{ age(scope.row.birthday) }}岁</span>
        </template>
      </el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.gender === 'male' ? '男' : '女' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="department" label="所属部门"></el-table-column>
      <el-table-column prop="role" label="职位">
        <template slot-scope="scope">
          <span>{{ roleName[scope.row.role] }}</span>
        </template>
      </el-table-column>
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
import { get_all_staffs_with_depart_name } from "@/api/restful";

export default {
  async created() {
    this.staffs = await get_all_staffs_with_depart_name();
    this.listLoading = false;
  },
  data() {
    return {
      listLoading: true,
      staffs: [],
      downloadLoading: false,
      uploadLoading: false,
      roleName: {
        charge: "主管",
        staff: "员工"
      }
    };
  },
  methods: {
    age(time) {
      return Math.floor(
        (Date.now() - Date.parse(time)) / (365 * 24 * 60 * 60 * 1000)
      );
    },

    handleEdit(index, row) {
      console.log(index, row);
    },
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
