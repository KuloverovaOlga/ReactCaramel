import './ProductsEmpty.scss'

import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { CaramelContext } from '../../App';

function ProductsEmpty({ img, title, desc }) {
  // const {setCartOpened} = useContext(CaramelContext)

  return (
    <div className="products__empty-wrapper">
      <div className="products__empty">
        <div className="products__empty-info-box">
          <div className="products__empty-img-box">
            <img src={img} alt="" />
          </div>
          <div className="products__empty-text-box">
            <p className="products__empty-title">{title}</p>
            <p className="products__empty-desc">{desc}</p>
          </div>
        </div>
        <Link to="/">
          <button className="products__back-btn back-btn">
            <div className="products__back-btn-svg-box back-btn__svg-box">
              <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.7144 7L1.00007 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 13L1 7L7 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="products__back-btn-text back-btn__text"> Вернуться назад</p>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductsEmpty;
