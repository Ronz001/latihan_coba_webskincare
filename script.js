// Menu data
const menuItems = [
    {
        id: 1,
        name: "Ayam Geprek Original",
        price: 15000,
        description: "Ayam geprek original dengan sambal pedas khas King Geprek. Disajikan dengan nasi putih hangat dan lalapan segar.",
        imageUrl: "https://akcdn.detik.net.id/visual/2022/03/09/ayam-geprek_11.jpeg?w=720&q=90"
    },
    {
        id: 2,
        name: "Ayam Geprek Keju",
        price: 20000,
        description: "Ayam geprek dengan taburan keju mozzarella yang melimpah. Perpaduan sempurna antara pedas dan gurih yang menggugah selera.",
        imageUrl: "https://www.dapurkobe.co.id/wp-content/uploads/ayam-geprek-keju.jpg"
    },
    {
        id: 3,
        name: "Ayam Geprek Matah",
        price: 18000,
        description: "Ayam geprek dengan sambal matah khas Bali yang segar. Kombinasi sempurna antara pedas, asam, dan aroma daun jeruk yang menggoda.",
        imageUrl: "https://www.kontenpedia.com/foldershared/images/2022/arso/12-Dec/image_2022-12-27_073830114.png"
    },
    {
        id: 4,
        name: "Ayam Geprek Telur",
        price: 17000,
        description: "Ayam geprek dengan telur mata sapi di atasnya. Kuning telur yang lumer menambah kenikmatan setiap gigitannya.",
        imageUrl: "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/5abbef2d-557a-4be2-901e-f2bb0de6d9bf_f10eaea1-05e7-407e-88b3-5d2ea2173dcc_Go-Biz_20200217_025325.jpeg"
    },
    {
        id: 5,
        name: "Ayam Geprek Mozzarella",
        price: 22000,
        description: "Ayam geprek dengan lelehan keju mozzarella yang berlimpah. Sensasi keju yang meleleh di mulut membuat menu ini menjadi favorit.",
        imageUrl: "https://media.tampang.com/tm_images/article/202501/buah-organikzxk4ib98akovxbde.jpg"
    },
    {
        id: 6,
        name: "Ayam Geprek Sambal Ijo",
        price: 18000,
        description: "Ayam geprek dengan sambal hijau yang segar dan pedas. Terbuat dari cabai hijau pilihan yang memberikan sensasi pedas yang berbeda.",
        imageUrl: "https://assets.unileversolutions.com/recipes-v2/230947.jpg"
    }
];

// Global cart array
let cart = [];

// DOM elements
const menuContainer = document.getElementById('menuContainer');
const menuModal = document.getElementById('menuModal');
const modalOverlay = document.getElementById('modalOverlay');
const closeModalBtn = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDescription = document.getElementById('modalDescription');
const modalImage = document.getElementById('modalImage');
const itemQuantityInput = document.getElementById('itemQuantity');
const decrementQuantityBtn = document.getElementById('decrementQuantity');
const incrementQuantityBtn = document.getElementById('incrementQuantity');
const spicyLevelSelect = document.getElementById('spicyLevel');
const addToCartBtn = document.getElementById('addToCartBtn');
const cartButton = document.getElementById('cartButton');
const cartBadge = document.getElementById('cartBadge');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartBtn = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartSubtotalSpan = document.getElementById('cartSubtotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Helper function to format currency
const formatCurrency = (amount) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
};

// Render menu items dynamically
function renderMenuItems() {
    menuContainer.innerHTML = '';
    menuItems.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.className = 'menu-item bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg';
        menuItemElement.innerHTML = `
            <div class="h-48 bg-orange-100 flex items-center justify-center">
                <img src="${item.imageUrl}" alt="${item.name}" class="w-full h-full object-cover">
            </div>
            <div class="p-4">
                <h3 class="text-xl font-bold text-gray-800 mb-2">${item.name}</h3>
                <p class="text-orange-600 font-bold mb-2">${formatCurrency(item.price)}</p>
                <p class="text-gray-600 mb-4 line-clamp-2">${item.description}</p>
                <button class="view-item-btn w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300" data-id="${item.id}">
                    Lihat Detail
                </button>
            </div>
        `;
        menuContainer.appendChild(menuItemElement);
    });
}

