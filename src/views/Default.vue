<template>
  <div>
    您好，来自{{ department_mapping[staff.departmentID]}}部的
    <strong>{{staff.name}}</strong>
    {{staff.gender ? '先生':'女士'}}!
  </div>
</template>



<script>
import { getStaff } from "@/api/restful";
import {
  getCurrentID,
  getCurrentRole,
  departmentMapping
} from "@/utils/storage";

export default {
  async created() {
    this.department_mapping = await departmentMapping();
    this.staff = await getStaff(getCurrentID());
  },
  data() {
    return {
      staff: {},
      department_mapping: {}
    };
  },
  computed: {},
  methods: {}
};
</script>

<style>
</style>

