import { useState, useEffect, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import axios from 'axios';

import Header from './components/Header/Header';
import Cart from './components/Cart/Cart';

import AllProducts from './pages/AllProducts/AllProducts';
import FavoriteProducts from './pages/FavoriteProducts/FavoriteProducts';
import OrdersProducts from './pages/OrdersProducts/OrdersProducts';
import CardPage from './pages/CardPage/CardPage';

export let _apiBase = 'https://34a174ef428295ea.mokky.dev';
export let _allItems = '/allCaramel';
export let _cartItems = '/cartCaramel';
export let _favoriteItems = '/favoriteCaramel';
export let _ordersItems = '/ordersCaramel';

export const CaramelContext = createContext({});

function App() {
  const [caramel, setCaramel] = useState([]);
  const [cartCaramel, setCartCaramel] = useState([]);
  const [favoriteCaramel, setFavoriteCaramel] = useState([]);
  const [orderCaramel, setOrderCaramel] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  const [currentCost, setCurrentCost] = useState(0);
  const [cartVisible, setCartVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;

  // работа со скролом, в зависимости от открытия модального окна

  useEffect(() => {
    let scrollWith = getScrollbarWidth();

    if (cartVisible) {
      document.body.classList.add('isOpen');
      document.body.style.paddingRight = `${scrollWith}px`;
    } else {
      document.body.classList.remove(`isOpen`);
      document.body.style.paddingRight = ``;
    }
  }, [cartVisible]);

  // запрос дынных с сервера при загрузке страницы

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartItems, favoriteItems, orderItems, allItems] = await Promise.all([
          axios.get(`${_apiBase}${_cartItems}`),
          axios.get(`${_apiBase}${_favoriteItems}`),
          axios.get(`${_apiBase}${_ordersItems}`),
          axios.get(`${_apiBase}${_allItems}`)
        ]);

        setCurrentCost(cartItems.data.reduce((sum, item) => sum + item.price, 0));
        setCartCaramel(cartItems.data);
        setFavoriteCaramel(favoriteItems.data);
        setOrderCaramel(orderItems.data);
        setCaramel(allItems.data);
        setIsLoading(false);
      } catch (err) {
        alert('не удалось загрузить данные');
      }
    }
    fetchData();
  }, []);

  // корзина

  const onAddToCart = async (obj) => {
    try {
      const existingItem = cartCaramel.find((cartObj) => cartObj.unique === obj.unique);

      if (existingItem) {
        setCartCaramel((prev) => prev.filter((item) => item.unique !== obj.unique));
        setCurrentCost((prev) => prev - obj.price);
        await axios.delete(`${_apiBase}${_cartItems}/${existingItem.id}`);
      } else {
        const res = await axios.post(`${_apiBase}${_cartItems}`, obj);
        setCartCaramel((prev) => [...prev, res.data]);
        setCurrentCost((prev) => prev + res.data.price);
      }
    } catch (err) {
      alert('Не удалось добавить в корзину');
    }
  };

  const onClickRemoveCart = async (obj) => {
    try {
      setCurrentCost((prev) => prev - obj.price);
      setCartCaramel((prev) => prev.filter((item) => item.id !== obj.id));
      await axios.delete(`${_apiBase}${_cartItems}/${obj.id}`);
    } catch (err) {
      alert('Не удалось удалить из корзины');
    }
  };

  const isItemCartAdded = (item) => {
    return cartCaramel.some((cartObj) => cartObj.unique === item.unique);
  };

  // открытие модального окна

  const setCartOpened = () => {
    setCartVisible((cartVisible) => !cartVisible);
  };

  // закладки

  const onAddToFavorite = async (obj) => {
    try {
      const existingItem = favoriteCaramel.find((favObj) => favObj.unique === obj.unique);

      if (existingItem) {
        await axios.delete(`${_apiBase}${_favoriteItems}/${existingItem.id}`);
        setFavoriteCaramel((prev) => prev.filter((item) => item.unique !== obj.unique));
      } else {
        const res = await axios.post(`${_apiBase}${_favoriteItems}`, obj);
        setFavoriteCaramel((prev) => [...prev, res.data]);
      }
    } catch (err) {
      alert('Не удалось добавить в закладки');
    }
  };

  const isItemFavoriteAdded = (item) => {
    return favoriteCaramel.some((favObj) => favObj.unique === item.unique);
  };

  // фильтр

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const onClearSearchInput = () => {
    setSearchValue('');
  };

  return (
    <CaramelContext.Provider
      value={{
        caramel,
        cartCaramel,
        favoriteCaramel,
        onAddToFavorite,
        onAddToCart,
        isItemCartAdded,
        isItemFavoriteAdded,
        setCartOpened,
        currentCost,
        onClickRemoveCart,
        setCartCaramel,
        setCurrentCost,
        isLoading,
        setOrderCaramel,
        setCurrentItem
      }}
    >
      <div className="wrapper">
        <Cart isOpen={cartVisible} />
        <div className="caramel">
          <Header />
          <main className="main">
            <Routes>
              <Route
                path="/"
                element={
                  <AllProducts
                    searchValue={searchValue}
                    onChangeSearchInput={onChangeSearchInput}
                    onClearSearchInput={onClearSearchInput}
                  />
                }
              />
              <Route path="/favorite" element={<FavoriteProducts />} />
              <Route path="/orders" element={<OrdersProducts orderCaramel={orderCaramel} />} />
              <Route path="/card" element={<CardPage currentItem={currentItem} />} />
            </Routes>
          </main>
        </div>
      </div>
    </CaramelContext.Provider>
  );
}

export default App;
