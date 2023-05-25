import { memo } from "react";
import './style.css';

function ProductItem({ product, addToBasket }) {
    function dateConverter(date) {
        const newDate = new Date(date);
        const year = newDate.getFullYear();
        return year.toString()
    }

    return (
        <div className='Product'>
            <p>{product.description}</p>
            <p>Страна производитель: <span>{product.madeIn?.title} {`(${product.madeIn?.code})`}</span></p>
            <p>Категория: <span>{product.category?.title}</span></p>
            <p>Год выпуска: <span>{dateConverter(product.dateCreate)}</span></p>
            <p className='Product-price'>Цена: {product.price} ₽</p>
            <button onClick={() => addToBasket(product._id)}>Добавить</button>
        </div>
    )
}

export default memo(ProductItem);