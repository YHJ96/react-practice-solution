import React, { useState } from "react";

function Product({ products, setProducts, coins, setCoins }) {
  const [price, setPrice] = useState(null);
  const [changes, setChanges] = useState({ 500: 0, 100: 0, 50: 0, 10: 0 });
  const returnOnClick = () => {
    let n = price;
    const newCoins = {...coins};
    const newChanges = {...changes};
    const coinKeys = Object.keys(coins).sort((a,b) => b-a);
    for(let coin of coinKeys) {
      const cnt = parseInt(n / coin);
      if (cnt > newCoins[coin]) {
        newChanges[coin] = newCoins[coin];
        n -= (coin * newCoins[coin]);
        newCoins[coin] = 0;
      } else {
        newChanges[coin] = cnt;
        newCoins[coin] = newCoins[coin] -= cnt;
        n %= coin;
      }
    }
    setCoins(newCoins);
    setChanges(newChanges);
    setPrice(0);
  }
  const handleOnClick = (e) => {
    e.preventDefault();
    if(e.target.price.value % 10) return alert("");
    if(price === null) return setPrice(e.target.price.value);
    return setPrice(Number(price) + Number(e.target.price.value));
  }
  const createproducts = () => {
    return products.map((item, index) => {

      if (item.count === 0) return <tr key={index}>
        <td>{item.product}</td>
        <td>{item.price}</td>
        <td>{item.count}</td>
        <td><button disabled>구매하기</button></td>
      </tr>

      const handleOnClick = () => {
        const result = [...products];
        result[index].count -= 1;
        if (price < result[index].price) return alert("");
        setPrice(price - result[index].price);
        setProducts(result);
      }
      return <tr key={index}>
        <td>{item.product}</td>
        <td>{item.price}</td>
        <td>{item.count}</td>
        <td><button onClick={handleOnClick}>구매하기</button></td>
      </tr>
    });
  }
  return (
    <React.Fragment>
      <h2>금액 투입</h2>
      <form onSubmit={handleOnClick}>
        <input name="price" id="product-input" />
        <button type="submit" id="product-input-button">투입하기</button>
      </form>
      <div id="product-result">투입한 금액: {price}원</div>
      <h2>구매할 수 있는 상품 현황</h2>
      <table id="product-table">
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th>구매</th>
          </tr>
        </thead>
        <tbody>
          {createproducts()}
        </tbody>
      </table>
      <h2>잔돈</h2>
      <button id="product-output-button" onClick={returnOnClick}>반환하기</button>
      <table id="product-coin-table">
        <thead>
          <tr>
            <th>동전</th>
            <th>개수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>500원</td>
            <td>{changes[500]}개</td>
          </tr>
          <tr>
            <td>100원</td>
            <td>{changes[100]}개</td>
          </tr>
          <tr>
            <td>50원</td>
            <td>{changes[50]}개</td>
          </tr>
          <tr>
            <td>10원</td>
            <td>{changes[10]}개</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default Product;