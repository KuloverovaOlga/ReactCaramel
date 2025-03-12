import './CartEmpty.scss';

import { useContext } from 'react';

import { CaramelContext } from '../../App';

function ModalEmpty({img,title, desc, toggleCart}) {
// const {setCartOpened} = useContext(CaramelContext)
    
  return (
    <div className="cart__empty">
      <div className="cart__empty-info-box">
        <div className="cart__empty-img-box">
          <img src={img} alt="" />
        </div>
        <div className="cart__empty-text-box">
          <p className="cart__empty-title">{title}</p>
          <p className="cart__empty-desc">{desc}</p>
        </div>
      </div>
      <button className="cart__back-btn back-btn" onClick={toggleCart} >
        <div className="cart__back-btn-svg-box back-btn__svg-box">
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.7144 7L1.00007 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 13L1 7L7 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="cart__back-btn-text back-btn__text"> Вернуться назад</p>
      </button>
    </div>
  );
}

export default ModalEmpty;
