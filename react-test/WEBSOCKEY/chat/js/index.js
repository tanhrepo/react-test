/*
 * @Author: tanhong
 * @Date: 2021-11-16 16:45:13
 * @LastEditTime: 2021-11-17 15:41:48
 * @LastEditors: tanhong
 * @FilePath: \WEBSOCKEY\chat\js\index.js
 */
;((doc,socket,storage,location) => {

  const oList = doc.querySelector('#list');
  const oMsg = doc.querySelector('#message');
  const oSendBtn = doc.querySelector('#send');
  const ws = new socket('ws:localhost:8000');

  let username = '';

  const init = ()=> {
    bindEvent();
  }

  function bindEvent(){
    oSendBtn.addEventListener('click',handleSendBtnClick,false);
    ws.addEventListener('open',handleOpen,false);
    ws.addEventListener('close',handleClose,false);
    ws.addEventListener('error',handleError,false);
    ws.addEventListener('message',handleMessage,false);
  }

  function handleSendBtnClick(){
    console.log('send message.');

    const msg = oMsg.value;
    console.log(msg)

    if(!msg.trim().length){
      return;
    }
    
    ws.send(JSON.stringify({
      user:username,
      dataTime: new Date().getTime(),
      message:msg
    }))

    oMsg.value = ''
  }

  function handleOpen(e){
    console.log('webScoket open.',e);
    username = storage.getItem('username');
    console.log('username',username)

    if(!username){
      location.href = 'entry.html';
      return;
    }
  }

  function handleClose(e){
    console.log('webScoket close.',e);
  }

  function handleError(e){
    console.log('webScoket error.',e);
  }

  function handleMessage(e){
    console.log('webScoket message.');
    const msgData = JSON.parse(e.data)
    console.log(msgData)

    oList.appendChild(creatMsg(msgData));
  }

  function creatMsg(data){
    const {user,dataTime,message} = data;
    const oItem = doc.createElement('li');
    oItem.innerHTML = `
      <p>
        <span>${user}</span>
        <i>${ new Date(dataTime) }</i>
      </p>
      <p>消息：${ message }</p>
    `
    return oItem;
  }

  init();

})(document,WebSocket,localStorage,location)