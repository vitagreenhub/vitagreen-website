const products = [
{
id: 1,
name: "البروكلي",
image: "broccoli.jpg",
price: 170,
benefits: "غني بفيتامين C والكالسيوم",
description: "البروكلي من الخضروات الصليبية الغنية بالعناصر الغذائية."
},
{
id: 2,
name: "البنجر",
image: "beetroots.jpg",
price: 170,
benefits: "غني بمركبات نباتية مفيدة",
description: "البنجر يتميز بلونه الطبيعي وطعمه المميز."
},
{
id: 3,
name: "الفجل الأحمر",
image: "radish.jpg",
price: 170,
benefits: "غني بمضادات الأكسدة",
description: "الفجل الأحمر من النباتات ذات الطعم المميز والعناصر الغذائية المتنوعة."
},
{
id: 4,
name: "الكرنب",
image: "collardgreens.jpg",
price: 170,
benefits: "مصدر جيد للفيتامينات والمعادن",
description: "الكرنب من الخضروات الورقية التي يمكن إضافتها إلى الوجبات المختلفة."
},
{
id: 5,
name: "دوار الشمس",
image: "sunflower.jpg",
price: 170,
benefits: "يحتوي على فيتامين E",
description: "مايكروجرين دوار الشمس يتميز بطعم لطيف وقوام مميز."
},
{
id: 6,
name: "الجرجير",
image: "arugula.jpg",
price: 170,
benefits: "غني بالعناصر الغذائية",
description: "الجرجير يتميز بطعم حريف ويمكن إضافته إلى السلطات والساندويتشات."
},
{
id: 7,
name: "البقدونس",
image: "parsley.jpg",
price: 170,
benefits: "غني بالفيتامينات",
description: "البقدونس من الأعشاب الشهيرة التي تضيف نكهة مميزة للوجبات."
},
{
id: 8,
name: "الريحان",
image: "basil.jpg",
price: 170,
benefits: "عشبة عطرية مميزة",
description: "الريحان يتميز برائحته ونكهته العطرية المميزة."
},
{
id: 9,
name: "البسلة",
image: "pea.jpg",
price: 170,
benefits: "مصدر للبروتين والألياف",
description: "مايكروجرين البسلة يتميز بقوام ونكهة مناسبة للسلطات والوجبات."
},
{
id: 10,
name: "الخردل",
image: "mustard.jpg",
price: 170,
benefits: "غني بمركبات نباتية",
description: "مايكروجرين الخردل يتميز بطعم حريف ومميز."
}
];

let cart = [];

/* ==================================
عرض المنتجات
================================== */

function displayProducts() {

```
const grid = document.getElementById("products-grid");

if (!grid) return;

grid.innerHTML = "";

products.forEach(product => {

    const card = document.createElement("div");

    card.className = "product-card";

    card.innerHTML = `
        <div class="product-image">
            <img
                src="${product.image}"
                alt="مايكروجرين ${product.name}"
                loading="lazy"
                onerror="this.onerror=null; this.src='data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
                        <rect width="100%" height="100%" fill="#f0fdf4"/>
                        <text x="50%" y="50%" text-anchor="middle"
                            dominant-baseline="middle"
                            font-size="28"
                            fill="#166534">
                            🌱 ${product.name}
                        </text>
                    </svg>
                `)}';"
            >
        </div>

        <div class="product-content">

            <div class="product-name">
                ${product.name}
            </div>

            <div class="product-price">
                ${product.price} جنيه
            </div>

            <div class="product-description">
                ${product.description}
            </div>

            <div class="product-benefits">
                <strong>الفوائد:</strong>
                ${product.benefits}
            </div>

            <div class="product-footer">

                <input
                    type="number"
                    id="quantity-${product.id}"
                    class="quantity-input"
                    value="1"
                    min="1"
                    max="99"
                >

                <button
                    class="add-to-cart-btn"
                    onclick="addToCart(${product.id})">
                    أضف للسلة 🛒
                </button>

            </div>

        </div>
    `;

    grid.appendChild(card);
});
```

}

/* ==================================
إضافة للسلة
================================== */

function addToCart(id) {

```
const product = products.find(p => p.id === id);

if (!product) return;

const quantityInput = document.getElementById(`quantity-${id}`);

let quantity = parseInt(quantityInput?.value) || 1;

if (quantity < 1) quantity = 1;

const existing = cart.find(item => item.id === id);

if (existing) {

    existing.quantity += quantity;

} else {

    cart.push({
        ...product,
        quantity: quantity
    });

}

updateCartCount();

showNotification(
    `✅ تمت إضافة ${product.name} للسلة`
);
```

}

/* ==================================
تحديث كمية المنتج
================================== */

function changeQuantity(id, amount) {

```
const item = cart.find(item => item.id === id);

if (!item) return;

item.quantity += amount;

if (item.quantity <= 0) {
    removeFromCart(id);
    return;
}

updateCart();
updateCartCount();
```

}

/* ==================================
حذف المنتج
================================== */

function removeFromCart(id) {

```
cart = cart.filter(item => item.id !== id);

updateCart();
updateCartCount();
```

}

/* ==================================
حساب الإجمالي
================================== */

function calculateTotal() {

```
return cart.reduce(
    (total, item) =>
        total + (item.price * item.quantity),
    0
);
```

}

/* ==================================
عرض السلة
================================== */

function updateCart() {

```
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

if (!cartItems || !totalPrice) return;

if (cart.length === 0) {

    cartItems.innerHTML = `
        <div style="
            text-align:center;
            padding:40px 10px;
            color:#94a3b8;
        ">
            <div style="font-size:45px;">🛒</div>
            <p>السلة فارغة</p>
        </div>
    `;

    totalPrice.textContent = "0";

    return;
}


