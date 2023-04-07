const productList = document.querySelector(".product-list");
const closeCart = document.querySelector(".closeCart");
const cart = document.querySelector(".cart");
const openCart = document.querySelector(".shopping img");
const backdrop = document.querySelector(".backdrop");
const cartListItems = document.querySelector(".cartList");

class Product {
  constructor(name, image, price, id) {
    this.name = name;
    this.imageUrl = image;
    this.price = price;
    this.id = id;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];
  cartItems = [];

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId, false);
    this.render();
  }

  addProduct(product) {
     const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  updateProductQuantity(id, prodQuantity) {
    if (prodQuantity == 0) {
      delete cartList[id];
    } else {
      cartList[id].quantity = prodQuantity;
      cartList[id].quantity = cartList[id].price * prodQuantity;
    }
    updateCart();
  }

  render() {
    let cartItemsDiv = document.createElement("li");
    cartItemsDiv.innerHTML = `
      <div><img src="${this.cartItems.image}"/></div>
                <div>${this.cartItems.name}</div>
                <div>${this.cartItems.price}</div>
                <div>
                    <button onclick="updateProductQuantity(${
                      this.cartItems.id
                    }, ${this.cartItems.quantity - 1})">-</button>
                    <div class="count">${this.cartItems.quantity}</div>
                    <button onclick="updateProductQuantity(${
                      this.cartItems.id
                    }, ${this.cartItems.quantity + 1})">+</button>
                </div>
      `;
    const addProductButton = cartItemsDiv.querySelector("button");
    addProductButton.addEventListener("click", this.updateProductQuantity);
  }
}

class ProductList extends Component {
  #products = [];

  constructor(renderHookId) {
    super(renderHookId, false);
    this.render();
    this.fetchProducts();
  }

  fetchProducts() {
    this.#products = [
      new Product(
        "A Pillow",
        "https://media.wired.com/photos/5b493b6b0ea5ef37fa24f6f6/master/w_2560%2Cc_limit/meat-80049790.jpg",
        49.99,
        1
      ),
      new Product(
        "A Carpet",
        "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81W6An71HSL._SL1500_.jpg",
        89.99,
        2
      ),
      new Product(
        "A Pillow",
        "https://media.wired.com/photos/5b493b6b0ea5ef37fa24f6f6/master/w_2560%2Cc_limit/meat-80049790.jpg",
        49.99,
        3
      ),
      new Product(
        "A Carpet",
        "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81W6An71HSL._SL1500_.jpg",
        89.99,
        4
      ),
      new Product(
        "A Pillow",
        "https://media.wired.com/photos/5b493b6b0ea5ef37fa24f6f6/master/w_2560%2Cc_limit/meat-80049790.jpg",
        49.99,
        5
      ),
      new Product(
        "A Carpet",
        "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81W6An71HSL._SL1500_.jpg",
        89.99,
        6
      ),
      new Product(
        "A Pillow",
        "https://media.wired.com/photos/5b493b6b0ea5ef37fa24f6f6/master/w_2560%2Cc_limit/meat-80049790.jpg",
        49.99,
        7
      ),
      new Product(
        "A Carpet",
        "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81W6An71HSL._SL1500_.jpg",
        89.99,
        8
      ),
    ];
    this.renderProducts();
  }

  renderProducts() {
    for (const prod of this.#products) {
      new ProductItem(prod, "prod-list");
    }
  }

  render() {
    // this.createRootElement("ul", "product-list", [
    //   new ElementAttribute("id", "prod-list"),
    // ]);
    if (this.#products && this.#products.length > 0) {
      this.renderProducts();
    }
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    let productEl = document.createElement("div");
    productEl.classList.add("product-item");
    productEl.innerHTML = `
    <img src="${this.product.imageUrl}">
    <div class="product__title">${this.product.name}</div>
    <div class="product__price">R$ ${this.product.price}</div>
    <button class="product__button">Add to Cart</button>`;
    productList.append(productEl);

    const addCartButton = productEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this));
    console.log(this);
  }
}

closeCart.addEventListener("click", function () {
  closeModal();
});

openCart.addEventListener("click", function () {
  openCartModal();
});

backdrop.addEventListener("click", function () {
  closeModal();
});

function closeModal() {
  cart.classList.remove("active");
  backdrop.classList.remove("active");
}

