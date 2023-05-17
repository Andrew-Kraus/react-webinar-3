import React from "react";
import './style.css';
import PropTypes from "prop-types";
import Head from "../head";
import Item from "../item";
import { totalAmount } from "../../utils";

function Modal({ cart, setModal, onRemoveFromCart }) {

  const callbacks = {
    onRemoveFromCart: (e, item) => {
      e.stopPropagation()
      onRemoveFromCart(item.code)
    }
  }

  return (
    <div className='Modal'>
      <div className='Modal-container'>
        <Head title='Корзина'>
          <button className='Modal-close' onClick={() => setModal(false)}>Закрыть</button>
        </Head>
        <div className="Modal-items">
          {cart ? cart.map((item) => {
            return <Item item={item} key={item.code}>
              <button onClick={(e) => callbacks.onRemoveFromCart(e, item)}>Удалить</button>
              <p className='Modal-quantity'>{item.quantity} шт</p>
            </Item>
          }) : ''}
        </div>
        {cart.length > 0 && <p className='Modal-price'>Итого<span>{totalAmount(cart)} ₽</span></p>}
      </div>
    </div>
  )
}

Modal.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onRemoveFromCart: PropTypes.func,
  setModal: PropTypes.func,
};

Modal.defaultProps = {
  onRemoveFromCart: () => { },
  setModal: () => { },
}


export default React.memo(Modal);