cartItems.innerHTML = "";


cart.forEach(item => {

    const itemTotal =
        item.price * item.quantity;

    const cartItem =
        document.createElement("div");

    cartItem.className = "cart-item";

    cartItem.innerHTML = `

        <div class="cart-item-info">

            <div class="cart-item-name">
                ${item.name}
            </div>

            <div class="cart-item-price">
                ${item.price} جنيه × ${item.quantity}
                =
                ${itemTotal} جنيه
            </div>

        </div>

        <div class="cart-controls">

            <button
                class="qty-btn"
                onclick="changeQuantity(${item.id}, -1)">
                −
            </button>

            <span class="qty-number">
                ${item.quantity}
            </span>

            <button
                class="qty-btn"
                onclick="changeQuantity(${item.id}, 1)">
                +
            </button>

        </div>

        <button
            class="remove-btn"
            onclick="removeFromCart(${item.id})">
            حذف
        </button>
    `;

    cartItems.appendChild(cartItem);
});


totalPrice.textContent =
    calculateTotal();
```

}

/* ==================================
عداد السلة
================================== */

function updateCartCount() {

```
const count =
    cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

const counter =
    document.getElementById("cart-count");

if (counter) {
    counter.textContent = count;
}
```

}

/* ==================================
فتح / إغلاق السلة
================================== */

function toggleCart() {

```
const modal =
    document.getElementById("cart-modal");

if (!modal) return;

modal.classList.toggle("active");

if (modal.classList.contains("active")) {
    updateCart();
}
```

}

/* ==================================
فتح الدفع
================================== */

function checkout() {

```
if (cart.length === 0) {

    alert(
        "⚠️ السلة فارغة، يرجى إضافة منتج أولاً."
    );

    return;
}

document
    .getElementById("cart-modal")
    .classList.remove("active");

document
    .getElementById("checkout-modal")
    .classList.add("active");
```

}

/* ==================================
إغلاق الدفع
================================== */

function closeCheckout() {

```
document
    .getElementById("checkout-modal")
    .classList.remove("active");
```

}

/* ==================================
إظهار InstaPay
================================== */

function setupPaymentMethod() {

```
const payment =
    document.getElementById("payment-method");

const instapayBox =
    document.getElementById("instapay-box");

if (!payment || !instapayBox) return;

payment.addEventListener("change", function () {

    if (this.value === "instapay") {

        instapayBox.style.display = "block";

    } else {

        instapayBox.style.display = "none";
    }
});
```

}

/* ==================================
إرسال الطلب عبر WhatsApp
================================== */

function submitOrder(event) {

```
event.preventDefault();


if (cart.length === 0) {

    alert("⚠️ السلة فارغة.");

    return;
}


const name =
    document.getElementById("name")
        .value.trim();

const phone =
    document.getElementById("phone")
        .value.trim();

const address =
    document.getElementById("address")
        .value.trim();

const payment =
    document.getElementById("payment-method")
        .value;

const notes =
    document.getElementById("notes")
        .value.trim();


if (!name || !phone || !address || !payment) {

    alert(
        "⚠️ يرجى إدخال جميع البيانات المطلوبة."
    );

    return;
}


const paymentName =
    payment === "instapay"
        ? "InstaPay"
        : "كاش عند الاستلام";


let message =
    "🌱 *طلب جديد من VitaGreen*%0A%0A";


message +=
    `👤 الاسم: ${name}%0A`;

message +=
    `📱 الهاتف: ${phone}%0A`;

message +=
    `📍 العنوان: ${address}%0A`;

message +=
    `💳 طريقة الدفع: ${paymentName}%0A%0A`;


message +=
    "📦 *المنتجات:*%0A";


cart.forEach(item => {

    const itemTotal =
        item.price * item.quantity;

    message +=
        `• ${item.name} × ${item.quantity} = ${itemTotal} جنيه%0A`;
});


const total =
    calculateTotal();


message +=
    `%0A💰 *الإجمالي: ${total} جنيه*`;


if (notes) {

    message +=
        `%0A%0A📝 الملاحظات: ${notes}`;
}


if (payment === "instapay") {

    message +=
        "%0A%0A💳 تم اختيار الدفع عبر InstaPay.";
}


const whatsappNumber =
    "201023666745";


const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${message}`;


window.open(
    whatsappURL,
    "_blank"
);


cart = [];

updateCart();

updateCartCount();

closeCheckout();

document
    .querySelector(".checkout-form form")
    ?.reset();

document
    .getElementById("instapay-box")
    .style.display = "none";


showNotification(
    "✅ تم تجهيز طلبك وإرساله إلى WhatsApp"
);
```

}

/* ==================================
Notification
================================== */

function showNotification(message) {

```
const old =
    document.querySelector(".notification");

if (old) old.remove();


const notification =
    document.createElement("div");

notification.className =
    "notification";

notification.textContent =
    message;


document.body.appendChild(
    notification
);


setTimeout(() => {

    notification.remove();

}, 3000);
```

}

/* ==================================
إغلاق النوافذ عند الضغط خارجها
================================== */

window.addEventListener(
"click",
function(event) {

```
    const cartModal =
        document.getElementById("cart-modal");

    const checkoutModal =
        document.getElementById("checkout-modal");


    if (event.target === cartModal) {

        cartModal.classList.remove("active");
    }


    if (event.target === checkoutModal) {

        checkoutModal.classList.remove("active");
    }
}
```

);

/* ==================================
تشغيل الموقع
================================== */

document.addEventListener(
"DOMContentLoaded",
function() {

```
    displayProducts();

    updateCartCount();

    setupPaymentMethod();
}
```

);
