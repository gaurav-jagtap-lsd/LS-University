/**
 * DOM Scraper for Analytics
 * Monitors and scrapes DOM elements for understanding page structure
 * Sends data to GTM dataLayer for GA4 analysis
 */

(function() {
    'use strict';

    console.log('🔍 DOM Scraper loaded');

    document.addEventListener('DOMContentLoaded', function() {
        // Scrape page structure
        scrapePageStructure();
        
        // Monitor DOM changes
        observeDOMChanges();
        
        // Monitor visibility and focus
        monitorPageInteractions();
    });

    /**
     * Scrape the complete page structure
     */
    function scrapePageStructure() {
        try {
            const pageStructure = {
                event: 'page_structure_scraped',
                page_title: document.title,
                page_path: window.location.pathname,
                
                // Count elements
                total_headings: document.querySelectorAll('h1, h2, h3, h4, h5, h6').length,
                h1_count: document.querySelectorAll('h1').length,
                h2_count: document.querySelectorAll('h2').length,
                total_paragraphs: document.querySelectorAll('p').length,
                total_buttons: document.querySelectorAll('button, .btn').length,
                total_links: document.querySelectorAll('a').length,
                total_forms: document.querySelectorAll('form').length,
                total_inputs: document.querySelectorAll('input').length,
                total_images: document.querySelectorAll('img').length,
                total_sections: document.querySelectorAll('section').length,
                total_divs: document.querySelectorAll('div').length,
                
                // Structural info
                has_header: document.querySelectorAll('header').length > 0,
                has_nav: document.querySelectorAll('nav').length > 0,
                has_main: document.querySelectorAll('main').length > 0,
                has_footer: document.querySelectorAll('footer').length > 0,
                
                // Form information
                forms: Array.from(document.querySelectorAll('form'))
                    .map(f => ({
                        id: f.id || 'unnamed',
                        fields: f.querySelectorAll('input, select, textarea').length
                    })),
                
                // Viewport info
                viewport_width: window.innerWidth,
                viewport_height: window.innerHeight
            };

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push(pageStructure);
            console.log('✅ Page structure pushed to dataLayer:', pageStructure);
        } catch(error) {
            console.error('❌ Error scraping page structure:', error);
        }
    }

    /**
     * Observe DOM changes and mutations
     */
    function observeDOMChanges() {
        try {
            let mutationCounter = 0;

            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    try {
                        mutationCounter++;

                        // Push every 10th mutation to avoid excessive events
                        if (mutationCounter % 10 === 0) {
                            const mutationData = {
                                event: 'dom_mutation_detected',
                                mutation_count: mutationCounter,
                                mutation_type: mutation.type
                            };
                            
                            window.dataLayer = window.dataLayer || [];
                            window.dataLayer.push(mutationData);
                            console.log('✅ DOM mutation detected:', mutationData);
                        }
                    } catch(error) {
                        console.error('❌ Error in mutation observer:', error);
                    }
                });
            });

            // Configuration for the observer
            const config = {
                childList: true,        // Watch for added/removed children
                attributes: true,       // Watch for attribute changes
                subtree: true,          // Watch all descendants
                attributeFilter: ['class', 'style', 'data-*']
            };

            // Start observing the document body
            observer.observe(document.body, config);
            console.log('✅ DOM observer started');
        } catch(error) {
            console.error('❌ Error initializing DOM observer:', error);
        }
    }

    /**
     * Monitor page visibility and window focus changes
     */
    function monitorPageInteractions() {
        try {
            // Monitor visibility changes
            document.addEventListener('visibilitychange', function() {
                const visibilityData = {
                    event: 'page_visibility_changed',
                    is_visible: !document.hidden,
                    visibility_state: document.visibilityState
                };

                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push(visibilityData);
                console.log('✅ Visibility change detected:', visibilityData);
            });

            // Monitor window focus
            window.addEventListener('focus', function() {
                const focusData = {
                    event: 'window_focused'
                };

                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push(focusData);
                console.log('✅ Window focused');
            });

            // Monitor window blur
            window.addEventListener('blur', function() {
                const blurData = {
                    event: 'window_blurred'
                };

                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push(blurData);
                console.log('✅ Window blurred');
            });

            console.log('✅ Page interaction monitoring initialized');
        } catch(error) {
            console.error('❌ Error setting up interaction monitoring:', error);
        }
    }

    console.log('✅ DOM Scraper fully initialized');

})();
