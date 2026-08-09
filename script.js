// تحميل المنتجات من ملف JSON
let products = [];
let filteredProducts = [];
let currentFilter = 'all';

// ===== تحميل المنتجات =====
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data.products;
        filteredProducts = [...products];
        displayProducts();
        updateStats();
        loadAnnouncement();
    })
    .catch(error => {
        console.error('خطأ في تحميل المنتجات:', error);
        products = [
            {
                id: 1,
                image: "https://files.catbox.moe/9e4lw1.jpg",
                description: "15 وردة - ألوان مختلطة (أحمر، وردي، أبيض)",
                price: "600 ليرة سورية",
                category: "mixed"
            },
            {
                id: 2,
                image: "https://files.catbox.moe/11na6q.jpg",
                description: "10 وردات - ألوان دافئة (برتقالي، أصفر، أحمر)",
                price: "400 ليرة سورية",
                category: "warm"
            },
            {
                id: 3,
                image: "https://files.catbox.moe/b8lsep.jpg",
                description: "10 وردات مع جبسوفيل - ألوان باستيل (وردي، أرجواني، أبيض)",
                price: "500 ليرة سورية",
                category: "pastel"
            }
        ];
        filteredProducts = [...products];
        displayProducts();
        updateStats();
        loadAnnouncement();
    });

// ===== عرض المنتجات =====
function displayProducts() {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        container.innerHTML = `
            <div style="text-align:center;padding:50px;background:rgba(255,255,255,0.9);border-radius:20px;width:100%;">
                <h2 style="color:#8B0000;">🌸 لا توجد منتجات في هذا التصنيف</h2>
                <p style="color:#666;">يرجى اختيار تصنيف آخر</p>
            </div>
        `;
        return;
    }
    
    filteredProducts.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        // تحديد لون البادج حسب التصنيف
        let badgeText = '🌹';
        let badgeColor = '#8B0000';
        if (product.category === 'warm') {
            badgeText = '🔥 دافئ';
            badgeColor = '#FF4500';
        } else if (product.category === 'pastel') {
            badgeText = '🌸 باستيل';
            badgeColor = '#FF69B4';
        } else if (product.category === 'mixed') {
            badgeText = '🌈 مختلط';
            badgeColor = '#D4AF37';
        }
        
        card.innerHTML = `
            <div class="badge" style="background:${badgeColor};">${badgeText}</div>
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

// ===== تصفية المنتجات =====
function filterProducts(category) {
    currentFilter = category;
    
    // تحديث الأزرار
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.textContent.includes('جميع') && category === 'all') {
            btn.classList.add('active');
        } else if (btn.textContent.includes('دافئة') && category === 'warm') {
            btn.classList.add('active');
        } else if (btn.textContent.includes('باستيل') && category === 'pastel') {
            btn.classList.add('active');
        } else if (btn.textContent.includes('مختلطة') && category === 'mixed') {
            btn.classList.add('active');
        }
    });
    
    if (category === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(p => p.category === category);
    }
    
    displayProducts();
}

// ===== وظيفة الشراء =====
function buyProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const phoneNumber = '963986552489';
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
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// ===== إغلاق الإعلان =====
function closeAnnouncement() {
    document.getElementById('announcementBar').style.display = 'none';
    localStorage.setItem('announcementClosed', 'true');
}

// ===== تحميل الإعلان =====
function loadAnnouncement() {
    const isClosed = localStorage.getItem('announcementClosed');
    if (isClosed === 'true') {
        document.getElementById('announcementBar').style.display = 'none';
    }
}

// ===== تحديث الإحصائيات =====
function updateStats() {
    // عداد الزوار
    let visitors = localStorage.getItem('visitorCount');
    if (!visitors) {
        visitors = Math.floor(Math.random() * 100) + 50;
        localStorage.setItem('visitorCount', visitors);
    } else {
        visitors = parseInt(visitors) + 1;
        localStorage.setItem('visitorCount', visitors);
    }
    document.getElementById('visitorCount').textContent = visitors;
    
    // تاريخ آخر تحديث
    const now = new Date();
    const dateStr = now.toLocaleDateString('ar-EG', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('lastUpdate').textContent = dateStr;
}

// ===== تحديث الإعلان من لوحة التحكم =====
function updateAnnouncement(text) {
    const announcementText = document.getElementById('announcementText');
    if (announcementText) {
        announcementText.textContent = text;
        localStorage.setItem('announcementText', text);
        // إظهار الإعلان إذا كان مخفياً
        document.getElementById('announcementBar').style.display = 'flex';
        localStorage.removeItem('announcementClosed');
    }
}

// تحميل الإعلان المحفوظ
function loadSavedAnnouncement() {
    const savedText = localStorage.getItem('announcementText');
    if (savedText) {
        document.getElementById('announcementText').textContent = savedText;
    }
}

// ===== تشغيل عند تحميل الصفحة =====
window.onload = function() {
    loadSavedAnnouncement();
};
