<template>
  <div>
    Login
    <input type="text" v-model="username" placeholder="请输入用户名" />
    <button @click="handleClickBtn()">进入聊天室</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: ""
    };
  },
  methods: {
    handleClickBtn() {
      let username = this.username;

      if (username.trim().length < 6) {
        alert("用户名不能小于6位");
        return;
      }

      localStorage.setItem("username", username);

      this.$router.push("/");
    }
  }
};
</script>

<style scoped></style>