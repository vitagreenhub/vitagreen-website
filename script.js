```javascript
/* =========================================================
   VitaGreen
   Main JavaScript
========================================================= */


/* =========================================================
   إعدادات الموقع
========================================================= */

const WHATSAPP_NUMBER = "201023666745";

const INSTAPAY_URL =
    "https://ipn.eg/S/yassersherif1/instapay/7CCnY2";

const IMAGE_BASE_URL =
    "https://raw.githubusercontent.com/vitagreenhub/vitagreen-website/main/";


/* =========================================================
   المنتجات
========================================================= */

const products = [

    {
        id: 1,
        name: "البروكلي",
        image: "broccoli.jpg",
        price: 170,
        benefits: "غني بفيتامين C والكالسيوم",
        description:
            "البروكلي من الخضروات الصليبية الغنية بالعناصر الغذائية."
    },

    {
        id: 2,
        name: "البنجر",
        image: "beetroots.jpg",
        price: 170,
        benefits: "غني بالعناصر الغذائية",
        description:
            "البنجر يتميز بلونه الطبيعي ومذاقه المميز."
    },

    {
        id: 3,
        name: "الفجل الأحمر",
        image: "radish.jpg",
        price: 170,
        benefits: "غني بمضادات الأكسدة",
        description:
            "الفجل الأحمر غني بالفيتامينات والعناصر الغذائية."
    },

    {
        id: 4,
        name: "الكرنب",
        image: "collardgreens.jpg",
        price: 170,
        benefits: "غني بالفيتامينات والمعادن",
        description:
            "الكرنب مصدر جيد لمجموعة متنوعة من العناصر الغذائية."
    },

    {
        id: 5,
        name: "دوار الشمس",
        image: "sunflower.jpg",
        price: 170,
        benefits: "غني بفيتامين E",
        description:
            "دوار الشمس يتميز بمحتواه من الدهون الصحية والعناصر الغذائية."
    },

    {
        id: 6,
        name: "الجرجير",
        image: "arugula.jpg",
        price: 170,
        benefits: "غني بالعناصر الغذائية",
        description:
            "الجرجير من الخضروات الورقية ذات الطعم المميز."
    },

    {
        id: 7,
        name: "البقدونس",
        image: "parsley.jpg",
        price: 170,
        benefits: "غني بالفيتامينات",
        description:
            "البقدونس من الأعشاب الغنية بالعناصر الغذائية."
    },

    {
        id: 8,
        name: "الريحان",
        image: "basil.jpg",
        price: 170,
        benefits: "عشبة عطرية مميزة",
        description:
            "الريحان يتميز برائحته ونكهته العطرية المميزة."
    },

    {
        id: 9,
        name: "البسلة",
        image: "pea.jpg",
        price: 170,
        benefits: "غنية بالبروتين والألياف",
        description:
            "البسلة مصدر جيد للبروتين النباتي والألياف."
    },

    {
        id: 10,
        name: "الخردل",
        image: "mustard.jpg",
        price: 170,
        benefits: "غني بالعناصر الغذائية",
        description:
            "الخردل يتميز بطعمه القوي والمميز."
    }

];


/* =========================================================
   Cart
========================================================= */

let cart = [];


/* =========================================================
   تحميل السلة
========================================================= */

function loadCart() {

    try {

        const savedCart =
            localStorage.getItem("vitagreen_cart");

        if (savedCart) {

            const parsedCart =
                JSON.parse(savedCart);

            if (Array.isArray(parsedCart)) {
                cart = parsedCart;
            }
        }

    } catch (error) {

        console.error(
            "حدث خطأ أثناء تحميل السلة:",
            error
        );

        cart = [];
    }

    updateCartCount();
}


/* =========================================================
   حفظ السلة
========================================================= */

function saveCart() {

    try {

        localStorage.setItem(
            "vitagreen_cart",
            JSON.stringify(cart)
        );

    } catch (error) {

        console.error(
            "تعذر حفظ السلة:",
            error
        );
    }
}


/* =========================================================
   عرض المنتجات
========================================================= */

function displayProducts() {

    const grid =
        document.getElementById("products-grid");

    if (!grid) return;

    grid.innerHTML = "";


    products.forEach(product => {

        const card =
            document.createElement("article");

        card.className = "product-card";


        card.innerHTML = `

            <div
                class="product-image"
                style="
                    background-image:
                    url('${IMAGE_BASE_URL}${product.image}');
                "
                role="img"
                aria-label="${product.name}">
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

                    <strong>
                        المميزات:
                    </strong>

                    ${product.benefits}

                </div>


                <div class="product-footer">

                    <input
                        type="number"
                        class="quantity-input"
                        id="quantity-${product.id}"
                        value="1"
                        min="1"
                        max="99"
                        aria-label="كمية ${product.name}">


                    <button
                        type="button"
                        class="add-to-cart-btn"
                        onclick="addToCart(${product.id})">

                        أضف للسلة 🛒

                    </button>

                </div>

            </div>
        `;


        grid.appendChild(card);

    });
}


/* =========================================================
   إضافة منتج
========================================================= */

function addToCart(id) {

    const product =
        products.find(
            item => item.id === id
        );

    if (!product) return;


    const quantityInput =
        document.getElementById(
            `quantity-${id}`
        );


    let quantity =
        parseInt(
            quantityInput?.value || 1,
            10
        );


    if (
        isNaN(quantity) ||
        quantity < 1
    ) {
        quantity = 1;
    }


    if (quantity > 99) {
        quantity = 99;
    }


    const existing =
        cart.find(
            item => item.id === id
        );


    if (existing) {

        existing.quantity += quantity;

        if (existing.quantity > 99) {
            existing.quantity = 99;
        }

    } else {

        cart.push({
            ...product,
            quantity: quantity
        });
    }


    saveCart();

    updateCart();

    updateCartCount();


    /* إعادة الكمية إلى 1 */

    if (quantityInput) {
        quantityInput.value = 1;
    }


    showNotification(
        `✅ تمت إضافة ${product.name} للسلة`
    );
}


/* =========================================================
   تغيير الكمية
========================================================= */

function changeQuantity(id, change) {

    const item =
        cart.find(
            product => product.id === id
        );

    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        removeFromCart(id);

        return;
    }


    if (item.quantity > 99) {
        item.quantity = 99;
    }


    saveCart();

    updateCart();

    updateCartCount();
}


/* =========================================================
   حذف منتج
========================================================= */

function removeFromCart(id) {

    const item =
        cart.find(
            product => product.id === id
        );


    cart =
        cart.filter(
            product => product.id !== id
        );


    saveCart();

    updateCart();

    updateCartCount();


    if (item) {

        showNotification(
            `🗑️ تم حذف ${item.name} من السلة`
        );
    }
}


/* =========================================================
   حساب الإجمالي
========================================================= */

function getCartTotal() {

    return cart.reduce(
        (total, item) => {

            return total +
                (item.price * item.quantity);

        },
        0
    );
}


/* =========================================================
   تحديث السلة
========================================================= */

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const totalPrice =
        document.getElementById("total-price");


    if (!cartItems || !totalPrice) {
        return;
    }


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p style="
                text-align:center;
                padding:30px;
                color:#999;
            ">

                السلة فارغة 🛒

            </p>

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

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <div class="cart-item-name">
                    ${item.name}
                </div>

                <div class="cart-item-price">
                    ${item.price} جنيه ×
                    ${item.quantity}
                    =
                    ${itemTotal} جنيه
                </div>

            </div>


            <div class="cart-quantity-controls">

                <button
                    type="button"
                    class="quantity-btn"
                    onclick="changeQuantity(${item.id}, -1)"
                    aria-label="تقليل الكمية">

                    −

                </button>


                <strong>
                    ${item.quantity}
                </strong>


                <button
                    type="button"
                    class="quantity-btn"
                    onclick="changeQuantity(${item.id}, 1)"
                    aria-label="زيادة الكمية">

                    +

                </button>


                <button
                    type="button"
                    class="remove-btn"
                    onclick="removeFromCart(${item.id})">

                    حذف

                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    totalPrice.textContent =
        getCartTotal();
}


/* =========================================================
   عدد المنتجات
========================================================= */

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");

    if (!cartCount) return;


    const count =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    cartCount.textContent =
        count;
}


/* =========================================================
   فتح / إغلاق السلة
========================================================= */

function toggleCart() {

    const modal =
        document.getElementById("cart-modal");

    if (!modal) return;


    modal.classList.toggle("active");


    if (
        modal.classList.contains("active")
    ) {

        updateCart();
    }
}


/* =========================================================
   Checkout
========================================================= */

function checkout() {

    if (cart.length === 0) {

        showNotification(
            "⚠️ السلة فارغة! أضف منتجًا أولاً"
        );

        return;
    }


    document
        .getElementById("cart-modal")
        .classList.remove("active");


    document
        .getElementById("checkout-modal")
        .classList.add("active");
}


/* =========================================================
   إغلاق Checkout
========================================================= */

function closeCheckout() {

    document
        .getElementById("checkout-modal")
        .classList.remove("active");
}


/* =========================================================
   InstaPay
========================================================= */

function handlePaymentMethod() {

    const paymentMethod =
        document.getElementById(
            "payment-method"
        );

    const instapayBox =
        document.getElementById(
            "instapay-box"
        );


    if (
        !paymentMethod ||
        !instapayBox
    ) {
        return;
    }


    if (
        paymentMethod.value ===
        "instapay"
    ) {

        instapayBox.style.display =
            "block";

    } else {

        instapayBox.style.display =
            "none";
    }
}


/* =========================================================
   التحقق من الهاتف المصري
========================================================= */

function validatePhone(phone) {

    const normalizedPhone =
        phone.replace(/\s+/g, "");


    const egyptianPhoneRegex =
        /^(010|011|012|015)[0-9]{8}$/;


    return egyptianPhoneRegex.test(
        normalizedPhone
    );
}


/* =========================================================
   إرسال الطلب
========================================================= */

function submitOrder(event) {

    event.preventDefault();


    const name =
        document
            .getElementById("name")
            .value
            .trim();


    const phone =
        document
            .getElementById("phone")
            .value
            .trim();


    const address =
        document
            .getElementById("address")
            .value
            .trim();


    const paymentMethod =
        document
            .getElementById(
                "payment-method"
            )
            .value;


    const notes =
        document
            .getElementById("notes")
            .value
            .trim();


    /* التحقق من البيانات */

    if (
        !name ||
        !phone ||
        !address
    ) {

        showNotification(
            "⚠️ يرجى ملء جميع الحقول المطلوبة"
        );

        return;
    }


    if (!validatePhone(phone)) {

        showNotification(
            "⚠️ يرجى إدخال رقم هاتف مصري صحيح"
        );

        return;
    }


    if (!paymentMethod) {

        showNotification(
            "⚠️ يرجى اختيار طريقة الدفع"
        );

        return;
    }


    if (cart.length === 0) {

        showNotification(
            "⚠️ السلة فارغة"
        );

        closeCheckout();

        return;
    }


    /* طرق الدفع */

    const paymentNames = {

        cash:
            "كاش عند الاستلام",

        instapay:
            "InstaPay"
    };


    /* إنشاء الرسالة */

    let message =
        "🌱 *طلب جديد من VitaGreen*%0A%0A";


    message +=
        `👤 الاسم: ${name}%0A`;


    message +=
        `📱 الهاتف: ${phone}%0A`;


    message +=
        `📍 العنوان: ${address}%0A`;


    message +=
        `💳 طريقة الدفع: ${paymentNames[paymentMethod]}%0A%0A`;


    /* InstaPay */

    if (
        paymentMethod ===
        "instapay"
    ) {

        message +=
            `🔗 رابط InstaPay:%0A${encodeURIComponent(INSTAPAY_URL)}%0A%0A`;
    }


    /* المنتجات */

    message +=
        "📦 *المنتجات:*%0A";


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;


        message +=
            `• ${item.name} × ${item.quantity} = ${itemTotal} جنيه%0A`;
    });


    /* الإجمالي */

    const total =
        getCartTotal();


    message +=
        `%0A💰 *الإجمالي: ${total} جنيه*`;


    /* الملاحظات */

    if (notes) {

        message +=
            `%0A%0A📝 الملاحظات: ${encodeURIComponent(notes)}`;
    }


    /* فتح WhatsApp */

    const whatsappUrl =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


    window.open(
        whatsappUrl,
        "_blank"
    );


    /* تفريغ السلة */

    cart = [];

    saveCart();

    updateCart();

    updateCartCount();


    /* إغلاق Checkout */

    closeCheckout();


    /* إعادة تعيين النموذج */

    const form =
        document.querySelector(
            "#checkout-modal form"
        );


    if (form) {
        form.reset();
    }


    /* إخفاء InstaPay */

    const instapayBox =
        document.getElementById(
            "instapay-box"
        );


    if (instapayBox) {

        instapayBox.style.display =
            "none";
    }


    showNotification(
        "✅ تم تجهيز طلبك وإرساله عبر WhatsApp"
    );
}


/* =========================================================
   Notification
========================================================= */

function showNotification(message) {

    const oldNotification =
        document.querySelector(
            ".site-notification"
        );


    if (oldNotification) {
        oldNotification.remove();
    }


    const notification =
        document.createElement("div");


    notification.className =
        "success-message site-notification";


    notification.textContent =
        message;


    notification.style.position =
        "fixed";

    notification.style.top =
        "20px";

    notification.style.right =
        "20px";

    notification.style.left =
        "20px";

    notification.style.maxWidth =
        "450px";

    notification.style.margin =
        "0 auto";

    notification.style.zIndex =
        "3000";

    notification.style.boxShadow =
        "0 5px 20px rgba(0,0,0,0.2)";


    document.body.appendChild(
        notification
    );


    setTimeout(() => {

        if (notification) {
            notification.remove();
        }

    }, 3000);
}


/* =========================================================
   إغلاق النوافذ بالضغط خارجها
========================================================= */

window.addEventListener(
    "click",
    function (event) {

        const cartModal =
            document.getElementById(
                "cart-modal"
            );


        const checkoutModal =
            document.getElementById(
                "checkout-modal"
            );


        if (
            event.target ===
            cartModal
        ) {

            cartModal.classList.remove(
                "active"
            );
        }


        if (
            event.target ===
            checkoutModal
        ) {

            checkoutModal.classList.remove(
                "active"
            );
        }
    }
);


/* =========================================================
   زر ESC
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }


        document
            .getElementById("cart-modal")
            ?.classList.remove(
                "active"
            );


        document
            .getElementById("checkout-modal")
            ?.classList.remove(
                "active"
            );
    }
);


/* =========================================================
   تشغيل الموقع
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayProducts();

        loadCart();

        updateCart();

        handlePaymentMethod();

    }
);
```
