import React from "react";

const CartItem = ({ product }) => {
  //const [cart, setCart] = useContext(AppContext);
  //TODO: update qty


  function handleRemoveProduct(event) {
    event.preventDefault();
  }

  function handleQtyChange(event, action) {
    event.preventDefault();

  }

  return (
    <li className="cart__item">
      <figure style={{ width: "100px" }}>
        <img src={product.imageUrl} alt={product.name} width="100%" />
      </figure>
      <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </div>
      <div>
        <span style={{ display: "block" }}>{product.price} kr</span>
        <button onClick={(event) => handleRemoveProduct(event)}>Remove</button>
      </div>
      <div>
        <button
          style={{ display: "block" }}
          onClick={(event) => handleQtyChange(event, "INCREMENT")}
        >
          +
        </button>
        <button onClick={(event) => handleQtyChange(event, "INCREMENT")}>
          -
        </button>
      </div>
    </li>
  );
};

export default CartItem;
