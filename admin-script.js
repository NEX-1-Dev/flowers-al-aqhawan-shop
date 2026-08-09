// ===== كلمة السر =====
const CORRECT_PASSWORD = '15151617';

// ===== المتغيرات =====
let products = [];
let announcements = [];

// ===== تحميل الإعلانات =====
function loadAnnouncementsFromStorage() {
    const saved = localStorage.getItem('announcements');
    if (saved) {
        try {
            announcements = JSON.parse(saved);
        } catch {
            announcements = [
                {
                    id: 1,
                    image: "https://files.catbox.moe/957jwa.png",
                    title: "🎉 خد هديتك مميزة وضل ذكرى طول العمر",
                    description: "🤍💙🎓 من Flowers Al aqhawan بمناسبة الافتتاح الكبير",
                    badge: "عرض خاص",
                    date: "2026-08-09"
                },
                {
                    id: 2,
                    image: "https://files.catbox.moe/9e4lw1.jpg",
                    title: "🌹 باقة الورد المختلط",
                    description: "تشكيلة رائعة من الورود بألوان مختلفة",
                    badge: "تخفيضات",
                    date: "2026-08-09"
                }
            ];
        }
    } else {
        announcements = [
            {
                id: 1,
                image: "https://files.catbox.moe/957jwa.png",
                title: "🎉 خد هديتك مميزة وضل ذكرى طول العمر",
                description: "🤍💙🎓 من Flowers Al aqhawan بمناسبة الافتتاح الكبير",
                badge: "عرض خاص",
                date: "2026-08-09"
            },
            {
                id: 2,
                image: "https://files.catbox.moe/9e4lw1.jpg",
                title: "🌹 باقة الورد المختلط",
                description: "تشكيلة رائعة من الورود بألوان مختلفة",
                badge: "تخفيضات",
                date: "2026-08-09"
            }
        ];
    }
    displayAnnouncementsAdmin();
}

