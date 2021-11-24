/*
 * @Author: tanhong
 * @Date: 2021-11-16 16:45:03
 * @LastEditTime: 2021-11-16 18:22:52
 * @LastEditors: tanhong
 * @FilePath: \WEBSOCKEY\chat\js\entry.js
 */

;((doc,storage,location) => {


  const oUsername = doc.querySelector('#username');
  const oEnterBtn = doc.querySelector('#enter');

  const init = () => {
    bindEvent();
  }

  function bindEvent(){
    oEnterBtn.addEventListener('click', handleEnterBtnClick, false);
  }

  function handleEnterBtnClick(){
    const username = oUsername.value.trim();

    if(username.length < 6){
      alert('长度不小于6位');
      return;
    }

    storage.setItem('username',username);
    location.href = 'index.html';

  }
  
  init();

})(document,localStorage,location);