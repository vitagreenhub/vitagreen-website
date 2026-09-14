// بيانات المنتجات
const products = [
    { id: 1, name: "البروكلي", image: "broccoli.jpg", price: 170, benefits: "غني بفيتامين سي والكالسيوم", description: "البروكلي من أفضل الخضروات الصليبية الغنية بالعناصر الغذائية المهمة لصحة الجسم." },
    { id: 2, name: "البنجر", image: "beetroots.jpg", price: 170, benefits: "يحسن الدورة الدموية وينقي الدم", description: "البنجر يحتوي على مواد طبيعية تعزز صحة القلب والأوعية الدموية." },
    { id: 3, name: "الفجل الأحمر", image: "radish.jpg", price: 170, benefits: "مضاد التهابات قوي جداً", description: "الفجل الأحمر غني بمضادات الأكسدة والفيتامينات المهمة." },
    { id: 4, name: "الكرنب", image: "collardgreens.jpg", price: 170, benefits: "ملك الخضروات الورقية الخضراء", description: "الكرنب مصدر ممتاز للحديد والكالسيوم وفيتامينات متعددة." },
    { id: 5, name: "دوار الشمس", image: "sunflower.jpg", price: 170, benefits: "بذور غنية بمضادات الأكسدة", description: "دوار الشمس تحتوي على دهون صحية وفيتامينات E و B." },
    { id: 6, name: "الجرجير", image: "arugula.jpg", price: 170, benefits: "نبات حريف مليء بالعناصر الغذائية", description: "الجرجير يساعد في حرق الدهون وتحسين عملية الهضم." },
    { id: 7, name: "البقدونس", image: "parsley.jpg", price: 170, benefits: "توابل صحية غنية بالفيتامينات", description: "البقدونس يتميز بخصائص مدرة للبول وتنقية الدم." },
    { id: 8, name: "الريحان", image: "basil.jpg", price: 170, benefits: "عشبة عطرية صحية جداً", description: "الريحان يحتوي على خصائص مضادة للبكتيريا والالتهابات." },
    { id: 9, name: "البسلة", image: "pea.jpg", price: 170, benefits: "غنية بالبروتين والألياف", description: "البسلة مصدر ممتاز للبروتين النباتي والعناصر الغذائية." },
    { id: 10, name: "الخردل", image: "mustard.jpg", price: 170, benefits: "نبات غني بمضادات الأكسدة", description: "الخردل يحتوي على خصائص صحية متعددة." }
];

let cart = [];

function displayProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    products.forEach(p => {
        const url = `https://raw.githubusercontent.com/vitagreenhub/vitagreen-website/main/${p.image}`;
        const html = `
            <div class="product-card">
                <div class="product-image" style="background-image: url('${url}'); background-size: cover; background-position: center;"></div>
                <div class="product-content">
                    <div class="product-name">${p.name}</div>
                    <div class="product-price">${p.price} جنيه</div>
                    <div class="product-description">${p.description}</div>
                    <div class="product-benefits"><strong>الفوائد:</strong> ${p.benefits}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${p.id})">أضف للسلة 🛒</button>
                </div>
            </div>
        `;
        grid.innerHTML += html;
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    updateCartCount();
    showNotification(`✅ تم إضافة ${product.name} للسلة`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
    updateCartCount();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 30px; color: #999;">السلة فارغة 🛒</p>';
        document.getElementById('total-price').textContent = '0';
        return;
    }

    let html = '';
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">الكمية: ${item.quantity} × ${item.price} جنيه = ${itemTotal} جنيه</div>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">حذف</button>
            </div>
        `;
    });
    
    cartItems.innerHTML = html;
    document.getElementById('total-price').textContent = total;
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('active');
    if (modal.classList.contains('active')) {
        updateCart();
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('⚠️ السلة فارغة! يرجى إضافة منتجات أولاً');
        return;
    }
    document.getElementById('cart-modal').classList.remove('active');
    document.getElementById('checkout-modal').classList.add('active');
}

function closeCheckout() {
    document.getElementById('checkout-modal').classList.remove('active');
}

function submitOrder(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    
    if (!name || !phone || !address) {
        alert('⚠️ الرجاء ملء جميع الحقول المطلوبة');
        return;
    }

    let msg = `🌱 طلب جديد من VitaGreen\n\n`;
    msg += `👤 الاسم: ${name}\n`;
    msg += `📱 الهاتف: ${phone}\n`;
    msg += `📍 العنوان: ${address}\n\n`;
    msg += `📦 المنتجات:\n`;
    
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        msg += `${item.name} × ${item.quantity} = ${itemTotal} جنيه\n`;
    });
    
    msg += `\n💰 الإجمالي: ${total} جنيه`;

    const link = `https://wa.me/201023666745?text=${encodeURIComponent(msg)}`;
    window.open(link, '_blank');
    
    cart = [];
    updateCartCount();
    closeCheckout();
    showNotification('✅ تم إرسال طلبك! سنتواصل معك قريباً');
}

function showNotification(msg) {
    const notif = document.createElement('div');
    notif.textContent = msg;
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #1e3a8a;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 2000;
    `;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

document.addEventListener('DOMContentLoaded', displayProducts);

window.addEventListener('click', function(e) {
    const cartModal = document.getElementById('cart-modal');
    const checkoutModal = document.getElementById('checkout-modal');
    if (e.target === cartModal) cartModal.classList.remove('active');
    if (e.target === checkoutModal) checkoutModal.classList.remove('active');
});
