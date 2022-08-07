import React from 'react'
import { useState } from 'react';

function Charge({ coins, setCoins }) {
  const Random = global.MissionUtils.Random;
  const [ price, setPrice ] = useState(null);

  const handleOnClick = (e) => {
    e.preventDefault();
    if (e.target.price.value % 10) return alert("금액은 10원으로 나누어 떨어지지 않으면 불가능 합니다.");
    const coin = createCoin(Number(e.target.price.value));
    if (price === null) {
      setPrice(e.target.price.value);
      return setCoins(coin);
    }
    const add = Number(price) + Number(e.target.price.value);
    setPrice(add);
    setCoins(coin);
  };
  
  const createPrice = () => {
    if(price === null) return;
    return price + '원';
  }

  const createCoin = (price) => {
    const result = {...coins};
    const coinKey = Object.keys(coins).map(Number).sort((a,b) => b-a);
    for(let coin of coinKey) {
      if (coin === 10) {
        result[coin] = result[coin] + (price / coin);
        break;
      }
      const randomNumber = Random.pickNumberInRange(0, parseInt(price / coin));
      price -= (randomNumber * coin);
      result[coin] = result[coin] + randomNumber;
    }
    return result;
  }
  
  return (
    <React.Fragment>
      <h2>자판기 동전 충전하기</h2>
      <form onSubmit={handleOnClick}>
        <input name='price' id='charge-input' type={"number"}/>
        <button type="submit" id='charge-button'>충전하기</button>
      </form>
      <div id='charge-result'>보유 금액: {createPrice()}</div>
      <h2>동전 보유 현황</h2>
      <table id='charge-table'>
        <thead>
          <tr>
            <th>동전</th>
            <th>개수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>500원</td>
            <td>{coins["500"]}개</td>
          </tr>
          <tr>
            <td>100원</td>
            <td>{coins["100"]}개</td>
          </tr>
          <tr>
            <td>50원</td>
            <td>{coins["50"]}개</td>
          </tr>
          <tr>
            <td>10원</td>
            <td>{coins["10"]}개</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default Charge;