/**
 * Store Management and Ecommerce Tracking
 * Handles shopping cart and purchase tracking for GA4/GTM
 */

(function() {
    'use strict';

    console.log('🛍️ Store module loaded');

    // Product catalog
    const products = [
        {
            id: 'lsu-hoodie',
            name: 'LS UNIVERSITY Hoodie',
            description: 'Comfortable premium cotton hoodie with university logo',
            price: 49.99,
            emoji: '👕'
        },
        {
            id: 'lsu-backpack',
            name: 'University Backpack',
            description: 'Durable laptop backpack with multiple compartments',
            price: 59.99,
            emoji: '🎒'
        },
        {
            id: 'lsu-notebook',
            name: 'LSU Notebook Set',
            description: 'Set of 3 premium notebooks with university branding',
            price: 24.99,
            emoji: '📓'
        },
        {
            id: 'lsu-pen',
            name: 'Branded Pen Pack',
            description: 'Pack of 10 high-quality pens with LSU logo',
            price: 14.99,
            emoji: '✏️'
        },
        {
            id: 'lsu-cap',
            name: 'University Baseball Cap',
            description: 'Classic adjustable cap with embroidered logo',
            price: 29.99,
            emoji: '🧢'
        },
        {
            id: 'lsu-mug',
            name: 'Coffee Mug',
            description: 'Ceramic mug perfect for daily use or as a gift',
            price: 14.99,
            emoji: '☕'
        },
        {
            id: 'lsu-tshirt',
            name: 'Classic T-Shirt',
            description: 'Comfortable 100% cotton t-shirt with LSU print',
            price: 24.99,
            emoji: '👔'
        },
        {
            id: 'lsu-waterbottle',
            name: 'Stainless Steel Water Bottle',
            description: 'Insulated water bottle keeps drinks cold or hot for hours',
            price: 34.99,
            emoji: '🧋'
        }
    ];

    // Shopping cart
    let cart = JSON.parse(localStorage.getItem('lsu_shopping_cart')) || [];

    document.addEventListener('DOMContentLoaded', function() {
        if (document.getElementById('products-grid')) {
            renderProducts();
            setupCartListeners();
            updateCart();
            
            // Track store page view
            trackStorePageView();
        }
    });

    /**
     * Render products to the grid
     */
    function renderProducts() {
        try {
            const grid = document.getElementById('products-grid');
            if (!grid) return;

            grid.innerHTML = '';
            
            products.forEach(function(product) {
                const quantity = getProductQuantity(product.id);
                const card = document.createElement('div');
                card.className = 'product-card';
                card.id = 'product-' + product.id;
                card.innerHTML = `
                    <div class="product-image">${product.emoji}</div>
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-description">${product.description}</div>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <div class="product-quantity">
                            <button class="quantity-btn qty-decrease" data-product-id="${product.id}">−</button>
                            <input type="number" class="quantity-input" value="${quantity}" data-product-id="${product.id}" min="0">
                            <button class="quantity-btn qty-increase" data-product-id="${product.id}">+</button>
                        </div>
                        <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
                    </div>
                `;
                grid.appendChild(card);
            });

            console.log('✅ Products rendered');
        } catch(error) {
            console.error('❌ Error rendering products:', error);
        }
    }

    /**
     * Setup event listeners for cart interactions
     */
    function setupCartListeners() {
        try {
            // Add to cart buttons
            document.querySelectorAll('.add-to-cart-btn').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    const productId = this.getAttribute('data-product-id');
                    const quantityInput = document.querySelector(`.quantity-input[data-product-id="${productId}"]`);
                    const quantity = parseInt(quantityInput.value) || 0;

                    if (quantity > 0) {
                        addToCart(productId, quantity);
                        quantityInput.value = 0;
                    }
                });
            });

            // Quantity buttons
            document.querySelectorAll('.qty-increase').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    const productId = this.getAttribute('data-product-id');
                    const input = document.querySelector(`.quantity-input[data-product-id="${productId}"]`);
                    input.value = parseInt(input.value) + 1;
                });
            });

            document.querySelectorAll('.qty-decrease').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    const productId = this.getAttribute('data-product-id');
                    const input = document.querySelector(`.quantity-input[data-product-id="${productId}"]`);
                    const newValue = Math.max(0, parseInt(input.value) - 1);
                    input.value = newValue;
                });
            });

            // Checkout button
            const checkoutBtn = document.getElementById('checkout-btn');
            if (checkoutBtn) {
                checkoutBtn.addEventListener('click', function() {
                    if (cart.length > 0) {
                        processCheckout();
                    }
                });
            }

            // Clear cart button
            const clearCartBtn = document.getElementById('clear-cart-btn');
            if (clearCartBtn) {
                clearCartBtn.addEventListener('click', function() {
                    clearCart();
                });
            }

            console.log('✅ Cart listeners setup complete');
        } catch(error) {
            console.error('❌ Error setting up cart listeners:', error);
        }
    }

    /**
     * Add item to cart
     */
    function addToCart(productId, quantity) {
        try {
            const product = products.find(p => p.id === productId);
            if (!product) return;

            // No automatic tracking events during cart updates (user requested manual tracking only)
            // Check if product already in cart
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    id: productId,
                    name: product.name,
                    price: product.price,
                    quantity: quantity
                });
            }

            // Save cart to localStorage
            localStorage.setItem('lsu_shopping_cart', JSON.stringify(cart));
            updateCart();
            console.log('✅ Item added to cart:', productId, 'Qty:', quantity);
        } catch(error) {
            console.error('❌ Error adding to cart:', error);
        }
    }

    /**
     * Remove item from cart
     */
    function removeFromCart(productId) {
        try {
            const item = cart.find(i => i.id === productId);
            if (!item) return;

            // No automatic tracking events during cart removal
            cart = cart.filter(item => item.id !== productId);
            localStorage.setItem('lsu_shopping_cart', JSON.stringify(cart));
            updateCart();
            console.log('✅ Item removed from cart:', productId);
        } catch(error) {
            console.error('❌ Error removing from cart:', error);
        }
    }

    /**
     * Clear entire cart
     */
    function clearCart() {
        try {
            // No automatic tracking events during cart clearing
            cart = [];
            localStorage.removeItem('lsu_shopping_cart');
            updateCart();
            console.log('✅ Cart cleared');
        } catch(error) {
            console.error('❌ Error clearing cart:', error);
        }
    }

    /**
     * Update cart display
     */
    function updateCart() {
        try {
            const cartItemsContainer = document.getElementById('cart-items');
            const cartCountEl = document.getElementById('cart-count');
            const subtotalEl = document.getElementById('subtotal');
            const taxEl = document.getElementById('tax');
            const totalEl = document.getElementById('total');
            const checkoutBtn = document.getElementById('checkout-btn');

            if (!cartItemsContainer) return;

            const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCountEl.textContent = cartCount;

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
                checkoutBtn.disabled = true;
            } else {
                cartItemsContainer.innerHTML = '';
                cart.forEach(function(item) {
                    const itemEl = document.createElement('div');
                    itemEl.className = 'cart-item';
                    itemEl.innerHTML = `
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-quantity">Qty: ${item.quantity}</div>
                            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                        <button class="remove-btn" data-product-id="${item.id}">Remove</button>
                    `;
                    cartItemsContainer.appendChild(itemEl);

                    // Add remove listener
                    itemEl.querySelector('.remove-btn').addEventListener('click', function() {
                        removeFromCart(item.id);
                    });
                });

                checkoutBtn.disabled = false;
            }

            // Update totals
            const subtotal = calculateCartTotal();
            const tax = subtotal * 0.1;
            const total = subtotal + tax;

            subtotalEl.textContent = '$' + subtotal.toFixed(2);
            taxEl.textContent = '$' + tax.toFixed(2);
            totalEl.textContent = '$' + total.toFixed(2);

            console.log('✅ Cart display updated');
        } catch(error) {
            console.error('❌ Error updating cart display:', error);
        }
    }

    /**
     * Calculate total cart value
     */
    function calculateCartTotal() {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    /**
     * Get quantity of a product (for display in input)
     */
    function getProductQuantity(productId) {
        const item = cart.find(i => i.id === productId);
        return item ? item.quantity : 0;
    }

    /**
     * Process checkout - simulates purchase
     */
    function processCheckout() {
        try {
            const subtotal = calculateCartTotal();
            const tax = subtotal * 0.1;
            const total = subtotal + tax;

            // Generate order ID
            const orderId = 'ORD_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

            // No automatic purchase tracking event fired here.
            console.log('✅ Purchase completed (no auto-tracking):', orderId);

            // Show success message
            alert(`🎉 Thank you for your purchase!\n\nOrder ID: ${orderId}\nTotal: $${total.toFixed(2)}\n\nShipping confirmation will be sent to your email.`);

            // Clear cart after successful checkout
            cart = [];
            localStorage.removeItem('lsu_shopping_cart');
            updateCart();

        } catch(error) {
            console.error('❌ Error processing checkout:', error);
            alert('❌ Error processing checkout. Please try again.');
        }
    }

    /**
     * Track store page view with product list
     */
    function trackStorePageView() {
        try {
            // No automatic store page view tracking is performed in this project.
            console.log('✅ Store page view processing skipped (manual tracking only)');
        } catch(error) {
            console.error('❌ Error in store page view handling:', error);
        }
    }

    console.log('✅ Store module fully initialized');

})();
