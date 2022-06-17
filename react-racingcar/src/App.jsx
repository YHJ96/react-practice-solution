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
    <h1>🏎️ 자동차 경주 게임</h1>
    <p>
      자동차 이름을 <strong>5자 이하로</strong> 콤마로 구분하여 입력해주세요.
      <br />
      올바른 예) east,west,south,north <br />
    </p>
    <form>
      <input type="text" />
      <button>확인</button>
    </form>
    <h4>시도할 횟수를 입력해주세요.</h4>
    <form>
      <input type="number" />
      <button>확인</button>
    </form>
    <h4>📄 실행 결과</h4>
  </div>
  );
}

export default App;