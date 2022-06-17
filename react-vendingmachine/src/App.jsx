/* 아래의 주석은 지우시면 안됩니다. */
/* global MissionUtils */

import React from 'react';
// SPA 구성 라이브러리
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* API 호출 상수 */
const Random = MissionUtils.Random;

function App() {
  /* API 예시 입니다. 확인하시고 지우시면 됩니다. */
  const randomNumber = Random.pickNumberInRange(1, 10);
  console.log(randomNumber);
  /* react-router-dom으로 SPA를 App애 먼저 구성해주세요. */
  return (
    <div>
      <div id="app">처음부터 구성해보세요.</div>
    </div>
  );
}

export default App;