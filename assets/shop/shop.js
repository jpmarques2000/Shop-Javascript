const productList = document.querySelector(".product-list");
const cart = document.querySelector(".cart");
const openCart = document.querySelector(".shopping img");
const backdrop = document.querySelector(".backdrop");
const cartListItems = document.querySelector(".cartList");
const totalCart = document.querySelector(".total");
const navBar = document.querySelectorAll(".main-nav__item");
const productModal = document.querySelector(".product-modal");
const newProductInputs = productModal.querySelectorAll("input");
const confirmAddNewProduct = productModal.querySelector(".btn--sucess");
const cancelAddNewProduct = productModal.querySelector(".btn--cancel");
const cartQuantity = document.querySelector(".quantity");

const ADDQTD = "ADD";
const DECEASEQTD = "REMOVE";

class Product {
  constructor(name, image, price) {
    this.name = name;
    this.imageUrl = image;
    this.price = price;
    this.id = Math.random().toString();
    this.quantity = 0;
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
    const updatedItems = [];
    // updatedItems.push(product);
    // this.cartItems = updatedItems;
    this.cartItems.push(product);
    this.updateProductQuantity(product.id, "ADD", this.cartItems);
    // this.render();
  }

  updateProductQuantity(id, type) {
    const key = this.cartItems.findIndex((x) => x.id === id);
    if (type == ADDQTD) {
      this.cartItems[key].quantity += 1;
      this.cartItems[key].price =
        this.cartItems[key].quantity * this.cartItems[key].price;
    } else {
      this.cartItems[key].quantity -= 1;
      if (this.cartItems[key].quantity == 0) {
        delete this.cartItems[key];
      } else {
        this.cartItems[key].price =
          this.cartItems[key].quantity * this.cartItems[key].price;
      }
    }

    this.render();
  }

  render() {
    let count = 0;
    let totalPrice = 0;
    this.cartItems.forEach((cartItem, key) => {
      totalPrice += cartItem.price;
      count += cartItem.quantity;
      if (cartItem) {
        let cartItemsDiv = document.createElement("li");
        cartItemsDiv.innerHTML = `
      <div><img src="${cartItem.imageUrl}"/></div>
                <div class="cartList__itemName">${cartItem.name}</div>
                <div>R$ ${cartItem.price}</div>
                <div>
                    <button class="removeQuantityButton">-</button>
                    <div class="count">${cartItem.quantity}</div>
                    <button class="addQuantityButton" >+</button>
                </div>
      `;
        cartListItems.appendChild(cartItemsDiv);

        const removeProductButton = cartItemsDiv.querySelector(
          ".removeQuantityButton"
        );
        const addProductButton =
          cartItemsDiv.querySelector(".addQuantityButton");

        addProductButton.addEventListener(
          "click",
          this.updateProductQuantity.bind(this, cartItem.id, ADDQTD)
        );
        removeProductButton.addEventListener(
          "click",
          this.updateProductQuantity.bind(this, cartItem.id, DECEASEQTD)
        );
      }
    });
    totalCart.innerText = `Total: \R$ ${totalPrice.toFixed(2)}`;
    cartQuantity.innerText = count;
  }
}

class ProductList extends Component {
  products = [];

  constructor(renderHookId) {
    super(renderHookId, false);
    this.render();
    this.fetchProducts();

    // confirmAddNewProduct.addEventListener("click", this.addNewProductHandler);
  }

  addNewProductHandler() {
    this.productName = newProductInputs[0].value;
    this.productPrice = newProductInputs[1].value;
    this.productImageUrl = newProductInputs[2].value;
    this.products.push(
      new Product(this.productName, this.productImageUrl, this.productPrice)
    );
    this.renderProducts();

    // this.#products.push();
  }

  fetchProducts() {
    this.products = [
      new Product(
        "A Pillow",
        "https://media.wired.com/photos/5b493b6b0ea5ef37fa24f6f6/master/w_2560%2Cc_limit/meat-80049790.jpg",
        49.99
      ),
      new Product(
        "A Carpet",
        "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81W6An71HSL._SL1500_.jpg",
        89.99
      ),
      new Product(
        "A Pillow",
        "https://media.wired.com/photos/5b493b6b0ea5ef37fa24f6f6/master/w_2560%2Cc_limit/meat-80049790.jpg",
        49.99
      ),
      new Product(
        "A Carpet",
        "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81W6An71HSL._SL1500_.jpg",
        89.99
      ),
      new Product(
        "A Pillow",
        "https://media.wired.com/photos/5b493b6b0ea5ef37fa24f6f6/master/w_2560%2Cc_limit/meat-80049790.jpg",
        49.99
      ),
      new Product(
        "A Carpet",
        "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81W6An71HSL._SL1500_.jpg",
        89.99
      ),
      new Product(
        "A Pillow",
        "https://media.wired.com/photos/5b493b6b0ea5ef37fa24f6f6/master/w_2560%2Cc_limit/meat-80049790.jpg",
        49.99
      ),
      new Product(
        "A Carpet",
        "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81W6An71HSL._SL1500_.jpg",
        89.99
      ),
    ];
    this.renderProducts();
  }

  renderProducts() {
    for (const prod of this.products) {
      new ProductItem(prod, "prod-list");
    }
  }

  render() {
    // this.createRootElement("ul", "product-list", [
    //   new ElementAttribute("id", "prod-list"),
    // ]);
    if (this.products && this.products.length > 0) {
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
  }
}

openCart.addEventListener("click", function () {
  openCartModal();
});

backdrop.addEventListener("click", function () {
  closeModal();
});

cancelAddNewProduct.addEventListener("click", function () {
  closeModal();
});

navBar[1].addEventListener("click", function () {
  backdrop.classList.add("active");
  productModal.classList.add("active");
});

function closeModal() {
  cart.classList.remove("active");
  backdrop.classList.remove("active");
  productModal.classList.remove("active");
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