function openCartModal() {
  cart.classList.add("active");
  backdrop.classList.add("active");
}

class Shop {
  constructor() {
    this.render();
  }

  render() {
    this.cart = new ShoppingCart("app");
    new ProductList("app");
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();

// let products = [
//   {
//     id: 1,
//     name: "Uma Bolacha",
//     image:
//       "https://w7.pngwing.com/pngs/239/673/png-transparent-chocolate-chip-cookie-wafer-milk-michel-et-augustin-cookies-pack-food-wafer-chocolate-chip-cookie.png",
//     price: 5.99,
//   },
//   {
//     id: 2,
//     name: "Outro Produto",
//     image:
//       "https://e7.pngegg.com/pngimages/133/771/png-clipart-white-chocolate-bis-lacta-brigadeiro-12-bis-wafer-milk-chocolate.png",
//     price: 12.59,
//   },
//   {
//     id: 3,
//     name: "Mais um ai",
//     image:
//       "https://w7.pngwing.com/pngs/667/674/png-transparent-saltine-cracker-graham-cracker-ritz-crackers-biscuit-wafer-biscuit-baked-goods-food-wafer.png",
//     price: 6.99,
//   },
//   {
//     id: 4,
//     name: "Chavezona",
//     image:
//       "https://png.pngtree.com/png-clipart/20201223/ourmid/pngtree-screwdriver-vector-tool-cartoon-png-image_2601475.jpg",
//     price: 12.99,
//   },
//   {
//     id: 5,
//     name: "Roda",
//     image:
//       "https://w7.pngwing.com/pngs/63/191/png-transparent-car-alloy-wheel-rim-formula-one-tyres-car-car-vehicle-transport.png",
//     price: 189.99,
//   },
//   {
//     id: 6,
//     name: "CS 2",
//     image: "https://trecobox.com.br/wp-content/uploads/2023/03/cs2.png",
//     price: 55.0,
//   },
// ];

// closeCart.addEventListener("click", function () {
//   closeModal();
// });

// openCart.addEventListener("click", function () {
//   openCartModal();
// });

// backdrop.addEventListener("click", function () {
//   closeModal();
// });

// let cartList = [];

// function shopStart() {
//   products.forEach((product) => {
//     let productDiv = document.createElement("div");
//     productDiv.classList.add("product-item");
//     productDiv.innerHTML = `
//     <img src="${product.image}">
//     <div class="product__title">${product.name}</div>
//     <div class="product__price">R$ ${product.price}</div>
//     <button class="product__button">Add to Cart</button>`;
//     productList.append(productDiv);

//     const addCartButton = productDiv.querySelector("button");
//     console.log(addCartButton);
//   });
// }

// function addToCartHandler(id) {
//   if (!cartList) {
//     cartList[id] = products[id];
//     cartList[id].quantity = 1;
//   }
//   updateCart();
// }

// function updateProductQuantity(id, prodQuantity) {
//   if (prodQuantity == 0) {
//     delete cartList[id];
//   } else {
//     cartList[id].quantity = prodQuantity;
//     cartList[id].quantity = cartList[id].price * prodQuantity;
//   }
//   updateCart();
// }

// function updateCart() {
//   cartListItems.innerHTML = "";
//   let count = 0;
//   let totalPrice = 0;
//   cartList.forEach((prod, id) => {
//     totalPrice = totalPrice + prod.price;
//     count = count + prod.quantity;
//     if (prod) {
//       let cartItemsDiv = document.createElement("li");
//       cartItemsDiv.innerHTML = `
//       <div><img src="${prod.image}"/></div>
//                 <div>${prod.name}</div>
//                 <div>${prod.price.toLocaleString()}</div>
//                 <div>
//                     <button onclick="updateProductQuantity(${id}, ${
//         prod.quantity - 1
//       })">-</button>
//                     <div class="count">${prod.quantity}</div>
//                     <button onclick="updateProductQuantity(${id}, ${
//         prod.quantity + 1
//       })">+</button>
//                 </div>
//       `;
//     }
//   });
// }

// function closeModal() {
//   cart.classList.remove("active");
//   backdrop.classList.remove("active");
// }

// function openCartModal() {
//   cart.classList.add("active");
//   backdrop.classList.add("active");
// }

// shopStart();
