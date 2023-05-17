import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural, totalAmount } from "../../utils";

function Controls({ cart, modal, setModal }) {
  return (
    <div className='Controls'>
      <p className='Controls-cart'>В корзине:
        <span className='Controls-price'>
          {cart.length ? `${cart.length} ${plural(cart.length, { one: 'товар', few: 'товара', many: 'товаров' })} / ${totalAmount(cart)} ₽` : 'пусто'}
        </span>
      </p>
      <button onClick={() => !modal ? setModal(true) : setModal(false)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  modal: PropTypes.bool,
  setModal: PropTypes.func,
};

Controls.defaultProps = {
  setModal: () => { }
};

export default React.memo(Controls);
