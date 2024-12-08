import React from "react";
import { useState, useEffect } from "react";
import "./Style.css";
export default function LoadData() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disabledBtn, setDisabledBtn] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`
      );
      const result = await response.json();
      console.log(result);

      if (result && result.products && result.products.length) {
        setProducts((prevData) => [...prevData, ...result.products]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, [count]);
  useEffect(() => {
    if (products && products.length === 100) setDisabledBtn(true);
  }, [products]);

  if (loading) {
    return <div> Loading Data!! Wait</div>;
  }
  return (
    <div className="container">
      <div className="product-conatiner">
        {products && products.length
          ? products.map(
              ( item,index ) => (         //we added index to make sure that each item has individual id
                <div key={index}>
                  <img src={item.thumbnail} alt={item.title} />
                  <p>{item.title}</p>
                </div>
              )
            )
          : null}
      </div>
      <div className=" button-container ">
        <button disabled={disabledBtn} onClick={() => setCount(count + 1)}>
          {" "}
          More Products???
        </button>
      </div>
    </div>
  );
}
