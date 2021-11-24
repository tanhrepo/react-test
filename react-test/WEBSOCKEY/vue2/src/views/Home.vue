<template>
  <div class="home">
    Home
    <ul>
      <li v-for="item in msgList" :key="item.id">
        <p><span>{{ item.username }}</span>  <span>{{ new Date(item.dataTime) }}</span></p>
        <p>消息：{{ item.msg }}</p>
      </li>
    </ul>

    <input type="text" v-model="msg" placeholder="请输入内容" />
    <button @click="handleSendBtnClick()">发送</button>
  </div>
</template>

<script>
// @ is an alias to /src
const ws = new WebSocket("ws://localhost:8000");

export default {
  name: "Home",
  data() {
    return {
      msg: "",
      username: "",
      msgList: [],
    };
  },
  mounted() {
    this.username = localStorage.getItem("username");
    ws.addEventListener("open", this.handleFEOpen, false);
    ws.addEventListener("close", this.handleFEClose, false);
    ws.addEventListener("error", this.handleFEError, false);
    ws.addEventListener("message", this.handleFEMessage, false);

  },
  methods: {
    handleSendBtnClick() {
      if (!this.msg.trim().length) {
        return;
      }

      ws.send(
        JSON.stringify({
          id: new Date().getTime(),
          username: this.username,
          dataTime: new Date().getTime(),
          msg: this.msg
        })
      );
    },
    handleFEOpen(e) {
      console.log("fe-open", e);
    },
    handleFEClose(e) {
      console.log("fe-Close", e);
    },
    handleFEError(e) {
      console.log("fe-Error", e);
    },
    handleFEMessage(e) {
      console.log("fe-Message", e);
      const msgData = JSON.parse(e.data);
      console.log(msgData);
      this.msgList.push(msgData);
      this.msg = "";
    }
  }
};
</script>
