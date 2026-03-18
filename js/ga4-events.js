// GA4 Custom Events
// This file handles all GA4 events for LS University website

(function() {
    'use strict';

    // Ensure GTM is initialized
    window.dataLayer = window.dataLayer || [];
    
    // Initialize GA4 events on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize GTM if not already loaded
        if (typeof gtag === 'undefined') {
            console.log('GTM container initializing...');
        }
        
        // Track page view
        trackPageView();
        
        // Track CTA button clicks
        trackCTAClicks();
        
        // Track navigation links
        trackNavigation();
        
        // Track scroll depth
        trackScrollDepth();
        
        // Track link clicks
        trackLinkClicks();
    });

    // Also track page view on window load to ensure GTM is ready
    window.addEventListener('load', function() {
        console.log('Page fully loaded, GAtagger ready');
    });

    /**
     * Track page view event
     */
    function trackPageView() {
        // Ensure GTM is initialized
        if (typeof dataLayer === 'undefined') {
            window.dataLayer = [];
        }
        
        const pageData = {
            event_category: 'page_view',
            event_label: document.title,
            page_path: window.location.pathname,
            page_title: document.title,
            page_location: window.location.href,
            session_id: localStorage.getItem('session_id') || generateSessionId()
        };
        
        trackCustomEvent('page_view', pageData);
        console.log('Page view tracked:', pageData);
    }
    
    /**
     * Generate a unique session ID if not exists
     */
    function generateSessionId() {
        const sessionId = 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        localStorage.setItem('session_id', sessionId);
        localStorage.setItem('session_start', new Date().toISOString());
        return sessionId;
    }

    /**
     * Track CTA button clicks
     */
    function trackCTAClicks() {
        // Hero section CTA
        const heroCTA = document.getElementById('hero-cta-btn');
        if (heroCTA) {
            heroCTA.addEventListener('click', function(e) {
                trackCTAEvent('hero_cta', 'Start Your Journey', this);
            });
        }

        // Main admission button
        const mainAdmissionBtn = document.getElementById('main-admission-btn');
        if (mainAdmissionBtn) {
            mainAdmissionBtn.addEventListener('click', function(e) {
                trackCTAEvent('main_admission', 'Apply for Admission', this);
            });
        }

        // Submit button
        const submitBtn = document.getElementById('submit-btn');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                // Event will be tracked by form submission handler
                trackCTAEvent('admission_submit', 'Submit Application', this);
            });
        }

        // Contact submit button
        const contactSubmitBtn = document.getElementById('contact-submit-btn');
        if (contactSubmitBtn) {
            contactSubmitBtn.addEventListener('click', function(e) {
                // Event will be tracked by form submission handler
                trackCTAEvent('contact_submit', 'Send Message', this);
            });
        }

        // Program learn more buttons
        const programBtns = document.querySelectorAll('.program-btn');
        programBtns.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                const programName = this.getAttribute('data-program');
                trackCTAEvent('program_learn_more', 'Learn More - ' + programName, this);
            });
        });
    }

    /**
     * Track CTA event
     */
    function trackCTAEvent(eventName, label, element) {
        const eventData = {
            event_category: 'engagement',
            event_type: 'cta_click',
            button_text: element.textContent.trim(),
            button_id: element.id || 'unknown',
            button_class: element.className
        };
        
        trackCustomEvent(eventName, eventData);
        console.log('CTA tracked:', eventName, eventData);
    }

    /**
     * Track navigation clicks
     */
    function trackNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                const linkText = this.textContent.trim();
                
                const eventData = {
                    event_category: 'engagement',
                    event_type: 'navigation',
                    link_text: linkText,
                    link_url: href,
                    link_class: this.className
                };
                
                trackCustomEvent('navigation_click', eventData);
                console.log('Navigation tracked:', linkText, href);
            });
        });
    }

    /**
     * Track scroll depth
     */
    function trackScrollDepth() {
        const scrollDepths = [25, 50, 75, 90];
        const tracked = {};

        window.addEventListener('scroll', function() {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

            scrollDepths.forEach(function(depth) {
                if (scrollPercentage >= depth && !tracked[depth]) {
                    tracked[depth] = true;
                    
                    const eventData = {
                        event_category: 'engagement',
                        event_type: 'scroll_depth',
                        scroll_depth: depth + '%',
                        page_height: document.documentElement.scrollHeight,
                        scroll_position: window.scrollY
                    };
                    
                    trackCustomEvent('scroll_depth_' + depth, eventData);
                    console.log('Scroll depth tracked:', depth + '%');
                }
            });
        }, { passive: true });
    }

    /**
     * Track all link clicks
     */
    function trackLinkClicks() {
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (link && !link.classList.contains('nav-link') && !link.classList.contains('program-btn')) {
                const href = link.getAttribute('href');
                const linkText = link.textContent.trim();
                
                const eventData = {
                    event_category: 'engagement',
                    event_type: 'link_click',
                    link_text: linkText,
                    link_url: href
                };
                
                trackCustomEvent('generic_link_click', eventData);
                console.log('Generic link clicked:', linkText, href);
            }
        });
    }

    /**
     * Track feature card interactions
     */
    function trackFeatureCardsInteraction() {
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(function(card) {
            card.addEventListener('click', function(e) {
                const cardId = this.id;
                const cardText = this.querySelector('h3').textContent.trim();
                
                const eventData = {
                    event_category: 'engagement',
                    event_type: 'feature_card_click',
                    card_id: cardId,
                    card_title: cardText
                };
                
                trackCustomEvent('feature_card_interaction', eventData);
                console.log('Feature card clicked:', cardText);
            });
        });
    }

    // Track feature cards if they exist
    if (document.querySelectorAll('.feature-card').length > 0) {
        trackFeatureCardsInteraction();
    }

})();
