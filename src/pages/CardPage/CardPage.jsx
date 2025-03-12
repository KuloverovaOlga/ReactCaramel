import './CardPage.scss';

import { useState, useEffect, createContext, useContext } from 'react';

import { Link } from 'react-router-dom';

import { CaramelContext } from '../../App';
import ProductsEmpty from '../../components/ProductsEmpty/ProductsEmpty';

import orderEmpty from '../../img/ordersEmpty.webp';
import like from '../../img/like.svg';
import likeFull from '../../img/likeFull.svg';

function CardPage({ currentItem }) {
  const { onAddToFavorite, onAddToCart, isItemCartAdded, isItemFavoriteAdded } = useContext(CaramelContext);

  const cartClass = isItemCartAdded(currentItem)
    ? 'card-page__button  card-page__button--cart isActive'
    : 'card-page__button  card-page__button--cart';
  const favoriteClass = isItemFavoriteAdded(currentItem)
    ? 'card-page__button card__button card-page__button--like card__button--like isActive'
    : 'card-page__button card__button card-page__button--like card__button--like';

  return (
    <section className="card-page">
      <div className="card-page__container container">
        <div className="card-page__inner">
          {Object.keys(currentItem).length !== 0 ? (
            <>
              <Link to="/">
                <button className="card-page__back-btn back-btn">
                  <div className="card-page__back-btn-svg-box back-btn__svg-box">
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14.7144 7L1.00007 7"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M7 13L1 7L7 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
              </Link>

              <div className="card-page__card-content">
                <div className="card-page__img-box">
                  <img src={currentItem.img} alt={currentItem.name} />
                </div>
                <div className="card-page__content-box">
                  <h1 className="card-page__title">{currentItem.name}</h1>

                  <div className="card-page__content-info-box">
                    <div className="card-page__price-box">
                      <p className="card-page__price">{currentItem.price} руб.</p>
                      <button className={favoriteClass} onClick={() => onAddToFavorite(currentItem)}>
                        <div className="card-page__button-img-box card__button-img-box">
                          <img src={like} alt="" />
                        </div>
                        <div className="card-page__button-img-box card__button-img-box">
                          <img src={likeFull} alt="" />
                        </div>
                      </button>
                    </div>

                    <button className={cartClass} onClick={() => onAddToCart(currentItem)}>
                      {isItemCartAdded(currentItem) ? 'Удалить из корзины' : 'Добавить в корзину'}
                    </button>
                  </div>
                  <div className="card-page__desc-wrapper">
                    <p className="card-page__desc-title">Характеристики:</p>
                    <div className="card-page__desc-inner">
                      <ul className="card-page__desc-list">
                        {currentItem.desc &&
                          currentItem.desc.map((item, index) => (
                            <li key={index} className="card-page__desc-item">
                              {item}
                            </li>
                          ))}
                      </ul>
                      <div className="card-page__desc-info-list">
                        <p className="card-page__desc-info">
                          <span>Толщина нити:</span> {currentItem.thickness || '-'}
                        </p>
                        <p className="card-page__desc-info">
                          <span>Длина:</span> {currentItem.length || '-'}
                        </p>
                        <p className="card-page__desc-info">
                          <span>Вес:</span> {currentItem.weight || '-'}
                        </p>
                        <p className="card-page__desc-info">
                          <span>Состав:</span> {currentItem.composition || '-'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // <div className="card-page__loading">Не выбранна карточка товара</div> // Показываем текст "Загрузка...", если объект пуст

            <ProductsEmpty
              title={'Не выбрана карточка товара :('}
              desc={'Для простмотра дополнительной информации выберите пожалуйста карточку товара из общего списка'}
              img={orderEmpty}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default CardPage;
