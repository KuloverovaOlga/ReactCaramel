import './Cart.scss';

import axios from 'axios';

import { useState, useEffect, useContext } from 'react';

import empty from '../../img/cartEmpty.webp';
import sucsess from '../../img/orderSucsess.webp';

import { _apiBase, _ordersItems, _cartItems } from '../../App';

import { CaramelContext } from '../../App';

import CartItemCaramel from '../CartItemCaramel/CartItemCaramel';
import CartEmpty from '../CartEmpty/CartEmpty';

function Cart({ isOpen }) {
  const { cartCaramel, setCartOpened, currentCost, setCartCaramel, setCurrentCost, setOrderCaramel } =
    useContext(CaramelContext);

  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState(0);

  const toggleCart = () => {
    setCartOpened();
    setTimeout(() => {
      setIsOrderComplete(false);
    }, 500);
  };

  const modalClass = isOpen ? 'cart isOpen' : 'cart';
  const onClickOrderBtn = async () => {
    try {
      setIsLoading(true);
      setIsOrderComplete(true);
      const { data } = await axios.post(`${_apiBase}${_ordersItems}`, {
        items: cartCaramel,
        date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      });
      setOrderId(data.id);
      setOrderCaramel((prev) => [...prev, data]);
      await Promise.all(cartCaramel.map((item) => axios.delete(`${_apiBase}${_cartItems}/${item.id}`)));

      setCartCaramel([]);
      setCurrentCost(0);
      setIsLoading(false);
    } catch (err) {
      alert('Не удалось оформить заказ');
    }
  };

  return (
    <div className={modalClass} onClick={toggleCart}>
      <div className="cart__content" onClick={(e) => e.stopPropagation()}>
        <div className="cart__title-box">
          <p className="cart__title">Корзина</p>
          <button className="cart__close-btn" onClick={toggleCart}>
            <div className="cart__close-svg-box">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.0799 7.61553L6.6311 5.16673L9.07982 2.71801C10.0241 1.77376 8.55964 0.309342 7.6154 1.25359L5.16668 3.70231L2.71787 1.2535C1.77384 0.309466 0.309467 1.77384 1.2535 2.71787L3.70231 5.16668L1.25359 7.61539C0.309343 8.55964 1.77376 10.0241 2.71801 9.07982L5.16673 6.6311L7.61553 9.0799C8.55969 10.0241 10.0241 8.55969 9.0799 7.61553Z"
                  fill="#B5B5B5"
                />
              </svg>
            </div>
          </button>
        </div>

        <div className="cart__info-box">
          {cartCaramel.length > 0 ? (
            <>
              <ul className="cart__cart-items">
                {cartCaramel.map((item) => (
                  <CartItemCaramel {...item} key={item.id} />
                ))}
              </ul>

              <div className="cart__footer">
                <ul className="cart__cart-price-list">
                  <li className="cart__cart-price-item">
                    <p className="cart__cart-price-title">Итого: </p>
                    <div className="cart__cart-price-line"></div>
                    <p className="cart__cart-price-num">{currentCost} руб. </p>
                  </li>
                  <li className="cart__cart-price-item">
                    <p className="cart__cart-price-title">Налог 5%: </p>
                    <div className="cart__cart-price-line"></div>
                    <p className="cart__cart-price-num">{(currentCost * 0.05).toFixed(2)} руб. </p>
                  </li>
                </ul>
                <button disabled={isLoading} className="cart__cart-order-btn" onClick={onClickOrderBtn}>
                  <p className="cart__cart-order-btn-text">Оформить заказ</p>
                  <div className="cart__cart-order-btn-svg-box">
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 7H14.7143" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        d="M8.71436 1L14.7144 7L8.71436 13"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </>
          ) : (
            <CartEmpty
              toggleCart={toggleCart}
              title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
              desc={
                isOrderComplete
                  ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                  : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
              }
              img={isOrderComplete ? sucsess : empty}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
