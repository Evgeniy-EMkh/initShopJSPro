const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Denim', price: 200 },
  { title: 'Shoes', price: 120 },
  { title: 'Bags', price: 230 },
];

const reformData = (items) => {
  return items.map(({ product_name, ...rest }) => {
    return {
      ...rest,
      title: product_name
    }
  })
}

const URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GOODS_POSTFIX = "/catalogData.json";
const BASKET_GOODS_POSTFIX = "/getBasket.json";
const ADD_GOOD_TO_BASKET_POSTFIX = "/addToBasket.json";
const DELETE_GOOD_TO_BASKET_POSTFIX = "/deleteFromBasket.json";



const service = function (url, postfix, method = "GET") {
  return new Promise((resolve, reject) => {
    fetch(`${url}${postfix}`, {
      method
    }).then((res) => {
      return res.json();
    }).then((data) => {
      resolve(data)
    })
  });
}

class GoodsItem {
  constructor({ title, price }) {
    this.title = title;
    this.price = price;
  }
  render() {
    return ` <div class="goods-item">
    <h3>${this.title}</h3>
    <p>${this.price}</p>
    <button class="goods-add-btn" type="button">Добавить</button>
    </div>
    `
  }
}

class GoodsList {

  getSum() {
    return this.goods.reduce((prev, { price }) => prev + price, 0)
  }
  // Добавление товара в корзину
  addGoodToBasket() {
    return service(URL, ADD_GOOD_TO_BASKET_POSTFIX, "POST").then((data) => {
    });
  }

  setGoods() {
    return service(URL, GOODS_POSTFIX).then((data) => {
      return reformData(data)
    });
  }

  render() {
    this.setGoods().then((data) => {
      this.goods = data;
      const _goods = [...this.goods];
      const _goodsItems = _goods.map((item) => {
        const goodsItem = new GoodsItem(item);
        return goodsItem.render();
      })
      document.querySelector('.goods-list').innerHTML = _goodsItems.join('');
    });
  }
}

class Basket {
  setGoods() {
    return service(URL, BASKET_GOODS_POSTFIX).then((data) => {
      this.goods = reformData(data.contents);
    });
  }
  // Удаление товара из корзины
  deleteGoodBasket(id) {
    return service(URL, `${DELETE_GOOD_TO_BASKET_POSTFIX}/${id}`, "DELETE").then((data) => {
    });
  }
  // Считаем стоимость и количество товаров в корзине
  calcBasket() { }
  // Рендер содержимого корзины
  render() { }
}

class BasketItem {
  render() { }
  setCount() { }
  deleteItem() { }
}

onload = () => {
  const goodsList = new GoodsList();
  goodsList.render();
}
