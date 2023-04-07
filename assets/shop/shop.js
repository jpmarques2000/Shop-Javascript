const productList = document.querySelector(".product-list");
const closeCart = document.querySelector(".closeCart");
const cart = document.querySelector(".cart");
const openCart = document.querySelector(".shopping img");
const backdrop = document.querySelector(".backdrop");
const cartListItems = document.querySelector(".cartList");

let products = [
  {
    id: 1,
    name: "Uma Bolacha",
    image:
      "https://w7.pngwing.com/pngs/239/673/png-transparent-chocolate-chip-cookie-wafer-milk-michel-et-augustin-cookies-pack-food-wafer-chocolate-chip-cookie.png",
    price: 5.99,
  },
  {
    id: 2,
    name: "Outro Produto",
    image:
      "https://e7.pngegg.com/pngimages/133/771/png-clipart-white-chocolate-bis-lacta-brigadeiro-12-bis-wafer-milk-chocolate.png",
    price: 12.59,
  },
  {
    id: 3,
    name: "Mais um ai",
    image:
      "https://w7.pngwing.com/pngs/667/674/png-transparent-saltine-cracker-graham-cracker-ritz-crackers-biscuit-wafer-biscuit-baked-goods-food-wafer.png",
    price: 6.99,
  },
  {
    id: 4,
    name: "Chavezona",
    image:
      "https://png.pngtree.com/png-clipart/20201223/ourmid/pngtree-screwdriver-vector-tool-cartoon-png-image_2601475.jpg",
    price: 12.99,
  },
  {
    id: 5,
    name: "Roda",
    image:
      "https://w7.pngwing.com/pngs/63/191/png-transparent-car-alloy-wheel-rim-formula-one-tyres-car-car-vehicle-transport.png",
    price: 189.99,
  },
  {
    id: 6,
    name: "CS 2",
    image: "https://trecobox.com.br/wp-content/uploads/2023/03/cs2.png",
    price: 55.0,
  },
];

closeCart.addEventListener("click", function () {
  closeModal();
});

openCart.addEventListener("click", function () {
  openCartModal();
});

backdrop.addEventListener("click", function () {
  closeModal();
});

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

    const addCartButton = productDiv.querySelector("button");
    console.log(addCartButton);
  });
}

function addToCartHandler(id) {
  if (!cartList) {
    cartList[id] = products[id];
    cartList[id].quantity = 1;
  }
  updateCart();
}

function updateProductQuantity(id, prodQuantity) {
  if (prodQuantity == 0) {
    delete cartList[id];
  } else {
    cartList[id].quantity = prodQuantity;
    cartList[id].quantity = cartList[id].price * prodQuantity;
  }
  updateCart();
}

function updateCart() {
  cartListItems.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  cartList.forEach((prod, id) => {
    totalPrice = totalPrice + prod.price;
    count = count + prod.quantity;
    if (prod) {
      let cartItemsDiv = document.createElement("li");
      cartItemsDiv.innerHTML = `
      <div><img src="${prod.image}"/></div>
                <div>${prod.name}</div>
                <div>${prod.price.toLocaleString()}</div>
                <div>
                    <button onclick="updateProductQuantity(${id}, ${
        prod.quantity - 1
      })">-</button>
                    <div class="count">${prod.quantity}</div>
                    <button onclick="updateProductQuantity(${id}, ${
        prod.quantity + 1
      })">+</button>
                </div>
      `;
    }
  });
}

function closeModal() {
  cart.classList.remove("active");
  backdrop.classList.remove("active");
}

function openCartModal() {
  cart.classList.add("active");
  backdrop.classList.add("active");
}

shopStart();
