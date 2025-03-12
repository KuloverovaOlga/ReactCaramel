import '../Products.scss';

import { useState, useEffect, createContext, useContext } from 'react';
import Card from '../../components/Card/Card';
import { CaramelContext } from '../../App';
import CardLoader from '../../components/CardLoader/CardLoader';
import ProductsEmpty from '../../components/ProductsEmpty/ProductsEmpty';

import favoriteEmpty from '../../img/favoritesEmpty.webp';

function FavoriteProducts() {
  const { favoriteCaramel, isLoading } = useContext(CaramelContext);

  const renredFavoriteCaramelItems = () => {
    return isLoading
      ? [...Array(8)].map((item, i) => <CardLoader key={i} />)
      : favoriteCaramel.map((item) => (
          <Card {...item} key={item.id} loading favorite={favoriteCaramel.find((favObj) => favObj.unique === item.unique)} />
        ));
  };

  return (
    <section className="products">
      <div className="products__container container">
        <div className="products__inner-wrapper">
          {favoriteCaramel.length === 0 ? (
            <ProductsEmpty title={'Закладок нет :('} desc={'Вы ничего не добавляли в закладки'} img={favoriteEmpty} />
          ) : (
            <div className="products__inner">
              <div className="products__title-box">
                <h1 className="products__title">Мои закладки</h1>
              </div>

              <ul className="products__list">{renredFavoriteCaramelItems()}</ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default FavoriteProducts;
