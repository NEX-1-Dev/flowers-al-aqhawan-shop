// ===== المتغيرات العامة =====
let products = [];
let filteredProducts = [];
let currentFilter = 'all';
let announcements = [];
let currentSection = 'announcements';

// ===== الإعلانات الافتراضية =====
const defaultAnnouncements = [
    {
        id: 1,
        image: "https://files.catbox.moe/957jwa.png",
        title: "🎉 خد هديتك مميزة وضل ذكرى طول العمر",
        description: "🤍💙🎓 من Flowers Al aqhawan بمناسبة الافتتاح الكبير. عروض خاصة وحصرية لا تفوت!",
        badge: "عرض خاص",
        date: "2026-08-09"
    },
    {
        id: 2,
        image: "https://files.catbox.moe/9e4lw1.jpg",
        title: "🌹 باقة الورد المختلط",
        description: "تشكيلة رائعة من الورود بألوان مختلفة تناسب جميع المناسبات. خصم 20% لفترة محدودة!",
        badge: "تخفيضات",
        date: "2026-08-09"
    },
    {
        id: 3,
        image: "https://files.catbox.moe/11na6q.jpg",
        title: "🔥 باقات الألوان الدافئة",
        description: "أجمل باقات الورود بألوان دافئة تبعث السعادة والبهجة. اطلب الآن واستمتع بخصم مميز!",
        badge: "عرض حصري",
        date: "2026-08-09"
    },
    {
        id: 4,
        image: "https://files.catbox.moe/b8lsep.jpg",
        title: "🌸 باقات الألوان باستيل",
        description: "باقات أنيقة بألوان باستيل رقيقة تناسب المناسبات الرومانسية. خصم 15% على أول طلب!",
        badge: "مناسبة خاصة",
        date: "2026-08-09"
    }
];

// ===== تحميل البيانات =====
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data.products;
        filteredProducts = [...products];
        displayProducts();
        updateStats();
        loadAnnouncements();
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
    });

// ===== تحميل الإعلانات =====
function loadAnnouncements() {
    const saved = localStorage.getItem('announcements');
    if (saved) {
        try {
            announcements = JSON.parse(saved);
        } catch {
            announcements = defaultAnnouncements;
        }
    } else {
        announcements = defaultAnnouncements;
        localStorage.setItem('announcements', JSON.stringify(announcements));
    }
    displayAnnouncements();
}

// ===== عرض الإعلانات =====
function displayAnnouncements() {
    const container = document.getElementById('announcementsContainer');
    container.innerHTML = '';
    
    if (announcements.length === 0) {
        container.innerHTML = `
            <div style="text-align:center;padding:50px;background:var(--card-bg);border-radius:20px;border:2px solid var(--border-color);">
                <h3 style="color:#8B0000;">📢 لا توجد إعلانات حالياً</h3>
                <p style="color:var(--text-color);">سيتم إضافة إعلانات جديدة قريباً</p>
            </div>
        `;
        return;
    }
    
    announcements.forEach((ann, index) => {
        const card = document.createElement('div');
        card.className = 'announcement-card';
        card.innerHTML = `
            <img src="${ann.image}" alt="${ann.title}" class="announcement-image">
            <div class="announcement-body">
                <span class="announcement-badge">${ann.badge || '📢 إعلان'}</span>
                <h3 class="announcement-title">${ann.title}</h3>
                <p class="announcement-description">${ann.description}</p>
                <span class="announcement-date">📅 ${ann.date || new Date().toLocaleDateString('ar-EG')}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// ===== عرض المنتجات =====
function displayProducts() {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        container.innerHTML = `
            <div style="text-align:center;padding:50px;background:var(--card-bg);border-radius:20px;border:2px solid var(--border-color);grid-column:1/-1;">
                <h3 style="color:#8B0000;">🌸 لا توجد منتجات في هذا التصنيف</h3>
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

// ===== التبديل بين الأقسام =====
function showSection(section) {
    currentSection = section;
    
    // إخفاء جميع الأقسام
    document.querySelectorAll('.section-content').forEach(el => {
        el.classList.remove('active');
    });
    
    // إظهار القسم المطلوب
    document.getElementById(section + 'Section').classList.add('active');
    
    // تحديث الأزرار
    document.querySelectorAll('.nav-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.nav-tab').forEach(btn => {
        if (btn.textContent.includes('إعلانات') && section === 'announcements') {
            btn.classList.add('active');
        }
        if (btn.textContent.includes('منتجات') && section === 'products') {
            btn.classList.add('active');
        }
    });
    
    // تمرير سلس إلى أعلى القسم
    document.querySelector('.section-content.active').scrollIntoView({
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

🤍💙🎓 خد هديتك مميزة وضل ذكرى طول العمر`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// ===== إغلاق الإعلان العلوي =====
function closeTopAnnouncement() {
    document.getElementById('topAnnouncementBar').style.display = 'none';
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

// ===== تبديل الوضع =====
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

// ===== دوال للتحديث من لوحة التحكم =====
function updateAnnouncementsFromAdmin(newAnnouncements) {
    announcements = newAnnouncements;
    localStorage.setItem('announcements', JSON.stringify(announcements));
    displayAnnouncements();
}

function updateWelcomeMessageFromAdmin(message) {
    document.getElementById('topAnnouncementText').textContent = message;
    localStorage.setItem('topAnnouncement', message);
}

// ===== تحميل الإعلان العلوي المحفوظ =====
function loadTopAnnouncement() {
    const saved = localStorage.getItem('topAnnouncement');
    if (saved) {
        document.getElementById('topAnnouncementText').textContent = saved;
    }
}

// ===== تشغيل عند تحميل الصفحة =====
window.onload = function() {
    loadTheme();
    loadTopAnnouncement();
};

console.log('💡 للتحكم من لوحة التحكم:');
console.log('updateAnnouncementsFromAdmin([{id,image,title,description,badge,date}])');
console.log('updateWelcomeMessageFromAdmin("نص الإعلان")');
