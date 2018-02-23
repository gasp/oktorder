import React from 'react';
import PropTypes from 'prop-types';

const ProductButton = ({ name, price, add, rem, qty, stock }) => {
  if (stock < 1) {
    return (
      <div className="product-button depleted">
        <div className="name">{name} (depleted)</div>
      </div>
    );
  }

  function order(qty) {
    if (qty < 1) {
      return (
        <div className="order">
          <button onClick={add}>+</button>
        </div>
      );
    }
    return (
      <div className="order">
        <button disabled={qty < 1} onClick={rem}>-</button>
        <span className="qty">{qty}</span>
        <button onClick={add}>+</button>
      </div>
    );
  }

  return (
    <div className="product-button">
      <div className="details">
        <div className="name">{name}</div>
        <div className="price">{price / 100}&nbsp;€</div>
      </div>
      {order(qty)}
    </div>
  );
};

ProductButton.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  qty: PropTypes.number,
  stock: PropTypes.number,
  add: PropTypes.func.isRequired,
  rem: PropTypes.func.isRequired,
};

ProductButton.defaultProps = {
  qty: 0,
  stock: 0,
};

export default ProductButton;
