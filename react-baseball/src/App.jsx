import React, { useState } from 'react';

/* API 호출 상수 */

function App() {
  /* 코드 작성 구역 */
  const Random = global.MissionUtils.Random;

  const [computerNumber] = useState(Random.pickUniqueNumbersInRange(1, 9, 3));
  const [playerNumber, setPlayerNumber] = useState('');
  const [isWin, setIsWin] = useState(false);
  const [comment, setComment] = useState('');

  const handleInputChange = (e) => {
    if (isTypeCheck(e.target.value)) {
      alert("숫자를 입력해주세요.");
      e.target.value = null;
      return;
    }

    if (isUnique(e.target.value)) {
      alert("중복된 숫자가 있습니다.");
      e.target.value = e.target.value.slice(0, e.target.value.length - 1);
      return;
    }

    if (isLengthCheck(e.target.value)) {
      alert("3자리 숫자만 입력해주세요.");
      e.target.value = e.target.value.slice(0, 3);
      return;
    }

    setPlayerNumber(e.target.value);
  }

  const handleSubmitOnClick = (e) => {
    e.preventDefault();
    const playerNumberToArray = [...playerNumber].map(Number);
    const ball = ballCount(computerNumber, playerNumberToArray);
    const strike = strikeCount(computerNumber, playerNumberToArray);

    if (strike === 0 && ball === 0) {
      setComment("낫싱");
    } else if (strike === 3) {
      setComment("승리");
      setIsWin(true);
    } else {
      if (strike === 0) setComment(`${ball}볼`);
      else if (ball === 0) setComment(`${strike}스트라이크`);
      else setComment(`${ball}볼 ${strike}스트라이크`);
    }
    
    /* 게임 확인 콘솔
    console.group();
    console.log("컴퓨터:", computerNumber);
    console.log("플레이어:", playerNumberToArray);
    console.log("볼", ball);
    console.log("스트라이크", strike);
    console.groupEnd();
    */
  }

  const handleResetOnClick = () => {
    const isChecked = window.confirm("게임을 다시 시작하시겠습니까?");
    if (isChecked) window.location.reload();
  }

  const isTypeCheck = (text = '') => {
    if (isNaN(text)) return true;
    else return false;
  };

  const isLengthCheck = (text = '') => {
    if (text.length > 3) return true;
    else return false;
  }

  const isUnique = (text = '') => {
    if (text.length === 0) return false;
    const head = text.slice(0, text.length - 1);
    const tail = text.slice(-1);
    if (head.includes(tail)) return true;
    else return false;
  }

  const ballCount = (computer = [], player = []) => {
    let count = 0;
    for(let i = 0; i < 3; i++) {
      if (computer[i] !== player[i] && computer.includes(player[i])) count +=1;
    }
    return count;
  }

  const strikeCount = (computer, player) => {
    let count = 0;
    for(let i = 0; i < 3; i++) {
      if (computer[i] === player[i]) count += 1;
    }
    return count;
  }

  const isResetButton = () => {
    return (isWin) ? <button id="game-restart-button" onClick={handleResetOnClick}>재시작</button> : null
  }

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
      <input type="text" id="user-input" value={playerNumber} onChange={handleInputChange} />
      <button id="submit" onClick={handleSubmitOnClick}>확인</button>
    </form>
    <h3>📄 결과</h3>
    <div id="result">{comment}</div>
    {isResetButton()}
  </div>
  );
}

export default App;