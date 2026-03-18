// DOM Scraper for Analytics
// This file monitors and scrapes DOM elements for enhanced analytics

(function() {
    'use strict';

    // Store observed elements
    const observedElements = new Set();

    document.addEventListener('DOMContentLoaded', function() {
        // Scrape page structure
        scrapePageStructure();
        
        // Observe DOM changes
        observeDOMChanges();
        
        // Scrape dynamic content
        scrapeDynamicContent();
    });

    /**
     * Scrape the page structure and components
     */
    function scrapePageStructure() {
        const pageStructure = {
            total_headings: document.querySelectorAll('h1, h2, h3, h4, h5, h6').length,
            total_paragraphs: document.querySelectorAll('p').length,
            total_buttons: document.querySelectorAll('button, .btn').length,
            total_links: document.querySelectorAll('a').length,
            total_forms: document.querySelectorAll('form').length,
            total_images: document.querySelectorAll('img').length,
            has_nav: document.querySelectorAll('nav').length > 0,
            has_header: document.querySelectorAll('header').length > 0,
            has_footer: document.querySelectorAll('footer').length > 0,
            total_sections: document.querySelectorAll('section').length
        };

        // Track page structure
        trackCustomEvent('page_structure_scraped', pageStructure);
        console.log('Page structure scraped:', pageStructure);

        // Scrape form elements
        scrapeFormElements();

        // Scrape CTA elements
        scrapeCTAElements();

        // Scrape card elements
        scrapeCardElements();
    }

    /**
     * Scrape form elements on the page
     */
    function scrapeFormElements() {
        const forms = document.querySelectorAll('form');
        forms.forEach(function(form, index) {
            const fields = form.querySelectorAll('input, select, textarea');
            const formData = {
                form_id: form.id || 'form_' + index,
                form_name: form.name || 'unnamed',
                total_fields: fields.length,
                field_types: Array.from(fields).map(f => f.type || f.tagName.toLowerCase()).join(','),
                has_submit: form.querySelector('button[type="submit"]') ? true : false
            };

            trackCustomEvent('form_structure_scraped', formData);
            console.log('Form scraped:', formData);
        });
    }

    /**
     * Scrape CTA (Call-to-Action) elements
     */
    function scrapeCTAElements() {
        const ctaButtons = document.querySelectorAll('.btn-primary, .cta-link, [id*="cta"], [id*="admission"]');
        const ctaData = {
            total_cta_buttons: ctaButtons.length,
            cta_buttons: Array.from(ctaButtons).map(btn => ({
                id: btn.id,
                text: btn.textContent.trim(),
                class: btn.className,
                element_type: btn.tagName
            }))
        };

        trackCustomEvent('cta_elements_scraped', ctaData);
        console.log('CTA elements scraped:', ctaData);
    }

    /**
     * Scrape card/section elements
     */
    function scrapeCardElements() {
        const cards = document.querySelectorAll('.feature-card, .program-card, .stat-card');
        const cardData = {
            total_cards: cards.length,
            cards: Array.from(cards).map(card => ({
                id: card.id,
                title: card.querySelector('h3')?.textContent.trim() || 'Unknown',
                type: card.className,
                has_button: card.querySelector('button') ? true : false
            }))
        };

        trackCustomEvent('card_elements_scraped', cardData);
        console.log('Card elements scraped:', cardData);
    }

    /**
     * Observe DOM changes and track them
     */
    function observeDOMChanges() {
        // Create a MutationObserver to watch for DOM changes
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    // Check for added nodes
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                            const changeData = {
                                event_category: 'dom_change',
                                event_type: 'element_added',
                                element_tag: node.tagName.toLowerCase(),
                                element_id: node.id || 'no_id',
                                element_class: node.className || 'no_class',
                                timestamp: new Date().toISOString()
                            };

                            trackCustomEvent('dom_element_added', changeData);
                            console.log('DOM element added:', node.tagName, node.id);
                        }
                    });

                    // Check for removed nodes
                    mutation.removedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                            const changeData = {
                                event_category: 'dom_change',
                                event_type: 'element_removed',
                                element_tag: node.tagName.toLowerCase(),
                                element_id: node.id || 'no_id'
                            };

                            trackCustomEvent('dom_element_removed', changeData);
                            console.log('DOM element removed:', node.tagName);
                        }
                    });
                }

                if (mutation.type === 'attributes') {
                    const target = mutation.target;
                    const attributeData = {
                        event_category: 'dom_change',
                        event_type: 'attribute_changed',
                        element_tag: target.tagName.toLowerCase(),
                        element_id: target.id || 'no_id',
                        attribute_name: mutation.attributeName,
                        attribute_value: target.getAttribute(mutation.attributeName)
                    };

                    if (!observedElements.has(target.id)) {
                        trackCustomEvent('dom_attribute_changed', attributeData);
                        observedElements.add(target.id);
                    }
                }
            });
        });

        // Configuration for the observer
        const config = {
            childList: true,        // Watch for added/removed children
            attributes: true,       // Watch for attribute changes
            subtree: true,          // Watch all descendants
            attributeFilter: ['class', 'style', 'data-*'], // Only watch these attributes
            characterData: false    // Don't watch text content
        };

        // Start observing the document
        observer.observe(document.body, config);
    }

    /**
     * Scrape dynamic content changes
     */
    function scrapeDynamicContent() {
        // Monitor visibility changes
        document.addEventListener('visibilitychange', function() {
            const visibilityData = {
                event_category: 'page_interaction',
                event_type: 'visibility_change',
                page_visible: !document.hidden,
                visibility_state: document.visibilityState
            };

            trackCustomEvent('page_visibility_changed', visibilityData);
            console.log('Page visibility changed:', document.visibilityState);
        });

        // Monitor window focus changes
        window.addEventListener('focus', function() {
            const focusData = {
                event_category: 'page_interaction',
                event_type: 'window_focus',
                timestamp: new Date().toISOString()
            };

            trackCustomEvent('window_focused', focusData);
            console.log('Window focused');
        });

        window.addEventListener('blur', function() {
            const blurData = {
                event_category: 'page_interaction',
                event_type: 'window_blur',
                timestamp: new Date().toISOString()
            };

            trackCustomEvent('window_blurred', blurData);
            console.log('Window blurred');
        });
    }

})();
