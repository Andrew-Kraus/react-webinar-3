import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item({ item, children }) {
  return (
    <div className={'Item' + (item.selected ? ' Item_selected' : '')}>
      <div className='Item-container'>
        <div className='Item-code'>{item.code}</div>
        <div className='Item-title'>{item.title}</div>
      </div>
      <div className='Item-actions'>
        <p className='Item-price'>{item.price.toLocaleString(undefined, { useGrouping: true })} ₽</p>
        {children[1]}
        {children[0]}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func,
  children: PropTypes.node,
};

Item.defaultProps = {
  onAddToCart: () => { },
}

export default React.memo(Item);
