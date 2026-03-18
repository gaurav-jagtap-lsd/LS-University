/**
 * Navigation and Button Handler
 * Simple script to handle button clicks and navigation
 */

(function() {
    'use strict';

    console.log('🔘 Navigation handler loaded');

    document.addEventListener('DOMContentLoaded', function() {
        setupButtonHandlers();
    });

    /**
     * Setup click handlers for navigation buttons
     */
    function setupButtonHandlers() {
        try {
            // Hero CTA Button - Navigate to Admission
            const heroCTA = document.getElementById('hero-cta-btn');
            if (heroCTA) {
                heroCTA.addEventListener('click', function() {
                    navigateTo('admission.html');
                });
            }

            // Main Admission Button
            const mainAdmissionBtn = document.getElementById('main-admission-btn');
            if (mainAdmissionBtn) {
                mainAdmissionBtn.addEventListener('click', function() {
                    navigateTo('admission.html');
                });
            }

            // All CTA Links that should navigate to Admission
            const ctaLinks = document.querySelectorAll('.cta-link, .btn-primary[data-navigate="admission"]');
            ctaLinks.forEach(function(link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    navigateTo('admission.html');
                });
            });

            // Store button - Navigate to Store
            const storeBtn = document.getElementById('store-btn');
            if (storeBtn) {
                storeBtn.addEventListener('click', function() {
                    navigateTo('store.html');
                });
            }

            console.log('✅ Button handlers setup complete');
        } catch(error) {
            console.error('❌ Error setting up button handlers:', error);
        }
    }

    /**
     * Navigate to a page and push navigation event to GTM
     */
    function navigateTo(page) {
        try {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'page_navigation',
                destination_page: page,
                source_page: window.location.pathname
            });

            // Navigate after a short delay to allow GTM event processing
            setTimeout(() => {
                window.location.href = page;
            }, 50);
        } catch(error) {
            console.error('❌ Error during navigation:', error);
            window.location.href = page;
        }
    }

    console.log('✅ Navigation handler initialized');

})();
