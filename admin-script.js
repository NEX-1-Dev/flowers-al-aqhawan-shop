// ===== كلمة السر =====
const CORRECT_PASSWORD = '15151617';

// ===== المتغيرات =====
let products = [];
let announcements = [];

// ===== تحميل الإعلانات المحفوظة =====
function loadAnnouncementsFromStorage() {
    const saved = localStorage.getItem('announcements');
    if (saved) {
        try {
            announcements = JSON.parse(saved);
        } catch {
            announcements = [
                {
                    image: "https://files.catbox.moe/9e4lw1.jpg",
                    text: "🎉 خد هديتك مميزة وضل ذكرى طول العمر 🤍💙🎓 من Flowers Al aqhawan"
                },
                {
                    image: "https://files.catbox.moe/11na6q.jpg",
                    text: "🌹 عروض خاصة بمناسبة الافتتاح! خصم 20% على جميع الباقات"
                }
            ];
        }
    } else {
        announcements = [
            {
                image: "https://files.catbox.moe/9e4lw1.jpg",
                text: "🎉 خد هديتك مميزة وضل ذكرى طول العمر 🤍💙🎓 من Flowers Al aqhawan"
            },
            {
                image: "https://files.catbox.moe/11na6q.jpg",
                text: "🌹 عروض خاصة بمناسبة الافتتاح! خصم 20% على جميع الباقات"
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
            <img src="${item.image}" alt="إعلان">
            <span class="announcement-text-admin">${item.text}</span>
            <button onclick="removeAnnouncement(${index})" class="remove-announcement-btn">✕</button>
        `;
        list.appendChild(div);
    });
}

// ===== إضافة إعلان =====
function addAnnouncement() {
    const image = document.getElementById('announcementImage').value.trim();
    const text = document.getElementById('announcementText').value.trim();
    
    if (!image || !text) {
        alert('❌ الرجاء ملء جميع الحقول!');
        return;
    }
    
    announcements.push({ image, text });
    displayAnnouncementsAdmin();
    
    document.getElementById('announcementImage').value = '';
    document.getElementById('announcementText').value = '';
    
    alert('✅ تم إضافة الإعلان! لا تنسى حفظ التغييرات.');
}

// ===== حذف إعلان =====
function removeAnnouncement(index) {
    if (!confirm('⚠️ هل أنت متأكد من حذف هذا الإعلان؟')) return;
    announcements.splice(index, 1);
    displayAnnouncementsAdmin();
    alert('✅ تم حذف الإعلان! لا تنسى حفظ التغييرات.');
}

// ===== حفظ الإعلانات =====
function saveAnnouncements() {
    localStorage.setItem('announcements', JSON.stringify(announcements));
    // تحديث الإعلانات في الصفحة الرئيسية
    if (window.opener) {
        try {
            window.opener.updateAnnouncementsFromAdmin(announcements);
        } catch {}
    }
    alert('✅ تم حفظ الإعلانات بنجاح!');
}

// ===== تحديث الرسالة الترحيبية =====
function updateWelcomeMessage() {
    const message = document.getElementById('welcomeMessageInput').value.trim();
    if (!message) {
        alert('❌ الرجاء كتابة الرسالة!');
        return;
    }
    
    localStorage.setItem('welcomeMessage', message);
    // تحديث في الصفحة الرئيسية
    if (window.opener) {
        try {
            window.opener.updateWelcomeMessageFromAdmin(message);
        } catch {}
    }
    document.getElementById('welcomeMessageInput').value = '';
    alert('✅ تم تحديث الرسالة الترحيبية بنجاح!');
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
        // تحميل الرسالة الترحيبية الحالية
        const welcomeMsg = localStorage.getItem('welcomeMessage');
        if (welcomeMsg) {
            document.getElementById('welcomeMessageInput').value = welcomeMsg;
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

// ===== عرض المنتجات (زر) =====
function showProducts() {
    window.open('index.html', '_blank');
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
