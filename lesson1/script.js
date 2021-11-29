const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Denim', price: 200 },
  { title: 'Shoes', price: 120 },
  { title: 'Bags', price: 230 },
];

const renderGoodsItem = ({ title = 'Title', price = 0 }) =>
  ` <div class="goods-item">
    <h3>${title}</h3>
    <p>${price}</p>
    <button class="goods-add-btn" type="button">Добавить</button>
    </div>
`

const renderGoodsList = (list) => {
  let goodsList = list.map(item => renderGoodsItem(item));
  goodsList = goodsList.join('');
  document.querySelector('.goods-list').innerHTML = goodsList;

}


renderGoodsList(goods);