/*
 * @Author: tanhong
 * @Date: 2021-11-16 18:02:09
 * @LastEditTime: 2021-11-17 15:19:51
 * @LastEditors: tanhong
 * @FilePath: \WEBSOCKEY\server\index.js
 */
const Ws = require("ws");

((Ws) => {
  // ws:localhost:8000
  const server = new Ws.Server({ port: 8000 });

  const init = () => {
    bindEvent();
  };

  function bindEvent() {
    server.on("open", handleOpen);
    server.on("close", handleClose);
    server.on("error", handleError);
    server.on("connection", handleConnection);
  }

  function handleOpen() {
    console.log("webScoket open");
  }

  function handleClose() {
    console.log("webScoket close");
  }

  function handleError() {
    console.log("webScoket error");
  }

  function handleConnection(ws) {
    console.log("webScoket connection");
    ws.on("message", handleMessage);
  }

  function handleMessage(msg) {
    console.log(msg.toString());
    server.clients.forEach(function (c) {
      c.send(msg.toString());
    });
  }

  init();
})(Ws);
