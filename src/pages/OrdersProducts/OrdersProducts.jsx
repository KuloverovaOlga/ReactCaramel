import '../Products.scss';

import { useContext } from 'react';

import Card from '../../components/Card/Card';
import CardLoader from '../../components/CardLoader/CardLoader';
import ProductsEmpty from '../../components/ProductsEmpty/ProductsEmpty';
import { CaramelContext } from '../../App';

import orderEmpty from '../../img/ordersEmpty.webp';

function OrdersProducts({ orderCaramel }) {
  const { isLoading, favoriteCaramel } = useContext(CaramelContext);
  const renredOrderCaramelItems = () => {
    return isLoading ? (
      <li className="products__order-item">
        <ul className="products__list">
          {[...Array(8)].map((item, i) => (
            <CardLoader key={`item${i}`} />
          ))}
        </ul>
      </li>
    ) : (
      orderCaramel.map((item) => (
        <li className="products__order-item">
          <div className="products__order-item-header">
            <p className="products__order-item-title">Заказ #{item.id}</p>
            <p className="products__order-item-line"></p>
            <div className="products__order-item-info-box">
              <p className="products__order-item-date">{item.date}</p>
              <p className="products__order-item-time">Время {item.time}</p>
            </div>
          </div>
          <ul className="products__list">
            {item.items.map((item) => (
              <Card {...item} key={item.id} loading favorite={favoriteCaramel.find((favObj) => favObj.unique === item.unique)} />
            ))}
          </ul>
        </li>
      ))
    );
  };
  return (
    <section className="products ">
      <div className="products__container container">
        <div className="products__inner-wrapper">
          {!isLoading && orderCaramel.length === 0 ? (
            <ProductsEmpty
              title={'У вас нет заказов :('}
              desc={'Вы еще не оформили ни одного заказа в нашем магазине'}
              img={orderEmpty}
            />
          ) : (
            <div className="products__inner">
              <div className="products__title-box">
                <h1 className="products__title">Мои заказы</h1>
              </div>

              {renredOrderCaramelItems()}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default OrdersProducts;