// ===== عرض الإعلانات في لوحة التحكم =====
function displayAnnouncementsAdmin() {
    const list = document.getElementById('announcementList');
    list.innerHTML = '';
    
    if (announcements.length === 0) {
        list.innerHTML = '<p style="color:#666;">📢 لا توجد إعلانات. أضف إعلاناً جديداً!</p>';
        return;
    }
    
    announcements.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'announcement-item-admin';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="ann-info">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                <span style="font-size:0.8rem;color:#D4AF37;">${item.badge || 'إعلان'}</span>
            </div>
            <button onclick="removeAnnouncement(${index})" class="remove-announcement-btn">✕ حذف</button>
        `;
        list.appendChild(div);
    });
}

// ===== إضافة إعلان =====
function addAnnouncement() {
    const image = document.getElementById('annImage').value.trim();
    const title = document.getElementById('annTitle').value.trim();
    const description = document.getElementById('annDesc').value.trim();
    const badge = document.getElementById('annBadge').value.trim() || '📢 إعلان';
    
    if (!image || !title || !description) {
        alert('❌ الرجاء ملء جميع الحقول!');
        return;
    }
    
    const newId = announcements.length > 0 ? Math.max(...announcements.map(a => a.id || 0)) + 1 : 1;
    
    announcements.push({
        id: newId,
        image: image,
        title: title,
        description: description,
        badge: badge,
        date: new Date().toLocaleDateString('ar-EG')
    });
    
    displayAnnouncementsAdmin();
    saveAnnouncements();
    
    document.getElementById('annImage').value = '';
    document.getElementById('annTitle').value = '';
    document.getElementById('annDesc').value = '';
    document.getElementById('annBadge').value = '';
    
    alert('✅ تم إضافة الإعلان بنجاح!');
}

// ===== حذف إعلان =====
function removeAnnouncement(index) {
    if (!confirm('⚠️ هل أنت متأكد من حذف هذا الإعلان؟')) return;
    announcements.splice(index, 1);
    displayAnnouncementsAdmin();
    saveAnnouncements();
    alert('✅ تم حذف الإعلان!');
}

// ===== حفظ الإعلانات =====
function saveAnnouncements() {
    localStorage.setItem('announcements', JSON.stringify(announcements));
    // تحديث في الصفحة الرئيسية
    if (window.opener) {
        try {
            window.opener.updateAnnouncementsFromAdmin(announcements);
        } catch {}
    }
}

// ===== تحديث الإعلان العلوي =====
function updateTopAnnouncement() {
    const message = document.getElementById('topAnnouncementInput').value.trim();
    if (!message) {
        alert('❌ الرجاء كتابة النص!');
        return;
    }
    
    localStorage.setItem('topAnnouncement', message);
    if (window.opener) {
        try {
            window.opener.updateWelcomeMessageFromAdmin(message);
        } catch {}
    }
    document.getElementById('topAnnouncementInput').value = '';
    alert('✅ تم تحديث الإعلان العلوي!');
}

// ===== تحميل المنتجات =====
function loadProducts() {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data.products;
            displayAdminProducts();
        })
        .catch(() => {
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
            displayAdminProducts();
        });
}

// ===== التحقق من كلمة السر =====
function verifyPassword() {
    const input = document.getElementById('passwordInput').value;
    const error = document.getElementById('loginError');
    
    if (input === CORRECT_PASSWORD) {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        loadProducts();
        loadAnnouncementsFromStorage();
        
        const topMsg = localStorage.getItem('topAnnouncement');
        if (topMsg) {
            document.getElementById('topAnnouncementInput').value = topMsg;
        }
        error.textContent = '';
    } else {
        error.textContent = '❌ كلمة السر غير صحيحة!';
        document.getElementById('passwordInput').value = '';
    }
}

// ===== الخروج =====
function logout() {
    document.getElementById('loginContainer').style.display = 'flex';
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('passwordInput').value = '';
}

// ===== نسخ رابط المتجر =====
function copyShopLink() {
    const url = window.location.origin + '/flowers-al-aqhawan-shop/';
    navigator.clipboard.writeText(url).then(() => {
        alert('✅ تم نسخ رابط المتجر:\n' + url);
    }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('✅ تم نسخ رابط المتجر:\n' + url);
    });
}

// ===== عرض المنتجات في لوحة التحكم =====
function displayAdminProducts() {
    const list = document.getElementById('adminProductsList');
    list.innerHTML = '';
    
    products.forEach(product => {
        const item = document.createElement('div');
        item.className = 'admin-product-item';
        
        let categoryText = '🌹';
        if (product.category === 'warm') categoryText = '🔥 دافئ';
        else if (product.category === 'pastel') categoryText = '🌸 باستيل';
        else if (product.category === 'mixed') categoryText = '🌈 مختلط';
        
        item.innerHTML = `
            <img src="${product.image}" alt="منتج">
            <div class="item-info">
                <p><strong>الباقة رقم ${product.id}</strong> <span style="color:#8B0000;font-size:0.8rem;">${categoryText}</span></p>
                <p>${product.description}</p>
                <p class="item-price">💰 ${product.price}</p>
            </div>
            <div class="admin-actions">
                <button class="edit-btn" onclick="editProduct(${product.id})">✏️ تعديل</button>
                <button class="delete-btn" onclick="deleteProduct(${product.id})">🗑️ حذف</button>
            </div>
        `;
        list.appendChild(item);
    });
}

// ===== إضافة منتج جديد =====
function addProduct() {
    const image = document.getElementById('newImage').value.trim();
    const description = document.getElementById('newDescription').value.trim();
    const price = document.getElementById('newPrice').value.trim();
    const category = document.getElementById('newCategory').value;
    
    if (!image || !description || !price) {
        alert('❌ الرجاء ملء جميع الحقول!');
        return;
    }
    
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    products.push({
        id: newId,
        image: image,
        description: description,
        price: price,
        category: category
    });
    
    saveProducts();
    
    document.getElementById('newImage').value = '';
    document.getElementById('newDescription').value = '';
    document.getElementById('newPrice').value = '';
    
    displayAdminProducts();
    alert('✅ تم إضافة المنتج بنجاح!');
}

// ===== تعديل منتج =====
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const newImage = prompt('رابط الصورة الجديد:', product.image);
    if (newImage !== null) product.image = newImage;
    
    const newDescription = prompt('الوصف الجديد:', product.description);
    if (newDescription !== null) product.description = newDescription;
    
    const newPrice = prompt('السعر الجديد:', product.price);
    if (newPrice !== null) product.price = newPrice;
    
    const newCategory = prompt('التصنيف الجديد (mixed/warm/pastel):', product.category || 'mixed');
    if (newCategory !== null) product.category = newCategory;
    
    saveProducts();
    displayAdminProducts();
    alert('✅ تم تعديل المنتج بنجاح!');
}

// ===== حذف منتج =====
function deleteProduct(id) {
    if (!confirm('⚠️ هل أنت متأكد من حذف هذا المنتج؟')) return;
    
    products = products.filter(p => p.id !== id);
    saveProducts();
    displayAdminProducts();
    alert('✅ تم حذف المنتج بنجاح!');
}

// ===== حفظ المنتجات =====
function saveProducts() {
    const data = { products: products };
    const json = JSON.stringify(data, null, 2);
    
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.json';
    a.click();
    URL.revokeObjectURL(url);
    
    localStorage.setItem('shopProducts', json);
    alert('✅ تم حفظ المنتجات!\n📁 قم برفع ملف products.json إلى GitHub لتحديث المتجر للجميع.');
}

// ===== دعم Enter لتسجيل الدخول =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.getElementById('loginContainer').style.display !== 'none') {
        verifyPassword();
    }
});

// ===== تحميل عند فتح الصفحة =====
window.onload = function() {
    if (document.getElementById('adminPanel').style.display === 'block') {
        loadProducts();
        loadAnnouncementsFromStorage();
    }
};
