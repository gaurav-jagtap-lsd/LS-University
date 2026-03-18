/**
 * DOM Scraper for Page Structure Analysis
 * Monitors page structure and DOM elements (no dataLayer pushes)
 * Only feeds data to GTM when explicitly needed
 */

(function() {
    'use strict';

    console.log('🔍 DOM Scraper loaded - monitoring page structure');

    document.addEventListener('DOMContentLoaded', function() {
        // Monitor page structure changes
        monitorPageStructure();
    });

    /**
     * Monitor page structure changes without pushing to dataLayer
     */
    function monitorPageStructure() {
        try {
            // Store initial page structure for reference
            const pageStructure = {
                page_title: document.title,
                page_path: window.location.pathname,
                total_headings: document.querySelectorAll('h1, h2, h3, h4, h5, h6').length,
                total_buttons: document.querySelectorAll('button, .btn').length,
                total_links: document.querySelectorAll('a').length,
                total_forms: document.querySelectorAll('form').length,
                has_nav: document.querySelectorAll('nav').length > 0,
                has_header: document.querySelectorAll('header').length > 0,
                has_footer: document.querySelectorAll('footer').length > 0
            };

            // Store structure in window for internal use only
            window.LS_PAGE_STRUCTURE = pageStructure;
            console.log('✅ Page structure analyzed (not pushed to dataLayer)', pageStructure);

            // Monitor DOM mutations without pushing to dataLayer
            const observer = new MutationObserver(function(mutations) {
                // Track mutations internally but don't push to GTM
                mutations.forEach(function(mutation) {
                    // DOM mutation detected but silently tracked
                });
            });

            const config = {
                childList: true,
                attributes: true,
                subtree: true,
                attributeFilter: ['class', 'style', 'data-*']
            };

            observer.observe(document.body, config);
            console.log('✅ DOM observer initialized (silent mode)');

        } catch(error) {
            console.error('❌ Error monitoring page structure:', error);
        }
    }

    console.log('✅ DOM Scraper fully initialized - waiting for business events');

})();
