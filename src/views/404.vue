<template>
  <div class="page-404">
    <el-card class="card-404">
      <h1>404 Not Found</h1>
      <p>抱歉，没有找到您想要的页面。</p>
      <br>
      <el-button @click="toMain" type="primary" round>返回首页</el-button>
      <el-button @click="toLast" type round>回到上一级</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  methods: {
    toMain() {
      this.$router.push("/");
    },
    toLast() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.page-404 {
  padding-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.card-404 {
  width: 600px;
  text-align: center;
}
</style>
