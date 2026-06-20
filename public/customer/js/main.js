/* Shared Navigation and Shell Scripts - DFC */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(11, 11, 11, 0.95)';
            navbar.style.padding = '5px 0';
        } else {
            navbar.style.backgroundColor = 'rgba(11, 11, 11, 0.8)';
            navbar.style.padding = '0';
        }
    });

    // 2. Mobile Nav Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navbarLinks = document.querySelector('.navbar-links');

    if (mobileNavToggle && navbarLinks) {
        mobileNavToggle.addEventListener('click', () => {
            navbarLinks.classList.toggle('active');
            
            // Toggle hamburger icon between ☰ and ✕
            const icon = mobileNavToggle.querySelector('svg') || mobileNavToggle;
            if (navbarLinks.classList.contains('active')) {
                mobileNavToggle.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                `;
            } else {
                mobileNavToggle.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                `;
            }
        });
    }

    // 3. Highlight Active Link in Navigation
    const currentPath = window.location.pathname;
    const navAnchors = document.querySelectorAll('.navbar-links a');
    
    navAnchors.forEach(anchor => {
        const hrefAttr = anchor.getAttribute('href');
        // Simple matching logic
        if (currentPath.endsWith(hrefAttr) || (currentPath === '/' && hrefAttr === 'index.html')) {
            anchor.classList.add('active');
        } else {
            anchor.classList.remove('active');
        }
    });

    // 4. Cart Badge Handler
    updateGlobalCartBadge();
});

// Function to update global cart badge
function updateGlobalCartBadge() {
    const badge = document.getElementById('global-cart-count');
    if (!badge) return;
    
    try {
        const cart = JSON.parse(localStorage.getItem('dfc_cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (totalItems > 0) {
            badge.textContent = totalItems;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    } catch (e) {
        console.error("Error reading cart from localStorage", e);
        badge.style.display = 'none';
    }
}

// Global function to add to cart
function addToCart(itemId, itemName, itemPrice, itemImage) {
    try {
        let cart = JSON.parse(localStorage.getItem('dfc_cart')) || [];
        
        const existingItemIndex = cart.findIndex(item => item.id === itemId);
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({
                id: itemId,
                name: itemName,
                price: Number(itemPrice),
                image: itemImage,
                quantity: 1
            });
        }
        
        localStorage.setItem('dfc_cart', JSON.stringify(cart));
        updateGlobalCartBadge();
        
        // Custom visual notification for added to cart
        showNotification(`${itemName} added to your cart!`);
    } catch (e) {
        console.error("Error adding item to cart", e);
    }
}

// Display temporary notification
function showNotification(message) {
    const notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) {
        // Create container if it doesn't exist
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.position = 'fixed';
        container.style.bottom = '20px';
        container.style.right = '20px';
        container.style.zIndex = '9999';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '10px';
        document.body.appendChild(container);
    }
    
    const container = document.getElementById('notification-container');
    const toast = document.createElement('div');
    toast.style.backgroundColor = 'var(--primary)';
    toast.style.color = 'var(--text-dark)';
    toast.style.padding = '0.75rem 1.5rem';
    toast.style.borderRadius = 'var(--radius-md)';
    toast.style.fontFamily = 'var(--font-heading)';
    toast.style.fontWeight = '600';
    toast.style.boxShadow = 'var(--shadow-md)';
    toast.style.border = '1px solid rgba(0,0,0,0.1)';
    toast.style.transform = 'translateY(50px)';
    toast.style.opacity = '0';
    toast.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    toast.textContent = message;
    
    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 10);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateY(-20px)';
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}
