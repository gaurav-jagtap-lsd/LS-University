/**
 * Navigation and Button Handler
 * Simple script to handle button clicks and navigation
 */

(function() {
    'use strict';

    console.log('🔘 Navigation handler loaded');

    document.addEventListener('DOMContentLoaded', function() {
        setupButtonHandlers();
        setupFeatureCardHandlers();
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

            console.log('✅ Button handlers setup complete');
        } catch(error) {
            console.error('❌ Error setting up button handlers:', error);
        }
    }

    /**
     * Setup click handlers for feature cards
     */
    function setupFeatureCardHandlers() {
        try {
            const featureCards = document.querySelectorAll('.feature-card');
            featureCards.forEach(function(card) {
                card.addEventListener('click', function() {
                    navigateTo('programs.html');
                });
            });

            console.log('✅ Feature card handlers setup complete');
        } catch(error) {
            console.error('❌ Error setting up feature card handlers:', error);
        }
    }

    /**
     * Navigate to a page and push navigation event to GTM
     */
    function navigateTo(page) {
        try {
            // No automatic tracking event is fired on navigation (user requested enter-from-scratch behavior)
            setTimeout(() => {
                window.location.href = page;
            }, 0);
        } catch(error) {
            console.error('❌ Error during navigation:', error);
            window.location.href = page;
        }
    }

    console.log('✅ Navigation handler initialized');

})();
