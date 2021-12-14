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
  constructor() {
    const searchbutton = document.getElementById('search');
    searchbutton.addEventListener('click', () => {
      this.filteredGoods();
    })
  }

  filteredGoods() {
    const input = document.getElementsByTagName('input')[0];
    this.filterGoods = this.goods.filter(({ title }) => {
      return new RegExp(input.value).test(title);
    });
    this.render();
  }

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
      const result = reformData(data);
      this.goods = result;
      this.filterGoods = result;
    });
  }

  render() {
    const _goods = [...this.filterGoods];
    const _goodsItems = _goods.map((item) => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render();
    })
    document.querySelector('.goods-list').innerHTML = _goodsItems.join('');
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
}

class BasketItem {
  render() { }
  setCount() { }
  deleteItem() { }
}

onload = () => {
  Vue.component('goods-item', {
    props: ['item'],
    template: `
    <div class="goods-item">
      <h3>{{item.title}}</h3>
      <p>{{item.price}}</p>
      <button class="goods-add-btn" type="button">Добавить</button>
    </div>
    `
  });

  Vue.component('basket-item', {
    props: ['item'],
    template: `
    <div class="basket-item">      
      <div>{{item.title}}</div>    
      <div>{{item.price}}</div>           
    </div>
    `
  });

  Vue.component('basket', {
    props: [''],
    data: function () {
      return {
        basketGoods: []
      }
    },
    template: `    
    <div>
    <basket-item v-for="item in basketGoods" :item="item"></basket-item>
    </div>
    `,
    mounted() {
      service(URL, BASKET_GOODS_POSTFIX).then((data) => {
        const result = reformData(data.contents);
        this.basketGoods = result;
        this.filteredGoods = result;
      });
    }
  })

  const app = new Vue({
    el: '#app',
    data: {
      goods: [],
      filteredGoods: [],
      search: '',
      isVisibleCart: false
    },
    mounted() {
      service(URL, GOODS_POSTFIX).then((data) => {
        const result = reformData(data);
        this.goods = result;
        this.filteredGoods = result;
      });
    },
    methods: {
      filter() {
        this.filteredGoods = this.goods.filter(({ title }) => {
          return new RegExp(this.search, 'i').test(title);
        });
      },
      showBasket() {
        this.isVisibleCart = true
      },
      closeBasket() {
        this.isVisibleCart = false
      }
    }
  });
}
