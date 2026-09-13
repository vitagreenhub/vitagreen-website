// بيانات المنتجات
const products = [
    {
        id: 1,
        name: "البروكلي",
        emoji: "🥦",
        price: 170,
        benefits: "غني بفيتامين سي والكالسيوم",
        description: "البروكلي من أفضل الخضروات الصليبية الغنية بالعناصر الغذائية المهمة لصحة الجسم."
    },
    {
        id: 2,
        name: "البنجر",
        emoji: "🍠",
        price: 170,
        benefits: "يحسن الدورة الدموية وينقي الدم",
        description: "البنجر يحتوي على مواد طبيعية تعزز صحة القلب والأوعية الدموية."
    },
    {
        id: 3,
        name: "الفجل الأحمر",
        emoji: "🌶️",
        price: 170,
        benefits: "مضاد التهابات قوي جداً",
        description: "الفجل الأحمر غني بمضادات الأكسدة والفيتامينات المهمة."
    },
    {
        id: 4,
        name: "السبانخ",
        emoji: "🥬",
        price: 170,
        benefits: "ملك الخضروات الورقية الخضراء",
        description: "السبانخ مصدر ممتاز للحديد والكالسيوم وفيتامينات متعددة."
    },
    {
        id: 5,
        name: "دار الشمس",
        emoji: "🌻",
        price: 170,
        benefits: "بذور غنية بمضادات الأكسدة",
        description: "دار الشمس تحتوي على دهون صحية وفيتامينات E و B."
    },
    {
        id: 6,
        name: "الجرجير",
        emoji: "🥗",
        price: 170,
        benefits: "نبات حريف مليء بالعناصر الغذائية",
        description: "الجرجير يساعد في حرق الدهون وتحسين عملية الهضم."
    },
    {
        id: 7,
        name: "البقدونس",
        emoji: "🌿",
        price: 170,
        benefits: "توابل صحية غنية بالفيتامينات",
        description: "البقدونس يتميز بخصائص مدرة للبول وتنقية الدم."
    },
    {
        id: 8,
        name: "مزيج ماكروجرين",
        emoji: "🌱",
        price: 170,
        benefits: "مزيج متكامل من جميع المنتجات",
        description: "المزيج المثالي يجمع كل فوائد الماكروجرين في عبوة واحدة."
    }
];

// سلة المشتريات
let cart = [];

// عرض المنتجات
function displayProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-content">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price} جنيه</div>
                <div class="product-description">${product.description}</div>
                <div class="product-benefits">
                    <strong>الفوائد:</strong> ${product.benefits}
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    أضف للسلة 🛒
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// إضافة منتج للسلة
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartCount();
    showNotification(`✅ تم إضافة ${product.name} للسلة`);
}

// إزالة منتج من السلة
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    updateCartCount();
}

// تحديث عرض السلة
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 30px; color: #999;">السلة فارغة 🛒</p>';
        document.getElementById('total-price').textContent = '0';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.emoji} ${item.name}</div>
                <div class="cart-item-price">الكمية: ${item.quantity} × ${item.price} جنيه = ${itemTotal} جنيه</div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">حذف</button>
        `;
        cartItems.appendChild(cartItem);
    });

    document.getElementById('total-price').textContent = total;
}

// تحديث عدد المنتجات في السلة
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// فتح/إغلاق السلة
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('active');
    if (modal.classList.contains('active')) {
        updateCart();
    }
}

// فتح نموذج الدفع
function checkout() {
    if (cart.length === 0) {
        alert('⚠️ السلة فارغة! يرجى إضافة منتجات أولاً');
        return;
    }
    document.getElementById('cart-modal').classList.remove('active');
    document.getElementById('checkout-modal').classList.add('active');
}

// إغلاق نموذج الدفع
function closeCheckout() {
    document.getElementById('checkout-modal').classList.remove('active');
}

// إرسال الطلب
function submitOrder(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const paymentMethod = document.getElementById('payment-method').value;
    const notes = document.getElementById('notes').value.trim();

    if (!name || !phone || !address || !paymentMethod) {
        alert('⚠️ الرجاء ملء جميع الحقول المطلوبة');
        return;
    }

    if (phone.length < 10) {
        alert('⚠️ الرجاء إدخال رقم هاتف صحيح');
        return;
    }

    // إعداد تفاصيل الطلب
    const orderDetails = prepareOrderMessage(name, phone, address, paymentMethod, notes);

    // إرسال عبر WhatsApp
    const whatsappMessage = encodeURIComponent(orderDetails);
    const whatsappLink = `https://wa.me/201023666745?text=${whatsappMessage}`;
    window.open(whatsappLink, '_blank');

    // تنظيف النموذج والسلة
    clearCheckoutForm();
    closeCheckout();
    cart = [];
    updateCartCount();
    showNotification('✅ تم إرسال طلبك بنجاح! سنتواصل معك قريباً عبر WhatsApp');
}

// إعداد رسالة الطلب
function prepareOrderMessage(name, phone, address, paymentMethod, notes) {
    let message = `🌱 *طلب جديد من VitaGreen*\n\n`;
    message += `👤 الاسم: ${name}\n`;
    message += `📱 الهاتف: ${phone}\n`;
    message += `📍 العنوان: ${address}\n`;
    message += `💳 طريقة الدفع: ${paymentMethod === 'cash' ? '💰 كاش عند الاستلام' : '📱 Instapay'}\n\n`;
    message += `*📦 المنتجات المطلوبة:*\n`;
    message += `${'='.repeat(40)}\n`;

    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `${index + 1}. ${item.emoji} ${item.name}\n`;
        message += `   الكمية: ${item.quantity} × ${item.price} جنيه = ${itemTotal} جنيه\n`;
    });

    message += `${'='.repeat(40)}\n`;
    message += `💰 الإجمالي: *${total} جنيه*\n`;

    if (notes) {
        message += `\n📝 ملاحظات: ${notes}`;
    }

    message += `\n\n✨ شكراً لاختيارك VitaGreen`;

    return message;
}

// تنظيف نموذج الدفع
function clearCheckoutForm() {
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';
    document.getElementById('payment-method').value = '';
    document.getElementById('notes').value = '';
}

// إظهار إشعار
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease-in;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// إغلاق الـ Modal عند الضغط خارجها
window.addEventListener('click', function(event) {
    const cartModal = document.getElementById('cart-modal');
    const checkoutModal = document.getElementById('checkout-modal');

    if (event.target === cartModal) {
        cartModal.classList.remove('active');
    }
    if (event.target === checkoutModal) {
        checkoutModal.classList.remove('active');
    }
});

// تحميل المنتجات عند فتح الصفحة
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    
    // إضافة أنماط الرسوم المتحركة
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
