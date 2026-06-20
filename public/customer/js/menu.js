/* DFC Menu Catalogue Logic
   Updated: Phase 2 Cart integration verified and documented. */

// Mock Database of food products aligning exactly with existing images
const DFC_MENU_ITEMS = [
    // Biryani Category
    {
        id: 'biryani-01',
        name: 'DFC Special Chicken Biryani',
        description: 'Aromatic long grain basmati rice layered with spiced chicken, mint, saffron, and special Dadu spices.',
        price: 320,
        discountPrice: null,
        category: 'Biryani',
        image: '../images/birayani-image.jpeg',
        badge: 'Best Seller',
        rating: 4.8
    },
    {
        id: 'biryani-02',
        name: 'Chicken Biryani (Double Plate)',
        description: 'Double serving of fragrant basmati rice layered with two tender chicken pieces, served with spicy raita.',
        price: 420,
        discountPrice: 390,
        category: 'Biryani',
        image: '../images/biryani-image1.jpeg',
        badge: 'Popular',
        rating: 4.7
    },
    {
        id: 'biryani-03',
        name: 'Shahi Beef Biryani',
        description: 'Traditional recipe using marinated beef chunks cooked with potatoes and hot green chillies, steamed in layers.',
        price: 380,
        discountPrice: null,
        category: 'Biryani',
        image: '../images/biryani-image2.jpeg',
        badge: null,
        rating: 4.5
    },
    {
        id: 'biryani-04',
        name: 'Sada Biryani (Plain Basmati)',
        description: 'Fluffy seasoned basmati biryani rice cooked without chicken. Very aromatic and served hot.',
        price: 160,
        discountPrice: null,
        category: 'Biryani',
        image: '../images/biryani-image3.jpeg',
        badge: null,
        rating: 4.2
    },

    // Zinger & Broast
    {
        id: 'zinger-01',
        name: 'Crispy Zinger Double Decker',
        description: 'Double crunchy chicken breast patty, fresh lettuce, cheddar cheese, and spicy house mayonnaise.',
        price: 450,
        discountPrice: null,
        category: 'Zinger & Broast',
        image: '../images/zingerimmage.jpeg',
        badge: 'Premium',
        rating: 4.9
    },
    {
        id: 'zinger-02',
        name: 'Single Zinger Burger',
        description: 'Crispy golden fried chicken fillet, fresh shredded cabbage, and signature white garlic cream mayo.',
        price: 290,
        discountPrice: null,
        category: 'Zinger & Broast',
        image: '../images/Zinger-Broast-image.jpeg',
        badge: 'Classic',
        rating: 4.6
    },
    {
        id: 'broast-01',
        name: 'Crispy Quarter Chicken Broast',
        description: 'A deep-fried quarter chicken section (leg/breast) marinated in DFC secret spices, served with french fries.',
        price: 380,
        discountPrice: null,
        category: 'Zinger & Broast',
        image: '../images/Broast-deal.4.jpeg',
        badge: 'Hot Seller',
        rating: 4.7
    },

    // Pizza
    {
        id: 'pizza-01',
        name: 'Cheesy Supreme Pizza',
        description: 'Our signature pizza loaded with spicy chicken chunks, bell peppers, black olives, onions, and lots of mozzarella.',
        price: 890,
        discountPrice: null,
        category: 'Pizza',
        image: '../images/pizaaa-imaage.jpeg',
        badge: 'Top Choice',
        rating: 4.8
    },

    // Rolls
    {
        id: 'roll-01',
        name: 'Garlic Mayo Chicken Roll',
        description: 'Spicy grilled chicken cubes rolled inside a flaky paratha with garlic sauce, mint chutney, and sliced onions.',
        price: 220,
        discountPrice: null,
        category: 'Rolls',
        image: '../images/Roll-deal.3.jpeg',
        badge: 'Quick Bite',
        rating: 4.4
    },

    // Deals
    {
        id: 'deal-01',
        name: 'Student Zinger Deal (Deal 1)',
        description: '1 Classic Crispy Zinger Burger, 1 Regular Golden Fries, and a 250ml cold soft drink.',
        price: 390,
        discountPrice: null,
        category: 'Deals',
        image: '../images/Burger-Deal.1.jpeg',
        badge: 'Mega Value',
        rating: 4.8
    },
    {
        id: 'deal-02',
        name: 'Double Pizza Feast (Deal 2)',
        description: '2 Medium Chicken Tikka/Fajita Pizzas + 1 Litre Soft Drink. (Best choice for three people).',
        price: 1190,
        discountPrice: null,
        category: 'Deals',
        image: '../images/Pizza-deal.2.jpeg',
        badge: 'Family Deal',
        rating: 4.9
    },
    {
        id: 'deal-03',
        name: 'Couple Quarter Broast Deal (Deal 6)',
        description: '2 Quarter Crispy Broast pieces, medium French Fries, coleslaw, bun, and 2 soft drinks.',
        price: 780,
        discountPrice: 720,
        category: 'Deals',
        image: '../images/Special-deal.6.jpeg',
        badge: '2 Person Deal',
        rating: 4.7
    },
    {
        id: 'deal-04',
        name: 'DFC Special Mega Deal (Deal 7)',
        description: '1 Medium Pizza, 2 Crispy Zinger Burgers, French Fries, and 1.5 Litre cold soft drink.',
        price: 1490,
        discountPrice: null,
        category: 'Deals',
        image: '../images/DFC-deal.7.jpeg',
        badge: 'Special Deal',
        rating: 5.0
    },
    {
        id: 'deal-05',
        name: 'Haleem Combo (Deal 5)',
        description: '1 Bowl of Shahi Chicken Haleem topped with ginger & fried onions, 2 Naans, and 1 Regular Soft Drink.',
        price: 280,
        discountPrice: null,
        category: 'Deals',
        image: '../images/Muharam-deal.5.jpeg',
        badge: 'Local Classic',
        rating: 4.6
    }
];