// Open item modal
function openItemModal(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (!item) return;

    modalTitle.textContent = item.name;
    modalPrice.textContent = formatCurrency(item.price);
    modalDescription.textContent = item.description;
    modalImage.innerHTML = `<img src="${item.imageUrl}" alt="${item.name}" class="w-full h-full object-cover">`;
    itemQuantityInput.value = 1;
    spicyLevelSelect.value = 3;
    addToCartBtn.setAttribute('data-id', itemId);

    menuModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Close item modal
function closeItemModal() {
    menuModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Update cart badge
function updateCartBadge() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (totalItems > 0) {
        cartBadge.textContent = totalItems;
        cartBadge.classList.remove('hidden');
    } else {
        cartBadge.classList.add('hidden');
    }
}

// Show toast notification
function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-300 translate-y-20 opacity-0';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    setTimeout(() => {
        toast.classList.remove('translate-y-20', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

// Add item to cart
function addToCart() {
    const itemId = parseInt(addToCartBtn.getAttribute('data-id'));
    const quantity = parseInt(itemQuantityInput.value);
    const spicyLevel = parseInt(spicyLevelSelect.value);

    const item = menuItems.find(item => item.id === itemId);
    if (!item) return;

    const existingItemIndex = cart.findIndex(cartItem =>
        cartItem.id === itemId && cartItem.spicyLevel === spicyLevel
    );

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({
            id: itemId,
            name: item.name,
            price: item.price,
            quantity: quantity,
            spicyLevel: spicyLevel,
            imageUrl: item.imageUrl
        });
    }

    updateCartBadge();
    closeItemModal();
    showToast(`${quantity}x ${item.name} ditambahkan ke keranjang`);
}

// Get spicy level text for display
function getSpicyLevelText(level) {
    const levels = [
        "Tidak Pedas",
        "Level 1",
        "Level 2",
        "Level 3",
        "Level 4",
        "Level 5 (Sangat Pedas)"
    ];
    return levels[level];
}

// Render items in the cart sidebar
function renderCartItems() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p>Keranjang belanja Anda kosong</p>
            </div>
        `;
    } else {
        cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item flex items-center p-3 mb-3 bg-white rounded-lg shadow-sm';
            cartItemElement.innerHTML = `
                <div class="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <img src="${item.imageUrl}" alt="${item.name}" class="w-full h-full object-cover rounded-lg">
                </div>
                <div class="flex-grow">
                    <h4 class="font-bold text-gray-800">${item.name}</h4>
                    <p class="text-sm text-gray-600">Level Pedas: ${getSpicyLevelText(item.spicyLevel)}</p>
                    <div class="flex justify-between items-center mt-1">
                        <span class="text-orange-600 font-bold">${formatCurrency(item.price * item.quantity)}</span>
                        <div class="flex items-center">
                            <button class="decrement-cart-item bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-l text-sm" data-index="${index}">-</button>
                            <span class="bg-gray-100 text-center w-8 py-1 text-sm">${item.quantity}</span>
                            <button class="increment-cart-item bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-r text-sm" data-index="${index}">+</button>
                            <button class="remove-cart-item ml-2 text-red-500 hover:text-red-700" data-index="${index}">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
    }
    addCartItemEventListeners();
    updateCartSubtotal();
}

// Add event listeners to cart items (for quantity and removal)
function addCartItemEventListeners() {
    document.querySelectorAll('.increment-cart-item').forEach(button => {
        button.onclick = function() {
            const index = parseInt(this.getAttribute('data-index'));
            cart[index].quantity += 1;
            renderCartItems();
            updateCartBadge();
        };
    });

    document.querySelectorAll('.decrement-cart-item').forEach(button => {
        button.onclick = function() {
            const index = parseInt(this.getAttribute('data-index'));
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
            renderCartItems();
            updateCartBadge();
        };
    });

    document.querySelectorAll('.remove-cart-item').forEach(button => {
        button.onclick = function() {
            const index = parseInt(this.getAttribute('data-index'));
            const itemName = cart[index].name;
            cart.splice(index, 1);
            renderCartItems();
            updateCartBadge();
            showToast(`${itemName} dihapus dari keranjang`);
        };
    });
}

