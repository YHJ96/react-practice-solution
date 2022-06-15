/* 아래의 주석은 지우시면 안됩니다. */
/* global MissionUtils */

import React from 'react';

/* API 호출 상수 */
const Random = MissionUtils.Random;

function App() {

  /* API 예시 입니다. 확인하시고 지우시면 됩니다. */
  const randomNumber = Random.pickNumberInRange(1, 10);
  console.log(randomNumber);

  /* 코드 작성 구역 */
  return (
    <div id="app">
    <h1>⚾ 숫자 야구 게임</h1>
    <p>
      <strong>1~9까지의 수</strong>를 중복없이
      <strong>3개</strong> 입력해주세요. <br />
      올바른 예) 139 <br />
      틀린 예) 122
    </p>
    <form>
      <input type="text" id="user-input" />
      <button id="submit">확인</button>
    </form>
    <h3>📄 결과</h3>
    <div id="result">1볼 1스트라이크</div>
    <button id="game-restart-button">재시작</button>
  </div>
  );
}

export default App;