// بيانات المنتجات
const products = [
    { id: 1, name: "البروكلي", image: "broccoli.jpg", price: 170, benefits: "غني بفيتامين سي والكالسيوم", description: "البروكلي من أفضل الخضروات الصليبية" },
    { id: 2, name: "البنجر", image: "beetroots.jpg", price: 170, benefits: "يحسن الدورة الدموية", description: "البنجر يحتوي على مواد طبيعية" },
    { id: 3, name: "الفجل الأحمر", image: "radish.jpg", price: 170, benefits: "مضاد التهابات قوي", description: "الفجل غني بمضادات الأكسدة" },
    { id: 4, name: "الكرنب", image: "collardgreens.jpg", price: 170, benefits: "الخضروات الورقية الخضراء", description: "الكرنب مصدر ممتاز للحديد" },
    { id: 5, name: "دوار الشمس", image: "sunflower.jpg", price: 170, benefits: "بذور غنية بمضادات الأكسدة", description: "دوار الشمس تحتوي على دهون صحية" },
    { id: 6, name: "الجرجير", image: "arugula.jpg", price: 170, benefits: "نبات حريف مليء بالعناصر", description: "يساعد في حرق الدهون" },
    { id: 7, name: "البقدونس", image: "parsley.jpg", price: 170, benefits: "توابل صحية غنية بالفيتامينات", description: "يتميز بخصائص مدرة للبول" },
    { id: 8, name: "الريحان", image: "basil.jpg", price: 170, benefits: "عشبة عطرية صحية", description: "خصائص مضادة للبكتيريا" },
    { id: 9, name: "البسلة", image: "pea.jpg", price: 170, benefits: "غنية بالبروتين والألياف", description: "مصدر ممتاز للبروتين النباتي" }
];

let cart = [];

function displayProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const imageUrl = `https://raw.githubusercontent.com/vitagreenhub/vitagreen-website/main/${product.image}`;
        const html = `
            <div class="product-card">
                <div class="product-image" style="background-image: url('${imageUrl}'); background-size: cover;"></div>
                <div class="product-content">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${product.price} جنيه</div>
                    <div class="product-description">${product.description}</div>
                    <div class="product-benefits"><strong>الفوائد:</strong> ${product.benefits}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">أضف للسلة 🛒</button>
                </div>
            </div>
        `;
        productsGrid.innerHTML += html;
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    updateCartCount();
    showNotification(`✅ تم إضافة ${product.name}`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #999;">السلة فارغة</p>';
        document.getElementById('total-price').textContent = '0';
        return;
    }
    let html = '';
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `<div class="cart-item"><div>${item.name} × ${item.quantity} = ${itemTotal}</div><button onclick="removeFromCart(${item.id})">حذف</button></div>`;
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
    if (modal.classList.contains('active')) updateCart();
}

function checkout() {
    if (cart.length === 0) return alert('السلة فارغة');
    document.getElementById('cart-modal').classList.remove('active');
    document.getElementById('checkout-modal').classList.add('active');
}

function closeCheckout() {
    document.getElementById('checkout-modal').classList.remove('active');
}

function submitOrder(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    if (!name || !phone || !address) return alert('ملء الحقول المطلوبة');
    let msg = `🌱 طلب من ${name}\n📱 ${phone}\n📍 ${address}\n\n`;
    cart.forEach(item => msg += `${item.name} × ${item.quantity}\n`);
    const link = `https://wa.me/201023666745?text=${encodeURIComponent(msg)}`;
    window.open(link, '_blank');
    cart = [];
    updateCartCount();
    closeCheckout();
}

function showNotification(msg) {
    const notif = document.createElement('div');
    notif.textContent = msg;
    notif.style.cssText = 'position:fixed;top:20px;right:20px;background:#1e3a8a;color:white;padding:15px;border-radius:5px;z-index:2000';
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

document.addEventListener('DOMContentLoaded', displayProducts);
