const data = [
  {
    name: "product1",
    price: "30$",
    discount: "40$",
    dataPrice: "30",
    img: "./assets/images/products/product1.png",
  },
  {
    name: "product2",
    price: "40$",
    discount: "45$",
    dataPrice: "40",
    img: "./assets/images/products/product2.png",
  },
  {
    name: "product3",
    price: "55$",
    discount: "60$",
    dataPrice: "55",
    img: "./assets/images/products/product3.png",
  },
  {
    name: "product4",
    price: "70$",
    discount: "80$",
    dataPrice: "70",
    img: "./assets/images/products/product4.png",
  },
  {
    name: "product5",
    price: "60$",
    discount: "70$",
    dataPrice: "60",
    img: "./assets/images/products/product5.png",
  },
  {
    name: "product6",
    price: "80$",
    discount: "90$",
    dataPrice: "80",
    img: "./assets/images/products/product6.png",
  },
  {
    name: "product7",
    price: "35$",
    discount: "40$",
    dataPrice: "35",
    img: "./assets/images/products/product7.png",
  },
  {
    name: "product8",
    price: "45$",
    discount: "50$",
    dataPrice: "45",
    img: "./assets/images/products/product8.png",
  },
  {
    name: "product9",
    price: "78$",
    discount: "80$",
    dataPrice: "78",
    img: "./assets/images/products/product9.png",
  },
  {
    name: "product10",
    price: "90$",
    discount: "100$",
    dataPrice: "90",
    img: "./assets/images/products/product10.png",
  },
  {
    name: "product11",
    price: "74$",
    discount: "80$",
    dataPrice: "74",
    img: "./assets/images/products/product11.png",
  },
  {
    name: "product12",
    price: "90$",
    discount: "100$",
    dataPrice: "90",
    img: "./assets/images/products/product12.png",
  },
  {
    name: "product13",
    price: "60$",
    discount: "75$",
    dataPrice: "60",
    img: "./assets/images/products/product13.png",
  },
  {
    name: "product14",
    price: "90$",
    discount: "100$",
    dataPrice: "90",
    img: "./assets/images/products/product14.png",
  },
  {
    name: "product15",
    price: "70$",
    discount: "95$",
    dataPrice: "70",
    img: "./assets/images/products/product15.png",
  },
];
// Produсts
const products = document.querySelector(".product__inner-items");
if (products) {
  const productAmount = products.getAttribute("data-productAmount");
  for (let i = 0; i < data.length; i++) {
    if (i == productAmount) {
      break;
    }
    products.innerHTML += `
    <div class="productItem">
    <div class="productItem__image">
        <img src=${data[i].img} alt="">
    </div>
    <div class="productItem__info">
        <h6 class="sm" data-name= ${data[i].name}>
        ${data[i].name}
        </h6>
        <p data-price=${data[i].dataPrice}>
        ${data[i].price} <small>(Inc VAT)</small>
            <span>${data[i].discount}</span>
        </p>
        <button class="button secondary">
            <span>
                <svg>
                    <use xlink:href="#cart"></use>
                </svg>
            </span>
            Add to card
        </button>
    </div>
    </div> 
    `;
  }
}

// Counter
const counter = () => {
  const basketProduct = document.querySelectorAll(".basketProduct");
  basketProduct.forEach((product) => {
    const input = product.querySelector("input");
    const plus = product.querySelector(".plus");
    const minus = product.querySelector(".minus");
    let sum = 1;
    plus.onclick = () => {
      let inputValue = input.value;
      sum = parseInt(inputValue) + 1;
      input.value = sum;
      updateTotal();
    };
    minus.onclick = () => {
      let inputValue = input.value;
      sum = parseInt(inputValue) - 1;
      if (sum == 0) {
        sum = 1;
      }
      input.value = sum;
      updateTotal();
    };
  });
};
// Update Total
const updateTotal = () => {
  const basketProduct = document.querySelectorAll(".basketProduct");
  const totalPrice = document.querySelector(".basket__inner-total-price span");
  const cartBtn = document.querySelector("#basketButton");
  const cartBtnText = document.querySelector("#basketButton span");
  let totalAmount = 0;
  basketProduct.forEach((product) => {
    const input = product.querySelector("input");
    let amount = product.querySelector("p").getAttribute("data-price");
    let sum = parseInt(input.value) * parseInt(amount);
    totalAmount += sum;
    totalPrice.innerHTML = "$" + totalAmount;
  });
  if (basketProduct.length == 0) {
    totalPrice.innerHTML = "$" + 0;
    cartBtn.classList.remove("active");
  } else {
    cartBtn.classList.add("active");
    cartBtnText.innerHTML = basketProduct.length;
  }
};
// Remove  baseket item
const removeBasketProducts = () => {
  const basketAll = document.querySelectorAll(".basketProduct");

  basketAll.forEach((product) => {
    const removeBtn = product.querySelector(".basketProduct__removeBtn");
    removeBtn.onclick = () => {
      product.remove();
      updateTotal();
      localStorage.setItem("basket", basketProducts.outerHTML);
    };
  });
};
// Basket
const basketProducts = document.querySelector(".basket__inner-products");
const allproducts = document.querySelectorAll(".productItem");
allproducts.forEach((product) => {
  const productAdd = product.querySelector("button");
  const productImage = product.querySelector("img").getAttribute("src");
  const productPrice = product.querySelector("p").getAttribute("data-price");
  const productName = product.querySelector("h6").getAttribute("data-name");
  productAdd.onclick = () => {
    const newItem = document.createElement("div");
    newItem.classList.add("basketProduct");
    newItem.innerHTML += `
    <div class="basketProduct__image">
        <img src=${productImage} alt="">
    </div>
    <div class="basketProduct__info">
        <h6 class="extraSm" data-basketName=${productName}>
        ${productName}
        </h6>
        <p data-price=${productPrice}>
            € ${productPrice}
            <small>
                (Inc VAT)
            </small>
        </p>
    </div>
    <div class="basketProduct__counter">
        <span class="minus"></span>
        <div class="basketProduct__counter-total">
            <input type="number"  value="1">
        </div>
        <span class="plus" ></span>
    </div>
    <div class="basketProduct__removeBtn">
        <span></span>
    </div>
    `;
    basketProducts.appendChild(newItem);
    counter();
    updateTotal();
    removeBasketProducts();
    localStorage.setItem("basket", basketProducts.outerHTML);
  };
});
// Storage
function storage() {
  const basketHolder = document.querySelector(".basket__inner-products");
  let basket = localStorage.getItem("basket");
  const storage = document.querySelector(".storage");
  storage.innerHTML = basket;
  let basketItems = storage.querySelectorAll(".basketProduct");
  basketItems.forEach((item) => {
    basketHolder.appendChild(item);
  });
}

// Search
input = document.getElementById("search");
if (input) {
  const search = () => {
    allproducts.forEach((product) => {
      const productName = product.querySelector("h6").getAttribute("data-name");
      product.classList.add("remove");
      if (input.value == productName) {
        product.classList.remove("remove");
      } else if (input.value == "") {
        product.classList.remove("remove");
      }
    });
  };
  input.addEventListener("keyup", search);
}

storage();
counter();
updateTotal();
removeBasketProducts();
