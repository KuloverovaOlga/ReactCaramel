import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { CaramelContext } from '../../App';

import './Card.scss';

import plus from '../../img/plus.svg';
import add from '../../img/add.svg';

import like from '../../img/like.svg';
import likeFull from '../../img/likeFull.svg';

function Card({ img, name, price, id, unique, desc, favorite = false, thickness, length, weight, composition }) {
  const { isItemCartAdded, isItemFavoriteAdded, onAddToFavorite, onAddToCart, setCurrentItem } = useContext(CaramelContext);
  // const [isFavorite, setIsFavorite] = useState(favorite);
  const obj = { img, name, price, id, unique, desc, thickness, length, weight, composition };

  const cartClass = isItemCartAdded(obj) ? 'card__button card__button--cart isActive' : 'card__button card__button--cart';
  const favoriteClass = isItemFavoriteAdded(obj) ? 'card__button card__button--like isActive' : 'card__button card__button--like';

  const clickCartBtn = () => {
    onAddToCart(obj);
  };
  const clickFavoriteBtn = () => {
    // setIsFavorite((prev) => !prev);

    onAddToFavorite(obj);
  };

  const setCurrentObj = () => {
    setCurrentItem(obj);
    console.log(obj);
  };

  return (
    <li className="card" onClick={setCurrentObj}>
      <Link to="/card">
        <div className="card__inner">
          <button
            className={favoriteClass}
            onClick={(e) => {
              e.preventDefault();
              clickFavoriteBtn();
            }}
          >
            <div className="card__button-img-box">
              <img src={like} alt="" />
            </div>
            <div className="card__button-img-box">
              <img src={likeFull} alt="" />
            </div>
          </button>
          <div className="card__img-box">
            <img src={img} alt="" />
          </div>
          <p className="card__title">{name}</p>
          <div className="card__info-wrapper">
            <div className="card__info-box">
              <p className="card__info-title">Цена:</p>
              <p className="card__info-cost">{price} руб</p>
            </div>
            <button
              className={cartClass}
              onClick={(e) => {
                e.preventDefault();
                clickCartBtn();
              }}
            >
              <div className="card__button-img-box">
                <img src={plus} alt="" />
              </div>
              <div className="card__button-img-box">
                <img src={add} alt="" />
              </div>
            </button>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default Card;
