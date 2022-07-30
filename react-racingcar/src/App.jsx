import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [number, setNumber] = useState(0);
  const [car, setCar] = useState("");
  const [gameResult, setgameResult] = useState(null);
  /* API 호출 상수 */
  const Random = global.MissionUtils.Random;

  /* 코드 작성 구역 */
  const handleOnChangeText = (e) => setText(e.target.value);
  const handleOnChangeNumber = (e) => setNumber(Number(e.target.value));
  
  const handleOnClickTextButton = (e) => {
    e.preventDefault();
    const name = text.split(",");
    if (isLength(name)) return alert("각각의 자동차의 이름은 6글자를 넘길 수 없습니다.");
    setCar(name);
  };

  const handleOnClickNumberButton = (e) => {
    e.preventDefault();
    if (car.length === 0) return alert("자동차 이름을 입력해주세요.");
    if (number === 0) return alert("이동 횟수를 입력해주세요.");
    playGame(car, number);
  };

  const isLength = (arr) => {
    for (let name of arr) if (name.length >= 6) return true;
    return false;
  };

  const playGame = (name, number) => {
    const result = Array.from({ length: number + 1 }, () => []);
    for (let i = 0; i < name.length; i++)
      result[0].push({ name: name[i], move: 0 });

    for (let i = 0; i < number; i++) {
      const current = result[i];
      const next = result[i + 1];
      for (let j = 0; j < name.length; j++) {
        const randomNumber = Random.pickNumberInRange(0, 9);
        if (randomNumber >= 4) next.push({ name: current[j].name, move: current[j].move + 1 });
        else next.push({ name: current[j].name, move: current[j].move });
      }
    }
    result.shift();
    setgameResult(result);
  };

  const createRoundResult = (round) => {
    return round.map((car, key) => {
      const bar = createBar(car.move);
      return (
        <div key={key}>
          <span>{car.name}: {bar}</span>
        </div>
      );
    });
  };

  const createGame = () => {
    let screen = [];
    if (gameResult === null) return;
    for (let i = 0; i < gameResult.length; i++) {
      const $br = React.createElement("br", {key: i});
      const item = createRoundResult(gameResult[i]);
      screen.push(item);
      screen.push($br);
    }
    return screen;
  };

  const createBar = (num) => {
    let result = "";
    for(let i = 0; i < num; i++) result += '-';
    return result;
  }

  const createWinner = () => {
    if (gameResult === null) return;
    const finalRound = gameResult[gameResult.length - 1];
    let max = Number.MIN_SAFE_INTEGER;
    let winner = "";
    for(let i = 0; i < finalRound.length; i++) max = Math.max(max, finalRound[i].move);
    for(let i = 0; i < finalRound.length; i++) if (finalRound[i].move === max) winner += finalRound[i].name + ',';
    return <h4>최종 우승자 : {winner.slice(0, winner.length - 1)}</h4>
  }

  return (
    <div id="app">
      <h1>🏎️ 자동차 경주 게임</h1>
      <p>
        자동차 이름을 <strong>5자 이하로</strong> 콤마로 구분하여 입력해주세요.
        <br />
        올바른 예) east,west,south,north <br />
      </p>
      <form>
        <input id="text-input" type="text" value={text} onChange={handleOnChangeText} />
        <button id="text-button" type="submit" onClick={handleOnClickTextButton} >
          입력
        </button>
      </form>
      <h4>시도할 횟수를 입력해주세요.</h4>
      <form>
        <input id="number-input" type="number" value={number} onChange={handleOnChangeNumber} />
        <button id="number-button" type="submit" onClick={handleOnClickNumberButton} >
          확인
        </button>
      </form>
      <h4>📄 실행 결과</h4>
      {createGame()}
      {createWinner()}
    </div>
  );
}

export default App;