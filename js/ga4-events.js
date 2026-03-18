// GA4 Custom Events
// This file handles all GA4 events for LS University website
// Dependencies: session.js, gtm-helper.js must be loaded first

(function() {
    'use strict';

    console.log(`🎯 GA4-events.js loaded at ${new Date().toLocaleTimeString()}`);

    // Ensure GTM is initialized
    window.dataLayer = window.dataLayer || [];
    
    // Log current state
    if (window.LS_SESSION) {
        console.log('📊 Session ID:', window.LS_SESSION.id);
    }
    console.log('📊 dataLayer available:', window.dataLayer !== undefined);
    
    // Initialize GA4 events - use both DOMContentLoaded and try immediate execution
    function initializeTracking() {
        try {
            console.log('🚀 Initializing tracking...');
            
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
            
            console.log('✅ All tracking initialized successfully');
        } catch(error) {
            console.error('❌ Error initializing tracking:', error);
        }
    }
    
    // Try initialization on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeTracking);
    } else {
        // Document already loaded, initialize immediately
        initializeTracking();
    }

    // Also track page view on window load to ensure GTM is ready
    window.addEventListener('load', function() {
        console.log('✅ Page fully loaded');
    });

    /**
     * Track page view event
     */
    function trackPageView() {
        try {
            // Ensure GTM is initialized
            if (typeof dataLayer === 'undefined') {
                window.dataLayer = [];
                console.warn('⚠️ dataLayer not found, creating new one');
            }
            
            // Get session info from utility
            const sessionId = (window.LS_SESSION && window.LS_SESSION.id) || localStorage.getItem('session_id') || 'unknown';
            
            const pageData = {
                event_category: 'page_view',
                event_label: document.title,
                page_path: window.location.pathname,
                page_title: document.title,
                page_location: window.location.href,
                session_id: sessionId
            };
            
            trackCustomEvent('page_view', pageData);
            console.log('✅ Page view tracked:', pageData);
        } catch(error) {
            console.error('❌ Error tracking page view:', error);
        }
    }
    
    /**
     * Generate a unique session ID if session utility is not available
     */
    function generateSessionId() {
        if (window.LS_SESSION) {
            return window.LS_SESSION.id;
        }
        const sessionId = 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        localStorage.setItem('session_id', sessionId);
        localStorage.setItem('session_start', new Date().toISOString());
        return sessionId;
    }

    /**
     * Track CTA button clicks
     */
    function trackCTAClicks() {
        try {
            // Hero section CTA
            const heroCTA = document.getElementById('hero-cta-btn');
            if (heroCTA) {
                heroCTA.addEventListener('click', function(e) {
                    try {
                        trackCTAEvent('hero_cta', 'Start Your Journey', this);
                        setTimeout(() => window.location.href = 'admission.html', 100);
                    } catch(error) {
                        console.error('❌ Error tracking hero CTA:', error);
                    }
                });
                console.log('✅ Hero CTA listener added');
            }

            // Main admission button
            const mainAdmissionBtn = document.getElementById('main-admission-btn');
            if (mainAdmissionBtn) {
                mainAdmissionBtn.addEventListener('click', function(e) {
                    try {
                        trackCTAEvent('main_admission', 'Apply for Admission', this);
                        setTimeout(() => window.location.href = 'admission.html', 100);
                    } catch(error) {
                        console.error('❌ Error tracking main admission btn:', error);
                    }
                });
                console.log('✅ Main admission button listener added');
            }

            // Submit button
            const submitBtn = document.getElementById('submit-btn');
            if (submitBtn) {
                submitBtn.addEventListener('click', function(e) {
                    try {
                        trackCTAEvent('admission_submit', 'Submit Application', this);
                    } catch(error) {
                        console.error('❌ Error tracking submit btn:', error);
                    }
                });
                console.log('✅ Submit button listener added');
            }

            // Contact submit button
            const contactSubmitBtn = document.getElementById('contact-submit-btn');
            if (contactSubmitBtn) {
                contactSubmitBtn.addEventListener('click', function(e) {
                    try {
                        trackCTAEvent('contact_submit', 'Send Message', this);
                    } catch(error) {
                        console.error('❌ Error tracking contact submit btn:', error);
                    }
                });
                console.log('✅ Contact submit button listener added');
            }

            // Program learn more buttons
            const programBtns = document.querySelectorAll('.program-btn');
            if (programBtns.length > 0) {
                programBtns.forEach(function(btn) {
                    btn.addEventListener('click', function(e) {
                        try {
                            const programName = this.getAttribute('data-program');
                            trackCTAEvent('program_learn_more', 'Learn More - ' + programName, this);
                            localStorage.setItem('selected_program', programName);
                            setTimeout(() => window.location.href = 'admission.html', 100);
                        } catch(error) {
                            console.error('❌ Error tracking program btn:', error);
                        }
                    });
                });
                console.log('✅ Program button listeners added');
            }
        } catch(error) {
            console.error('❌ Error in trackCTAClicks:', error);
        }
    }

    /**
     * Track CTA event
     */
    function trackCTAEvent(eventName, label, element) {
        try {
            const eventData = {
                event_category: 'engagement',
                event_type: 'cta_click',
                button_text: element.textContent.trim(),
                button_id: element.id || 'unknown',
                button_class: element.className
            };
            
            trackCustomEvent(eventName, eventData);
            console.log('✅ CTA tracked:', eventName, eventData);
        } catch(error) {
            console.error('❌ Error in trackCTAEvent:', error);
        }
    }

    /**
     * Track navigation clicks
     */
    function trackNavigation() {
        try {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(function(link) {
                link.addEventListener('click', function(e) {
                    try {
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
                        console.log('✅ Navigation tracked:', linkText, href);
                    } catch(error) {
                        console.error('❌ Error tracking nav click:', error);
                    }
                });
            });
            console.log('✅ Navigation listeners added');
        } catch(error) {
            console.error('❌ Error in trackNavigation:', error);
        }
    }

    /**
     * Track scroll depth
     */
    function trackScrollDepth() {
        try {
            const scrollDepths = [25, 50, 75, 90];
            const tracked = {};

            window.addEventListener('scroll', function() {
                try {
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
                            console.log('✅ Scroll depth tracked:', depth + '%');
                        }
                    });
                } catch(error) {
                    console.error('❌ Error tracking scroll:', error);
                }
            }, { passive: true });
            console.log('✅ Scroll depth listener added');
        } catch(error) {
            console.error('❌ Error in trackScrollDepth:', error);
        }
    }

    /**
     * Track all link clicks
     */
    function trackLinkClicks() {
        try {
            document.addEventListener('click', function(e) {
                try {
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
                        console.log('✅ Generic link clicked:', linkText, href);
                    }
                } catch(error) {
                    console.error('❌ Error in link click handler:', error);
                }
            });
            console.log('✅ Link click listener added');
        } catch(error) {
            console.error('❌ Error in trackLinkClicks:', error);
        }
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
