<template>
  <div>
    <h1>员工签到页面</h1>
    <video ref="v" @loadedmetadata="onPlay()"></video>

    <el-button @click="beginSign">签到</el-button>

    <el-dialog v-loading="loading" title="正在签到中" :visible.sync="signDialogVisible">
    </el-dialog>

    <canvas ref="cvs" height="500px" width="500px" style="display: none"></canvas>
  </div>
</template>

<script>
import sign from "@/api/sign";

export default {
  async created() {
    await this.initVideo();
  },
  data() {
    return {
      loading: false,
      videoSource: undefined,
      signDialogVisible: false
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
      await sign(dataURL);

      this.loading = false;
    }
  }
};
</script>

<style>
</style>
