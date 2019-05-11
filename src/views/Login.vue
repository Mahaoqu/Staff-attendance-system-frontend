<template>
  <el-container>
    <el-main>
      <h3 class="title">SASF 登录</h3>
      <el-form ref="form" :model="form" label-width="80px" class="login-form">
        <el-form-item
          prop="id"
          label="ID"
          :rules="[
            { required: true, message: '请输入您的ID', trigger: 'blur' },
          ]"
        >
          <el-input v-model="form.id" placeholder="80000"></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
          :rules="[
            { required: true, message: '请您输入密码', trigger: 'blur' },
          ]"
        >
          <el-input v-model="form.password" placeholder="******" :type="password_type"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onLogin" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>


<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        id: "",
        password: ""
      },
      loading: false,
      password_type: "password"
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    async onLogin() {
      this.loading = true;
      try {
        await this.$store.dispatch("Login", this.form); // 见 @/store.js 的 action
        this.$router.push({ path: this.redirect || "/" });
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style>
.title {
  font-size: 26px;
  font-weight: 400;
  margin: auto;
  text-align: center;
  font-weight: bold;
}

.login-form {
  left: 0;
  right: 0;
  width: 520px;
  max-width: 100%;
  padding: 35px 35px 15px 35px;
  margin: 120px auto;
}
</style>
