/* DFC Shopping Cart Core Logic */

document.addEventListener('DOMContentLoaded', () => {
    initCartPage();
});

// Main cart page initializer
function initCartPage() {
    const loadingView = document.getElementById('cart-loading');
    const emptyView = document.getElementById('empty-cart-view');
    const activeView = document.getElementById('active-cart-view');
    const itemsList = document.getElementById('cart-items-list');

    if (!itemsList) return; // Exit if not on the cart page

    // Read cart data from LocalStorage
    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem('dfc_cart')) || [];
    } catch (e) {
        console.error("Failed to parse cart JSON data", e);
        cart = [];
    }

    // Hide loader
    loadingView.style.display = 'none';

    // If cart is empty
    if (cart.length === 0) {
        emptyView.style.display = 'block';
        activeView.style.display = 'none';
        return;
    }

    // If cart has items
    emptyView.style.display = 'none';
    activeView.style.display = 'grid';

    // Render items list
    itemsList.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        subtotal += itemSubtotal;

        const card = document.createElement('div');
        card.className = 'cart-item-card';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <span class="cart-item-category">Product Item</span>
                <h4 class="cart-item-name">${item.name}</h4>
                <div class="cart-item-price-each">Rs. ${item.price} each</div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controller">
                    <button class="qty-btn" onclick="adjustItemQuantity('${item.id}', -1)" aria-label="Decrease quantity">-</button>
                    <span class="qty-val">${item.quantity}</span>
                    <button class="qty-btn" onclick="adjustItemQuantity('${item.id}', 1)" aria-label="Increase quantity">+</button>
                </div>
                <div class="cart-item-subtotal">Rs. ${itemSubtotal}</div>
                <button class="remove-btn" onclick="removeCartItem('${item.id}')" aria-label="Remove item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            </div>
        `;
        itemsList.appendChild(card);
    });

    // Update Summary Values
    const deliveryCharges = 100; // Flat delivery charges
    const grandTotal = subtotal + deliveryCharges;

    document.getElementById('summary-subtotal').textContent = `Rs. ${subtotal}`;
    document.getElementById('summary-delivery').textContent = `Rs. ${deliveryCharges}`;
    document.getElementById('summary-grand-total').textContent = `Rs. ${grandTotal}`;
}

// Adjust item quantity by amount (+1 or -1)
function adjustItemQuantity(itemId, amount) {
    try {
        let cart = JSON.parse(localStorage.getItem('dfc_cart')) || [];
        const itemIndex = cart.findIndex(item => item.id === itemId);

        if (itemIndex > -1) {
            cart[itemIndex].quantity += amount;

            // If quantity drops to zero or less, remove item
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }

            localStorage.setItem('dfc_cart', JSON.stringify(cart));
            
            // Re-render
            initCartPage();
            
            // Update global navbar badge if main.js exists
            if (typeof updateGlobalCartBadge === 'function') {
                updateGlobalCartBadge();
            }
        }
    } catch (e) {
        console.error("Failed to adjust item quantity", e);
    }
}

// Explicitly remove an item from the cart
function removeCartItem(itemId) {
    try {
        let cart = JSON.parse(localStorage.getItem('dfc_cart')) || [];
        const filteredCart = cart.filter(item => item.id !== itemId);
        
        localStorage.setItem('dfc_cart', JSON.stringify(filteredCart));
        
        // Re-render
        initCartPage();
        
        // Update global navbar badge
        if (typeof updateGlobalCartBadge === 'function') {
            updateGlobalCartBadge();
        }
        
        if (typeof showNotification === 'function') {
            showNotification("Item removed from your cart.");
        }
    } catch (e) {
        console.error("Failed to remove item from cart", e);
    }
}
