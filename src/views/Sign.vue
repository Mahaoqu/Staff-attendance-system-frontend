<template>
  <div>
    <h1>员工签到</h1>
    <el-radio-group v-model="type">
      <el-radio-button label="补签"></el-radio-button>
      <el-radio-button label="员工签到"></el-radio-button>
    </el-radio-group>

    <dir v-if="type == '员工签到'">
      <video ref="v" @loadedmetadata="onPlay()"></video>
      <br>
      <el-button @click="initVideo">开启摄像头</el-button>
      <el-button @click="beginSign">签到</el-button>
      <el-dialog
        v-loading="loading"
        title="签到完成"
        :visible.sync="signDialogVisible"
        :before-close="handleReset"
      >{{signPerson.name}}(ID = {{signPerson.ID}})
      </el-dialog>
      <canvas ref="cvs" height="500px" width="500px" style="display: none"></canvas>
    </dir>
    <div v-else>
      <el-input v-model="ID" placeholder="ID"></el-input>
      <el-date-picker v-model="datetime" type="datetime" placeholder="选择日期时间"></el-date-picker>

      <el-button @click="aSign">签到</el-button>
    </div>
  </div>
</template>

<script>
import { sign, adminSign } from "@/api/sign";
import { getStaff } from "@/api/restful";

export default {
  created() {},
  data() {
    return {
      loading: false,
      videoSource: undefined,
      signDialogVisible: false,
      type: "补签",
      ID: undefined,
      datetime: new Date(),
      signPerson: {}
    };
  },
  methods: {
    initVideo: async function() {
      let stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 500 },
          height: { ideal: 500 }
        },
        audio: false
      }); // MediaStream
      this.$refs.v.srcObject = stream;
    },
    onPlay() {
      this.$refs.v.play();
    },
    async beginSign() {
      this.loading = true;
      this.signDialogVisible = true;

      let cvs = this.$refs["cvs"];
      let ctx = cvs.getContext("2d");
      ctx.drawImage(this.$refs.v, 0, 0);
      let dataURL = cvs.toDataURL();
      let data = await sign(dataURL);

      this.signPerson = await getStaff(data.ID);
      this.loading = false;
    },
    async aSign() {
      this.loading = true;
      await adminSign(this.ID, this.datetime);
      this.loading = false;
    },
    handleReset() {
      this.signPerson = {}
      this.signDialogVisible = false
    }
  }
};
</script>

<style>
</style>
