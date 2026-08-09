// كلمة السر الصحيحة
const CORRECT_PASSWORD = '15151617';

// تحميل المنتجات
let products = [];

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
        // طريقة بديلة للنسخ
        const textarea = document.createElement('textarea');
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('✅ تم نسخ رابط المتجر:\n' + url);
    });
}

// ===== عرض المنتجات (زر عرض المنتجات) =====
function showProducts() {
    // فتح المتجر في نافذة جديدة
    window.open('index.html', '_blank');
}

// ===== تحديث الإعلان من لوحة التحكم =====
function updateAnnouncementFromAdmin() {
    const input = document.getElementById('announcementInput');
    const text = input.value.trim();
    
    if (!text) {
        alert('❌ الرجاء كتابة نص الإعلان!');
        return;
    }
    
    // حفظ الإعلان في localStorage
    localStorage.setItem('announcementText', text);
    localStorage.removeItem('announcementClosed');
    
    alert('✅ تم تحديث الإعلان بنجاح!\nسيظهر عند فتح المتجر.');
    input.value = '';
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
    
    // تحميل الملف للمستخدم
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.json';
    a.click();
    URL.revokeObjectURL(url);
    
    // حفظ في localStorage للتحديث الفوري
    localStorage.setItem('shopProducts', json);
    
    alert('✅ تم حفظ المنتجات!\n📁 قم برفع ملف products.json إلى GitHub لتحديث المتجر للجميع.');
}

// ===== دعم Enter لتسجيل الدخول =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.getElementById('loginContainer').style.display !== 'none') {
        verifyPassword();
    }
});

// ===== عرض المنتجات عند تحميل الصفحة =====
window.onload = function() {
    if (document.getElementById('adminPanel').style.display === 'block') {
        loadProducts();
    }
};
