import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({ list, onAddToCart }) {

  const callbacks = {
    onAddToCart: (e, item) => {
      e.stopPropagation()
      onAddToCart(item.code)
    }
  }


  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onAddToCart={onAddToCart}>
            <button onClick={(e) => callbacks.onAddToCart(e, item)}>Добавить</button>
            {null}
          </Item>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddToCart: PropTypes.func,
};

List.defaultProps = {
  onAddToCart: () => { },
}

export default React.memo(List);
