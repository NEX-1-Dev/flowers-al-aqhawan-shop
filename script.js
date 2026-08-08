// تحميل المنتجات من ملف JSON
let products = [];

fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data.products;
        displayProducts();
    })
    .catch(error => {
        console.error('خطأ في تحميل المنتجات:', error);
        // عرض منتجات افتراضية في حال فشل التحميل
        products = [
            {
                id: 1,
                image: "https://files.catbox.moe/9e4lw1.jpg",
                description: "15 وردة - ألوان مختلطة (أحمر، وردي، أبيض)",
                price: "600 ليرة سورية"
            },
            {
                id: 2,
                image: "https://files.catbox.moe/11na6q.jpg",
                description: "10 وردات - ألوان دافئة (برتقالي، أصفر، أحمر)",
                price: "400 ليرة سورية"
            },
            {
                id: 3,
                image: "https://files.catbox.moe/b8lsep.jpg",
                description: "10 وردات مع جبسوفيل - ألوان باستيل (وردي، أرجواني، أبيض)",
                price: "500 ليرة سورية"
            }
        ];
        displayProducts();
    });

// عرض المنتجات في الصفحة
function displayProducts() {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';
    
    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-number">🌹 الباقة ${index + 1}</div>
            <img src="${product.image}" alt="باقة ${index + 1}">
            <p class="description">${product.description}</p>
            <div class="price">💰 ${product.price}</div>
            <button class="buy-btn" onclick="buyProduct(${product.id})">
                🛒 شراء الآن
            </button>
        `;
        container.appendChild(card);
    });
}

// وظيفة الشراء وإرسال رسالة واتساب
function buyProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // رقم واتساب
    const phoneNumber = '963986552489';
    
    // إنشاء رسالة مخصصة
    const orderNumber = `#FL-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const today = new Date();
    const date = today.toLocaleDateString('ar-EG', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    const message = `مرحباً 🌹 أريد شراء:
🌸 الباقة رقم: ${product.id}
📝 الوصف: ${product.description}
💰 السعر: ${product.price}
📍 عنوان التسليم: [يرجى كتابة عنوانك هنا]
🆔 رقم الطلب: ${orderNumber}
📅 التاريخ: ${date}

💻 المبرمج: 𝑵𝑬𝑿_𝑫𝑬𝑽_𝑽1`;
    
    // ترميز الرسالة لعنوان URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // فتح واتساب في نافذة جديدة
    window.open(whatsappUrl, '_blank');
}
