// ===== المتغيرات العامة =====
let products = [];
let filteredProducts = [];
let currentFilter = 'all';

// ===== إعدادات الإعلانات =====
const defaultAnnouncements = [
    {
        image: "https://files.catbox.moe/9e4lw1.jpg",
        text: "🎉 خد هديتك مميزة وضل ذكرى طول العمر 🤍💙🎓 من Flowers Al aqhawan"
    },
    {
        image: "https://files.catbox.moe/11na6q.jpg",
        text: "🌹 عروض خاصة بمناسبة الافتتاح! خصم 20% على جميع الباقات"
    },
    {
        image: "https://files.catbox.moe/b8lsep.jpg",
        text: "🌸 باقات مميزة بمناسبة الأعياد والمناسبات السعيدة"
    }
];

// ===== تحميل المنتجات =====
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data.products;
        filteredProducts = [...products];
        displayProducts();
        updateStats();
        loadAnnouncements();
        loadWelcomeMessage();
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
        loadAnnouncements();
        loadWelcomeMessage();
    });

// ===== عرض المنتجات =====
function displayProducts() {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        container.innerHTML = `
            <div style="text-align:center;padding:50px;background:var(--card-bg);border-radius:20px;width:100%;border:2px solid var(--border-color);">
                <h2 style="color:#8B0000;">🌸 لا توجد منتجات في هذا التصنيف</h2>
                <p style="color:var(--text-color);">يرجى اختيار تصنيف آخر</p>
            </div>
        `;
        return;
    }
    
    filteredProducts.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
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

// ===== التمرير إلى المنتجات =====
function scrollToProducts() {
    document.getElementById('productsContainer').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
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

💻 المبرمج: 𝑵𝑬𝑿_𝑫𝑬𝑽_𝑽1
🤍💙🎓 خد هديتك مميزة وضل ذكرى طول العمر`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// ===== إغلاق الإعلان =====
function closeAnnouncement() {
    document.getElementById('announcementBar').style.display = 'none';
    localStorage.setItem('announcementClosed', 'true');
}

// ===== إغلاق النافذة الترحيبية =====
function closeWelcome() {
    document.getElementById('welcomeModal').style.display = 'none';
    localStorage.setItem('welcomeShown', 'true');
}

// ===== تحميل الإعلانات =====
function loadAnnouncements() {
    const slider = document.getElementById('announcementSlider');
    const savedAnnouncements = localStorage.getItem('announcements');
    let announcements = [];
    
    if (savedAnnouncements) {
        try {
            announcements = JSON.parse(savedAnnouncements);
        } catch {
            announcements = defaultAnnouncements;
        }
    } else {
        announcements = defaultAnnouncements;
        localStorage.setItem('announcements', JSON.stringify(announcements));
    }
    
    slider.innerHTML = '';
    announcements.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'announcement-item';
        div.innerHTML = `
            <img src="${item.image}" alt="إعلان ${index + 1}">
            <span>${item.text}</span>
        `;
        slider.appendChild(div);
    });
}

// ===== تحميل الرسالة الترحيبية =====
function loadWelcomeMessage() {
    const isShown = localStorage.getItem('welcomeShown');
    const welcomeMessage = localStorage.getItem('welcomeMessage');
    
    if (welcomeMessage) {
        document.getElementById('welcomeAnnouncement').textContent = welcomeMessage;
    }
    
    if (isShown === 'true') {
        document.getElementById('welcomeModal').style.display = 'none';
    }
}

// ===== تحديث الإحصائيات =====
function updateStats() {
    let visitors = localStorage.getItem('visitorCount');
    if (!visitors) {
        visitors = Math.floor(Math.random() * 100) + 50;
        localStorage.setItem('visitorCount', visitors);
    } else {
        visitors = parseInt(visitors) + 1;
        localStorage.setItem('visitorCount', visitors);
    }
    document.getElementById('visitorCount').textContent = visitors;
    
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

// ===== تبديل الوضع الداكن/الفاتح =====
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const icon = document.querySelector('#themeToggle i');
    if (newTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// ===== تحميل الوضع المحفوظ =====
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        const icon = document.querySelector('#themeToggle i');
        if (savedTheme === 'dark') {
            icon.className = 'fas fa-sun';
        }
    }
}

// ===== تشغيل عند تحميل الصفحة =====
window.onload = function() {
    loadTheme();
    loadAnnouncements();
    loadWelcomeMessage();
};

// ===== دالة لتحديث الإعلانات من لوحة التحكم =====
function updateAnnouncementsFromAdmin(announcements) {
    localStorage.setItem('announcements', JSON.stringify(announcements));
    loadAnnouncements();
}

// ===== دالة لتحديث الرسالة الترحيبية من لوحة التحكم =====
function updateWelcomeMessageFromAdmin(message) {
    localStorage.setItem('welcomeMessage', message);
    document.getElementById('welcomeAnnouncement').textContent = message;
}

// ===== عرض الإعلانات في لوحة التحكم (للمساعدة) =====
console.log('💡 لإدارة الإعلانات من لوحة التحكم، استخدم الدوال:');
console.log('updateAnnouncementsFromAdmin([{image:"رابط", text:"نص"}])');
console.log('updateWelcomeMessageFromAdmin("نص الرسالة")');
