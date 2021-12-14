const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Denim', price: 200 },
  { title: 'Shoes', price: 120 },
  { title: 'Bags', price: 230 },
];

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
  constructor() {
    this.goods = goods;
  }
  getSum() {
    return this.goods.reduce((prev, { price }) => prev + price, 0)
  }
  render() {
    const _goods = [...this.goods];

    const _goodsItems = _goods.map((item) => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render();
    })
    document.querySelector('.goods-list').innerHTML = _goodsItems.join('');
  }
}

class Basket {
  // Добавление товара в корзину
  addToBasket() { }

  // Удаление товара из корзины
  deleteFromBasket() { }

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
