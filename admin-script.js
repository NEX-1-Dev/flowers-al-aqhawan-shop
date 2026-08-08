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
            // في حال فشل التحميل، استخدم البيانات الافتراضية
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
            displayAdminProducts();
        });
}

// التحقق من كلمة السر
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

// الخروج
function logout() {
    document.getElementById('loginContainer').style.display = 'flex';
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('passwordInput').value = '';
}

// عرض المنتجات في لوحة التحكم
function displayAdminProducts() {
    const list = document.getElementById('adminProductsList');
    list.innerHTML = '';
    
    products.forEach(product => {
        const item = document.createElement('div');
        item.className = 'admin-product-item';
        item.innerHTML = `
            <img src="${product.image}" alt="منتج">
            <div class="item-info">
                <p><strong>الباقة رقم ${product.id}</strong></p>
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

// إضافة منتج جديد
function addProduct() {
    const image = document.getElementById('newImage').value.trim();
    const description = document.getElementById('newDescription').value.trim();
    const price = document.getElementById('newPrice').value.trim();
    
    if (!image || !description || !price) {
        alert('❌ الرجاء ملء جميع الحقول!');
        return;
    }
    
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    products.push({
        id: newId,
        image: image,
        description: description,
        price: price
    });
    
    // حفظ المنتجات في ملف JSON (عن طريق التحميل)
    saveProducts();
    
    // تفريغ الحقول
    document.getElementById('newImage').value = '';
    document.getElementById('newDescription').value = '';
    document.getElementById('newPrice').value = '';
    
    displayAdminProducts();
    alert('✅ تم إضافة المنتج بنجاح!');
}

// تعديل منتج
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const newImage = prompt('رابط الصورة الجديد:', product.image);
    if (newImage !== null) product.image = newImage;
    
    const newDescription = prompt('الوصف الجديد:', product.description);
    if (newDescription !== null) product.description = newDescription;
    
    const newPrice = prompt('السعر الجديد:', product.price);
    if (newPrice !== null) product.price = newPrice;
    
    saveProducts();
    displayAdminProducts();
    alert('✅ تم تعديل المنتج بنجاح!');
}

// حذف منتج
function deleteProduct(id) {
    if (!confirm('⚠️ هل أنت متأكد من حذف هذا المنتج؟')) return;
    
    products = products.filter(p => p.id !== id);
    saveProducts();
    displayAdminProducts();
    alert('✅ تم حذف المنتج بنجاح!');
}

// حفظ المنتجات (تنزيل ملف JSON محدث)
function saveProducts() {
    const data = { products: products };
    const json = JSON.stringify(data, null, 2);
    
    // تحميل الملف للمستخدم لحفظه يدوياً
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.json';
    a.click();
    URL.revokeObjectURL(url);
    
    // تحديث المتجر
    updateShopProducts();
}

// تحديث المتجر (عن طريق فتح نافذة المتجر)
function updateShopProducts() {
    // في الإصدار المجاني، سيتم تنبيه المستخدم لحفظ الملف ورفعه
    alert('📁 تم تحميل ملف products.json الجديد.\nالرجاء رفعه إلى مجلد الموقع على GitHub لتحديث المتجر.');
}

// دعم Enter لتسجيل الدخول
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.getElementById('loginContainer').style.display !== 'none') {
        verifyPassword();
    }
});

// عرض المنتجات عند تحميل الصفحة (إذا كان مسجلاً دخول)
window.onload = function() {
    // التحقق من حالة تسجيل الدخول (في حال تحديث الصفحة)
    if (document.getElementById('adminPanel').style.display === 'block') {
        loadProducts();
    }
};
