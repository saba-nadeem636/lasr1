// ======================================
// PRODUCT DATA
// ======================================
const products =[
{
    id:1,
    title:"Premium Hoodie",
    price:89,
    image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
},

{
    id:2,
    title:"White Sneakers",
    price:120,
    image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
},

{
    id:3,
    title:"Luxury Watch",
    price:250,
    image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
},

{
    id:4,
    title:"Leather Bag",
    price:180,
    image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500"
},

{
    id:5,
    title:"Women's Jacket",
    price:160,
    image:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500"
},

{
    id:6,
    title:"Sunglasses",
    price:95,
    image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
},

{
    id:7,
    title:"Backpack",
    price:75,
    image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
},

{
    id:8,
    title:"Smart Headphones",
    price:199,
    image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
}
];

// ======================================
// DOM ELEMENTS
// ======================================

const productGrid = document.getElementById("productGrid");

const searchInput = document.querySelector(".search input");

const cartCount = document.getElementById("count");

const cartDrawer = document.getElementById("cartDrawer");

const closeCart = document.getElementById("closeCart");

const cartIcon = document.querySelector(".cart");

const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");

const cartTotal = document.getElementById("cartTotal");

// ======================================
// CART
// ======================================

let cart = [];

// ======================================
// DISPLAY PRODUCTS
// ======================================

function displayProducts(items){

productGrid.innerHTML="";

items.forEach(product=>{

productGrid.innerHTML+=`

<div class="product-card">

<img src="${product.image}" alt="${product.title}">

<div class="product-info">

<h3>${product.title}</h3>

<p>
Premium Quality Product
</p>

<div class="price">

$${product.price}

</div>

<button onclick="addToCart(${product.id})">

Add to Cart

</button>

</div>

</div>

`;

});

}

displayProducts(products);

// ======================================
// SEARCH
// ======================================

searchInput.addEventListener("keyup",()=>{

const value=searchInput.value.toLowerCase();

const filtered=products.filter(product=>

product.title.toLowerCase().includes(value)

);

displayProducts(filtered);

});

// ======================================
// OPEN CART
// ======================================

cartIcon.onclick=()=>{

cartDrawer.classList.add("active");

overlay.classList.add("active");

}

// ======================================
// CLOSE CART
// ======================================

closeCart.onclick=()=>{

cartDrawer.classList.remove("active");

overlay.classList.remove("active");

}

overlay.onclick=()=>{

cartDrawer.classList.remove("active");

overlay.classList.remove("active");

}
// ======================================
// ADD TO CART
// ======================================

function addToCart(id){

    const product = products.find(item => item.id === id);

    const exist = cart.find(item => item.id === id);

    if(exist){

        exist.quantity++;

    }else{

        cart.push({
            ...product,
            quantity:1
        });

    }

    updateCart();

}

// ======================================
// UPDATE CART
// ======================================

function updateCart(){

    cartItems.innerHTML = "";

    let total = 0;

    let count = 0;

    cart.forEach(item=>{

        total += item.price * item.quantity;

        count += item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}" alt="${item.title}">

            <div class="cart-info">

                <h4>${item.title}</h4>

                <p>$${item.price}</p>

                <div class="quantity">

                    <button onclick="decreaseQuantity(${item.id})">−</button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${item.id})">+</button>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeItem(${item.id})">

                    Remove

                </button>

            </div>

        </div>

        `;

    });

    cartTotal.innerText = "$" + total.toFixed(2);

    cartCount.innerText = count;

}
// ======================================
// INCREASE QUANTITY
// ======================================

function increaseQuantity(id){

    const item = cart.find(product => product.id === id);

    if(item){

        item.quantity++;

        updateCart();

    }

}

// ======================================
// DECREASE QUANTITY
// ======================================

function decreaseQuantity(id){

    const item = cart.find(product => product.id === id);

    if(!item) return;

    if(item.quantity > 1){

        item.quantity--;

    }else{

        cart = cart.filter(product => product.id !== id);

    }

    updateCart();

}

// ======================================
// REMOVE ITEM
// ======================================

function removeItem(id){

    cart = cart.filter(product => product.id !== id);

    updateCart();

}

// ======================================
// CHECKOUT BUTTON
// ======================================

const checkoutBtn = document.querySelector(".checkout-btn");

checkoutBtn.addEventListener("click",()=>{

    if(cart.length===0){

        alert("Your cart is empty!");

        return;

    }

    alert("Thank you for your purchase!");

    cart=[];

    updateCart();

    cartDrawer.classList.remove("active");

    overlay.classList.remove("active");

});

// ======================================
// QUICK VIEW MODAL
// ======================================

const quickView=document.getElementById("quickView");

const quickImage=document.getElementById("quickImage");

const quickTitle=document.getElementById("quickTitle");

const quickPrice=document.getElementById("quickPrice");

const closeQuick=document.getElementById("closeQuick");

function quickViewProduct(id){

    const product=products.find(item=>item.id===id);

    if(!product) return;

    quickImage.src=product.image;

    quickTitle.innerText=product.title;

    quickPrice.innerText="$"+product.price;

    quickView.classList.add("active");

    overlay.classList.add("active");

}

closeQuick.onclick=()=>{

    quickView.classList.remove("active");

    overlay.classList.remove("active");

}

overlay.addEventListener("click",()=>{

    quickView.classList.remove("active");

});

// ======================================
// SMOOTH SCROLL FOR SHOP NOW BUTTON
// ======================================

const shopBtn=document.querySelector(".btn");

if(shopBtn){

shopBtn.addEventListener("click",(e)=>{

e.preventDefault();

document.querySelector("#products").scrollIntoView({

behavior:"smooth"

});

});

}

// ======================================
// INITIALIZE
// ======================================

updateCart();