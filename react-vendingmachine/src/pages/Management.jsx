import React from "react";

function Management({ products = [], setProducts }) {

  const hanldeOnSubmit = (e) => {
    e.preventDefault();
    const result = [...products];
    const { product, price, count } = e.target;
    const priceValue = Number(price.value);
    const countValue = Number(count.value);
    if (!product.value) return alert("상품명을 입력하세요.");
    if (!price.value) return alert("가격을 입력하세요.");
    if (!count.value) return alert("수량을 입력하세요.");
    if (priceValue < 100) return alert("100 보다 작습니다.");
    if (priceValue % 10) return alert("금액은 10으로 나누어 떨어져야 합니다.");
    if (countValue <= 0) return alert("수량은 0이거나 음수가 올 수 없습니다.");
    result.push({ 
      product: product.value,
      price: price.value,
      count: count.value
    });
    setProducts(result);
  }

  const createTableData = () => {
    return products.map((item, key) => {
      return <tr key={key}>
        <td>{item.product}</td>
        <td>{item.price}</td>
        <td>{item.count}</td>
      </tr>
    });
  }

  return (
    <React.Fragment>
      <h2>상품 추가하기</h2>
      <form onSubmit={hanldeOnSubmit}>
        <input name='product' id='management-product-input' placeholder='상품명' type={"text"} />
        <input name='price' id='management-price-input' placeholder='가격' type={"number"} />
        <input name='count' id='management-count-input' placeholder='수량'type={"number"} />
        <button type='submit' id='management-submit'>추가하기</button>
      </form>
      <h2>상품 현황</h2>
      <table id='management-table'>
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody>
          {createTableData()}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default Management;