// Update cart subtotal
function updateCartSubtotal() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartSubtotalSpan.textContent = formatCurrency(subtotal);

    if (cart.length === 0) {
        checkoutBtn.disabled = true;
        checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        checkoutBtn.disabled = false;
        checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

// Open cart sidebar
function openCart() {
    renderCartItems();
    cartSidebar.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
}

// Close cart sidebar
function closeCart() {
    cartSidebar.classList.add('translate-x-full');
    document.body.style.overflow = 'auto';
}

// Checkout function via WhatsApp
function checkout() {
    if (cart.length === 0) return;

    let message = "Halo King Geprek, saya ingin memesan:\n\n";

    cart.forEach(item => {
        message += `${item.quantity}x ${item.name} (Level Pedas: ${getSpicyLevelText(item.spicyLevel)})\n`;
    });

    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    message += `\nTotal: ${formatCurrency(subtotal)}\n\nTerima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/08319090200?text=${encodedMessage}`, '_blank');
}

// --- FUNGSI BARU UNTUK MENGATUR TAMPILAN SEKSI ---
function showSection(sectionId) {
    // Sembunyikan semua bagian konten kecuali modal dan sidebar keranjang
    document.querySelectorAll('body > section').forEach(section => {
        section.style.display = 'none';
    });

    // Tampilkan hanya bagian yang diminta
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block'; // Sesuaikan 'block' atau 'flex' jika tata letak Anda memerlukannya
    }
}
// --- AKHIR FUNGSI BARU ---


// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    renderMenuItems();
    updateCartBadge();
    

    // Event Listeners for menu item modal (tetap sama)
    document.querySelectorAll('.view-item-btn').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            openItemModal(itemId);
        });
    });
    closeModalBtn.addEventListener('click', closeItemModal);
    modalOverlay.addEventListener('click', closeItemModal);

    // Quantity controls in modal (tetap sama)
    decrementQuantityBtn.addEventListener('click', function() {
        let quantity = parseInt(itemQuantityInput.value);
        if (quantity > 1) {
            itemQuantityInput.value = quantity - 1;
        }
    });
    incrementQuantityBtn.addEventListener('click', function() {
        let quantity = parseInt(itemQuantityInput.value);
        itemQuantityInput.value = quantity + 1;
    });

    // Add to cart button (tetap sama)
    addToCartBtn.addEventListener('click', addToCart);

    // Cart sidebar (tetap sama)
    cartButton.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);

    // Checkout button (tetap sama)
    checkoutBtn.addEventListener('click', checkout);


    // --- KODE UNTUK NAVIGASI SPA DAN TAMPILAN AWAL ---
    // Tambahkan event listener untuk tautan navigasi
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Mencegah perilaku default (melompat ke anchor)
            const sectionId = this.getAttribute('href').substring(1); // Ambil ID dari href (misal: "home" dari "#home")
            showSection(sectionId);

            // Opsional: perbarui URL tanpa memuat ulang halaman (misal: yoursite.com/#menu)
            // Ini membantu jika user me-refresh halaman atau ingin berbagi link ke bagian tertentu
            history.pushState(null, '', '#' + sectionId);
        });
    });

    // --- TEMPATKAN KODE TAMBAHAN UNTUK TOMBOL "Lihat Menu" DI SINI ---
    // Cari tombol "Lihat Menu" di bagian 'home'
    const viewMenuButton = document.querySelector('#home a[href="#menu"]');
    if (viewMenuButton) { // Pastikan tombolnya ditemukan
        viewMenuButton.addEventListener('click', function(event) {
            event.preventDefault(); // Mencegah perilaku default (melompat anchor)
            showSection('menu'); // Panggil fungsi untuk menampilkan bagian menu
            history.pushState(null, '', '#menu'); // Opsional: perbarui URL
        });
    }
    // --- AKHIR KODE TAMBAHAN ---

    // Tampilkan bagian "home" saat halaman pertama kali dimuat
    // atau bagian berdasarkan hash di URL jika ada
    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        showSection(initialHash);
    } else {
        showSection('home'); // Default ke beranda jika tidak ada hash atau hash tidak valid
    }
    // --- AKHIR KODE BARU ---
});