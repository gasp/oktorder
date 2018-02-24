import React from 'react';
import PropTypes from 'prop-types';

const ProductButton = ({ add, rem, qty, stock }) => {
  if (stock < 1) {
    return <div>(depleted)</div>;
  }

  function order(qty) {
    if (qty < 1) {
      return <button onClick={add}>+</button>;
    }
    return (
      <span>
        <button disabled={qty < 1} onClick={rem}>-</button>
        <span className="qty">{qty}</span>
        <button onClick={add}>+</button>
      </span>
    );
  }

  return (
    <span className="order-button">
      {order(qty)}
    </span>
  );
};

ProductButton.propTypes = {
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