// Controller for menu catalog
document.addEventListener('DOMContentLoaded', () => {
    const menuGrid = document.getElementById('menu-grid');
    const searchInput = document.getElementById('menu-search-input');
    const categoryFilters = document.getElementById('category-filters');
    const noItemsMessage = document.getElementById('no-items-message');
    
    let activeCategory = 'All';
    let searchQuery = '';

    // Check if category is passed in URL query parameter (e.g. ?category=Deals)
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        activeCategory = decodeURIComponent(categoryParam);
        
        // Update active class on category buttons
        const filterBtns = categoryFilters.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            if (btn.getAttribute('data-category') === activeCategory) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Function to render items based on criteria
    function renderMenu() {
        // Clear previous grid
        menuGrid.innerHTML = '';
        
        // Filter items
        const filteredItems = DFC_MENU_ITEMS.filter(item => {
            const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  item.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        // Show/Hide Empty State
        if (filteredItems.length === 0) {
            noItemsMessage.style.display = 'block';
            menuGrid.style.display = 'none';
            return;
        } else {
            noItemsMessage.style.display = 'none';
            menuGrid.style.display = 'grid';
        }

        // Generate Cards
        filteredItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'food-card';
            
            // Badge HTML
            const badgeHtml = item.badge ? `<span class="food-badge">${item.badge}</span>` : '';
            
            // Price Display HTML (check if discount is available)
            let priceHtml = '';
            if (item.discountPrice) {
                priceHtml = `Rs. ${item.discountPrice} <span class="price-old">Rs. ${item.price}</span>`;
            } else {
                priceHtml = `Rs. ${item.price}`;
            }

            const currentPrice = item.discountPrice ? item.discountPrice : item.price;

            card.innerHTML = `
                ${badgeHtml}
                <div class="food-image-wrapper">
                    <img src="${item.image}" alt="${item.name}" class="food-img" loading="lazy">
                </div>
                <div class="food-info">
                    <span class="food-category">${item.category}</span>
                    <h3 class="food-title">${item.name}</h3>
                    <p class="food-desc">${item.description}</p>
                    <div class="food-footer">
                        <span class="food-price">${priceHtml}</span>
                        <button class="add-to-cart-btn" onclick="addToCart('${item.id}', '${item.name.replace(/'/g, "\\'")}', ${currentPrice}, '${item.image}')" aria-label="Add ${item.name} to cart">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
            menuGrid.appendChild(card);
        });
    }

    // Event listener for category filters
    categoryFilters.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            // Remove active class from previous
            categoryFilters.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            
            // Set active class
            e.target.classList.add('active');
            
            // Update filter & render
            activeCategory = e.target.getAttribute('data-category');
            renderMenu();
        }
    });

    // Event listener for search input (with simple debounce)
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchQuery = e.target.value;
            renderMenu();
        }, 150);
    });

    // Initial render
    renderMenu();
});
