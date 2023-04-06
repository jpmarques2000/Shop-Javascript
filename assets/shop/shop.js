const productList = document.querySelector(".product-list");
console.log(productList);

let products = [
  {
    id: 1,
    name: "Uma Bolacha",
    image: "https://w7.pngwing.com/pngs/239/673/png-transparent-chocolate-chip-cookie-wafer-milk-michel-et-augustin-cookies-pack-food-wafer-chocolate-chip-cookie.png",
    price: 5.99,
  },
  {
    id: 2,
    name: "Outro Produto",
    image: "https://e7.pngegg.com/pngimages/133/771/png-clipart-white-chocolate-bis-lacta-brigadeiro-12-bis-wafer-milk-chocolate.png",
    price: 12.59,
  },
  {
    id: 3,
    name: "Mais um ai",
    image: "https://w7.pngwing.com/pngs/667/674/png-transparent-saltine-cracker-graham-cracker-ritz-crackers-biscuit-wafer-biscuit-baked-goods-food-wafer.png",
    price: 6.99,
  },
  {
    id: 4,
    name: "Chavezona",
    image: "https://png.pngtree.com/png-clipart/20201223/ourmid/pngtree-screwdriver-vector-tool-cartoon-png-image_2601475.jpg",
    price: 12.99,
  },
  {
    id: 5,
    name: "Roda",
    image: "https://w7.pngwing.com/pngs/63/191/png-transparent-car-alloy-wheel-rim-formula-one-tyres-car-car-vehicle-transport.png",
    price: 189.99,
  },
  {
    id: 6,
    name: "CS 2",
    image: "https://trecobox.com.br/wp-content/uploads/2023/03/cs2.png",
    price: 55.00,
  },
];

let cartList = [];

function shopStart() {
  products.forEach((product) => {
    let productDiv = document.createElement("div");
    productDiv.classList.add("product-item");
    productDiv.innerHTML = `
    <img src="${product.image}">
    <div class="product__title">${product.name}</div>
    <div class="product__price">R$ ${product.price}</div>
    <button class="product__button">Add to Cart</button>`;
    productList.append(productDiv);
  });
}
shopStart();
