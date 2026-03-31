// Store functionality for LS University Store
class StoreManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentCategory = 'all';
        this.searchTerm = '';

        this.init();
    }

    async init() {
        await this.loadProducts();
        this.setupEventListeners();
        this.renderProducts();
    }

    async loadProducts() {
        try {
            const response = await fetch('inventory.csv');
            const csvText = await response.text();
            this.products = this.parseCSV(csvText);
            this.filteredProducts = [...this.products];

            // Track store page view
            if (window.dataLayer) {
                window.dataLayer.push({
                    'event': 'store_page_view',
                    'page_title': 'Store',
                    'page_location': window.location.href
                });
            }
        } catch (error) {
            console.error('Error loading products:', error);
            this.showError('Failed to load products. Please try again later.');
        }
    }

    parseCSV(csvText) {
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());

        return lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim());
            const product = {};

            headers.forEach((header, index) => {
                product[header.toLowerCase().replace(' ', '_')] = values[index] || '';
            });

            return product;
        });
    }

    setupEventListeners() {
        // Category filter
        const categorySelect = document.getElementById('category-select');
        if (categorySelect) {
            categorySelect.addEventListener('change', (e) => {
                this.currentCategory = e.target.value;
                this.filterProducts();

                // Track category filter
                if (window.dataLayer) {
                    window.dataLayer.push({
                        'event': 'store_filter',
                        'filter_type': 'category',
                        'filter_value': this.currentCategory
                    });
                }
            });
        }

        // Search functionality
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.filterProducts();
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.filterProducts();

                // Track search
                if (window.dataLayer && this.searchTerm) {
                    window.dataLayer.push({
                        'event': 'store_search',
                        'search_term': this.searchTerm
                    });
                }
            });
        }
    }

    filterProducts() {
        this.filteredProducts = this.products.filter(product => {
            const matchesCategory = this.currentCategory === 'all' ||
                                  product.category.toLowerCase() === this.currentCategory.toLowerCase();

            const matchesSearch = !this.searchTerm ||
                                product.product_name.toLowerCase().includes(this.searchTerm) ||
                                product.description.toLowerCase().includes(this.searchTerm) ||
                                product.category.toLowerCase().includes(this.searchTerm);

            return matchesCategory && matchesSearch;
        });

        this.renderProducts();
    }

    renderProducts() {
        const grid = document.getElementById('products-grid');
        if (!grid) return;

        if (this.filteredProducts.length === 0) {
            grid.innerHTML = '<div class="no-products">No products found matching your criteria.</div>';
            return;
        }

        grid.innerHTML = this.filteredProducts.map(product => this.createProductCard(product)).join('');
    }

    createProductCard(product) {
        const imageUrl = product.image || 'assets/placeholder.jpg';
        const stockStatus = parseInt(product.stock) > 0 ? 'In Stock' : 'Out of Stock';
        const stockClass = parseInt(product.stock) > 0 ? 'in-stock' : 'out-of-stock';

        return `
            <div class="product-card" data-product-id="${product.product_name.toLowerCase().replace(/\s+/g, '-')}">
                <div class="product-image">
                    <img src="${imageUrl}" alt="${product.product_name}" onerror="this.src='assets/placeholder.jpg'">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.product_name}</h3>
                    <p class="product-category">${product.category}</p>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">$${parseFloat(product.price).toFixed(2)}</div>
                    <div class="product-stock ${stockClass}">${stockStatus}</div>
                    <button class="btn btn-primary add-to-cart-btn"
                            data-product="${product.product_name}"
                            data-price="${product.price}"
                            ${parseInt(product.stock) === 0 ? 'disabled' : ''}>
                        ${parseInt(product.stock) > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        `;
    }

    showError(message) {
        const grid = document.getElementById('products-grid');
        if (grid) {
            grid.innerHTML = `<div class="error-message">${message}</div>`;
        }
    }
}

// Initialize store when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StoreManager();
});

// Add to cart functionality (basic implementation)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const productName = e.target.dataset.product;
        const price = e.target.dataset.price;

        // Track add to cart event
        if (window.dataLayer) {
            window.dataLayer.push({
                'event': 'add_to_cart',
                'product_name': productName,
                'price': price,
                'currency': 'USD'
            });
        }

        // Basic cart functionality - you could expand this
        alert(`Added ${productName} to cart for $${price}`);

        // Here you could implement actual cart storage, quantity management, etc.
    }
});